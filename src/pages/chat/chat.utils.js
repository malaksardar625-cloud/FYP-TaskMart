/**
 * Format a timestamp for conversation list items.
 * - Today → "10:35 AM"
 * - This week → "Mon"
 * - Older → "12/05/26"
 */
export function formatConversationTime(isoString) {
  if (!isoString) return ''
  const date = new Date(isoString)
  const now = new Date()

  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const startOfWeek = new Date(startOfToday)
  startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay())

  if (date >= startOfToday) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  if (date >= startOfWeek) {
    return date.toLocaleDateString([], { weekday: 'short' })
  }
  return date.toLocaleDateString([], {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
  })
}

/**
 * Format a timestamp for message bubbles — "10:35 AM".
 */
export function formatMessageTime(isoString) {
  if (!isoString) return ''
  return new Date(isoString).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  })
}

/**
 * Format a date for day-dividers in the message list — "Today", "Yesterday", or "Mon, 5 Jun".
 */
export function formatDateDivider(isoString) {
  const date = new Date(isoString)
  const now = new Date()
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  )
  const startOfYesterday = new Date(startOfToday)
  startOfYesterday.setDate(startOfYesterday.getDate() - 1)

  if (date >= startOfToday) return 'Today'
  if (date >= startOfYesterday) return 'Yesterday'
  return date.toLocaleDateString([], {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
}

/**
 * Extract up to two initials from a full name.
 */
export function getInitials(fullName) {
  if (!fullName) return '?'
  return fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

/**
 * Truncate a string to maxLen characters, appending "…" if cut.
 */
export function truncate(text, maxLen = 50) {
  if (!text) return ''
  return text.length > maxLen ? `${text.slice(0, maxLen)}…` : text
}

/**
 * Group a flat message array into segments separated by date boundaries.
 * Returns [{ date: isoString, messages: [...] }, ...]
 */
export function groupMessagesByDate(messages) {
  const groups = []
  let currentDate = null

  for (const msg of messages) {
    const msgDate = new Date(msg.createdAt).toDateString()
    if (msgDate !== currentDate) {
      currentDate = msgDate
      groups.push({ date: msg.createdAt, messages: [msg] })
    } else {
      groups[groups.length - 1].messages.push(msg)
    }
  }

  return groups
}
