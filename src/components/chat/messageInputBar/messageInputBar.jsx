import { useState, useRef } from 'react'
import { Box, InputBase, IconButton, Tooltip } from '@mui/material'
import { AttachFile, Send } from '@mui/icons-material'
import * as S from './messageInputBar.Styles'

export default function MessageInputBar({ onSend, onTyping, disabled }) {
  const [text, setText] = useState('')
  const inputRef = useRef(null)

  const handleChange = (e) => {
    setText(e.target.value)
    onTyping()
  }

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setText('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <Box sx={S.inputBar}>
      <Tooltip title="Attach file">
        <IconButton sx={S.attachBtn} disabled={disabled}>
          <AttachFile fontSize="small" />
        </IconButton>
      </Tooltip>

      <Box sx={S.inputWrapper}>
        <InputBase
          inputRef={inputRef}
          value={text}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message…"
          multiline
          maxRows={4}
          disabled={disabled}
          fullWidth
          sx={S.messageInput}
        />
      </Box>

      <Tooltip title="Send">
        <span>
          <IconButton
            onClick={handleSend}
            disabled={!text.trim() || disabled}
            sx={S.sendBtn(Boolean(text.trim()))}
          >
            <Send fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  )
}
