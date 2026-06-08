import { useState, useEffect, useRef, useCallback, useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import {
  getConversations,
  getMessages,
  startConversationApi,
  sendMessageApi,
} from '../../api/chatApi'

import { socket, connectSocket, disconnectSocket } from '../../sockets/socket'
import { AuthContext } from '../../context/authContext'
import { SOCKET_EVENTS, TYPING_TIMEOUT_MS } from './chat.constants'

/* ─────────────────────────────────────────────
   FETCHERS
───────────────────────────────────────────── */

const fetchConversations = async () => {
  const res = await getConversations()
  return res?.data ?? res ?? []
}

const fetchMessages = async (conversationId) => {
  const res = await getMessages(conversationId)
  return res?.data ?? res ?? []
}

/* ─────────────────────────────────────────────
   HOOK
───────────────────────────────────────────── */

export function useChat() {
  const { user } = useContext(AuthContext)
  const queryClient = useQueryClient()

  const [activeConversationId, setActiveConversationId] = useState(null)
  const [typingUsers, setTypingUsers] = useState({})
  const [onlineUsers, setOnlineUsers] = useState(new Set())
  const [isMobileConvOpen, setIsMobileConvOpen] = useState(true)

  const typingTimerRef = useRef(null)
  const isTypingRef = useRef(false)
  const messagesEndRef = useRef(null)

  /* ─────────────────────────────────────────────
     HANDLERS (MUST BE ABOVE useEffect)
  ───────────────────────────────────────────── */

  const handleIncomingMessage = useCallback(
    (message) => {
      queryClient.setQueryData(
        ['messages', message.conversationId],
        (prev = []) => [...prev, message]
      )

      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
    [queryClient]
  )

  const handleTypingStart = useCallback(
    ({ conversationId, userId, userName }) => {
      setTypingUsers((prev) => ({
        ...prev,
        [conversationId]: { userId, userName },
      }))
    },
    []
  )

  const handleTypingStop = useCallback(({ conversationId }) => {
    setTypingUsers((prev) => {
      const copy = { ...prev }
      delete copy[conversationId]
      return copy
    })
  }, [])

  const handleUserOnline = useCallback((userId) => {
    setOnlineUsers((prev) => new Set([...prev, userId]))
  }, [])

  const handleUserOffline = useCallback((userId) => {
    setOnlineUsers((prev) => {
      const copy = new Set(prev)
      copy.delete(userId)
      return copy
    })
  }, [])

  const handleMessageRead = useCallback(
    ({ conversationId }) => {
      queryClient.invalidateQueries({ queryKey: ['messages', conversationId] })
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
    },
    [queryClient]
  )

  /* ─────────────────────────────────────────────
     QUERIES
  ───────────────────────────────────────────── */

  const {
    data: conversations = [],
    isLoading: isConversationsLoading,
    isError: isConversationsError,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversations,
    enabled: Boolean(user),
    staleTime: 30000,
  })

  const { data: messages = [], isLoading: isMessagesLoading } = useQuery({
    queryKey: ['messages', activeConversationId],
    queryFn: () => fetchMessages(activeConversationId),
    enabled: Boolean(activeConversationId),
  })

  /* ─────────────────────────────────────────────
     SOCKET SETUP
  ───────────────────────────────────────────── */

  useEffect(() => {
    if (!user) return

    connectSocket()

    socket.on(SOCKET_EVENTS.RECEIVE_MESSAGE, handleIncomingMessage)
    socket.on(SOCKET_EVENTS.TYPING, handleTypingStart)
    socket.on(SOCKET_EVENTS.STOP_TYPING, handleTypingStop)
    socket.on(SOCKET_EVENTS.USER_ONLINE, handleUserOnline)
    socket.on(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline)
    socket.on(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead)

    return () => {
      socket.off(SOCKET_EVENTS.RECEIVE_MESSAGE, handleIncomingMessage)
      socket.off(SOCKET_EVENTS.TYPING, handleTypingStart)
      socket.off(SOCKET_EVENTS.STOP_TYPING, handleTypingStop)
      socket.off(SOCKET_EVENTS.USER_ONLINE, handleUserOnline)
      socket.off(SOCKET_EVENTS.USER_OFFLINE, handleUserOffline)
      socket.off(SOCKET_EVENTS.MESSAGE_READ, handleMessageRead)

      disconnectSocket()
    }
  }, [
    user,
    handleIncomingMessage,
    handleTypingStart,
    handleTypingStop,
    handleUserOnline,
    handleUserOffline,
    handleMessageRead,
  ])

  /* ─────────────────────────────────────────────
     JOIN ROOM
  ───────────────────────────────────────────── */

  const markConversationRead = useCallback(
    (conversationId) => {
      socket.emit(SOCKET_EVENTS.MARK_READ, { conversationId })

      queryClient.setQueryData(['conversations'], (prev = []) =>
        prev.map((c) =>
          c._id === conversationId ? { ...c, unreadCount: 0 } : c
        )
      )
    },
    [queryClient]
  )

  useEffect(() => {
    if (!activeConversationId) return

    socket.emit(SOCKET_EVENTS.JOIN_ROOM, activeConversationId)
    markConversationRead(activeConversationId)

    return () => {
      socket.emit(SOCKET_EVENTS.LEAVE_ROOM, activeConversationId)
    }
  }, [activeConversationId, markConversationRead])

  /* ─────────────────────────────────────────────
     AUTO SCROLL
  ───────────────────────────────────────────── */

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  /* ─────────────────────────────────────────────
     MUTATIONS
  ───────────────────────────────────────────── */

  const sendMessageMutation = useMutation({
    mutationFn: async ({ conversationId, content }) => {
      socket.emit(SOCKET_EVENTS.SEND_MESSAGE, {
        conversationId,
        content,
      })
    },

    onMutate: async ({ conversationId, content }) => {
      const optimistic = {
        _id: `temp_${Date.now()}`,
        conversationId,
        content,
        sender: { _id: user?._id },
        status: 'sending',
        createdAt: new Date().toISOString(),
      }

      queryClient.setQueryData(['messages', conversationId], (prev = []) => [
        ...prev,
        optimistic,
      ])
    },

    onError: async (_, { conversationId, content }) => {
      await sendMessageApi(conversationId, content)

      queryClient.invalidateQueries({
        queryKey: ['messages', conversationId],
      })
    },
  })

  const startConversationMutation = useMutation({
    mutationFn: startConversationApi,
    onSuccess: (conversation) => {
      queryClient.invalidateQueries({ queryKey: ['conversations'] })
      setActiveConversationId(conversation._id)
      setIsMobileConvOpen(false)
    },
  })

  /* ─────────────────────────────────────────────
     TYPING
  ───────────────────────────────────────────── */

  const emitTyping = useCallback(() => {
    if (!activeConversationId) return

    if (!isTypingRef.current) {
      isTypingRef.current = true
      socket.emit(SOCKET_EVENTS.TYPING, {
        conversationId: activeConversationId,
      })
    }

    clearTimeout(typingTimerRef.current)

    typingTimerRef.current = setTimeout(() => {
      isTypingRef.current = false
      socket.emit(SOCKET_EVENTS.STOP_TYPING, {
        conversationId: activeConversationId,
      })
    }, TYPING_TIMEOUT_MS)
  }, [activeConversationId])

  /* ─────────────────────────────────────────────
     ACTIONS
  ───────────────────────────────────────────── */

  const selectConversation = useCallback((id) => {
    setActiveConversationId(id)
    setIsMobileConvOpen(false)
  }, [])

  const handleMobileBack = useCallback(() => {
    setIsMobileConvOpen(true)
    setActiveConversationId(null)
  }, [])

  /* ─────────────────────────────────────────────
     DERIVED
  ───────────────────────────────────────────── */

  const activeConversation =
    conversations.find((c) => c._id === activeConversationId) ?? null

  const isTypingInActive = Boolean(
    activeConversationId && typingUsers[activeConversationId]
  )

  return {
    conversations,
    messages,
    activeConversation,
    activeConversationId,
    typingUsers,
    onlineUsers,
    isTypingInActive,

    isMobileConvOpen,
    isConversationsLoading,
    isConversationsError,
    isMessagesLoading,
    isSending: sendMessageMutation.isPending,

    messagesEndRef,

    selectConversation,
    handleMobileBack,
    emitTyping,
    sendMessage: sendMessageMutation.mutate,
    startConversation: startConversationMutation.mutate,
    isStartingConversation: startConversationMutation.isPending,
  }
}
