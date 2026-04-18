import React, { useState, useMemo } from 'react'
import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
  TextField,
  InputAdornment,
  Paper,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'

import { notificationStyles as s } from './notificationStyles.js'
import {
  INITIAL_NOTIFICATIONS,
  NOTIFICATION_FILTERS,
  TYPE_PALETTE_MAP,
} from './notifications.constants.js'

// ─── Icons map ────────────────────────────────────────────────────────────────
const TYPE_ICONS = {
  success: <CheckCircleOutlineRoundedIcon />,
  error: <ErrorOutlineRoundedIcon />,
  warning: <WarningAmberRoundedIcon />,
  info: <InfoOutlinedIcon />,
}

const TYPE_LABELS = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
}

// ─── Hook: resolve MUI theme colors per notification type ─────────────────────
function useTypeConfig() {
  const theme = useTheme()
  return Object.fromEntries(
    Object.entries(TYPE_PALETTE_MAP).map(([type, paletteKey]) => {
      const color = theme.palette[paletteKey].main
      return [type, { color, bg: alpha(color, 0.1), icon: TYPE_ICONS[type] }]
    })
  )
}

// ─── Single full notification card ───────────────────────────────────────────
function NotificationCard({ notification, typeConfig, onRead, onRemove }) {
  const { id, type, title, message, detail, date, read } = notification
  const cfg = typeConfig[type]

  return (
    <Paper elevation={0} sx={s.pageCard(read, cfg.color)}>
      <Stack direction="row" gap={2} sx={{ alignItems: 'flex-start' }}>
        {/* Type icon */}
        <Box sx={s.pageIconBox(cfg.bg, cfg.color)}>{cfg.icon}</Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0.5 }}>
          {/* Top row: title + type chip + actions */}
          <Stack
            direction="row"
            gap={2}
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
            }}
          >
            <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
              <Typography
                variant="subtitle2"
                fontWeight={read ? 500 : 700}
                color="text.primary"
              >
                {title}
              </Typography>
              {!read && <Box sx={s.pageUnreadDot(cfg.color)} />}
              <Chip
                label={TYPE_LABELS[type]}
                size="small"
                sx={{
                  height: 18,
                  fontSize: 10,
                  fontWeight: 700,
                  bgcolor: cfg.bg,
                  color: cfg.color,
                  '& .MuiChip-label': { px: 0.8 },
                }}
              />
            </Stack>

            {/* Date + action buttons */}
            <Stack direction="row" gap={2} sx={{ alignItems: 'center' }}>
              <Typography
                variant="caption"
                color="text.disabled"
                sx={{ whiteSpace: 'nowrap' }}
              >
                {date}
              </Typography>
              {!read && (
                <Tooltip title="Mark as read">
                  <IconButton size="small" onClick={() => onRead(id)}>
                    <DoneRoundedIcon sx={{ fontSize: 16, color: cfg.color }} />
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip title="Dismiss">
                <IconButton size="small" onClick={() => onRemove(id)}>
                  <CloseRoundedIcon
                    sx={{ fontSize: 16, color: 'text.disabled' }}
                  />
                </IconButton>
              </Tooltip>
            </Stack>
          </Stack>

          {/* Short message */}
          <Typography
            variant="body2"
            color="text.secondary"
            mt={0.5}
            fontWeight={read ? 400 : 500}
          >
            {message}
          </Typography>

          {/* Detailed description */}
          {detail && (
            <Box sx={s.pageDetailBox(cfg.color)}>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ lineHeight: 1.7 }}
              >
                {detail}
              </Typography>
            </Box>
          )}

          {/* Mark as read button */}
          {!read && (
            <Box mt={1.5}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => onRead(id)}
                sx={s.pageActionBtn(cfg.color)}
              >
                Mark as read
              </Button>
            </Box>
          )}
        </Box>
      </Stack>
    </Paper>
  )
}

// ─── Stats bar ────────────────────────────────────────────────────────────────
function StatsBar({ notifications, typeConfig }) {
  const { total, unread } = useMemo(
    () => ({
      total: notifications.length,
      unread: notifications.filter((n) => !n.read).length,
    }),
    [notifications]
  )

  return (
    <Stack direction="row" gap={2} sx={{ flexWrap: 'wrap' }}>
      <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
        <NotificationsActiveRoundedIcon
          sx={{ fontSize: 18, color: 'text.secondary' }}
        />
        <Typography variant="body2" color="text.secondary">
          <strong>{total}</strong> total
        </Typography>
      </Stack>

      <Divider orientation="vertical" flexItem />

      <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
        <Box
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: 'error.main',
          }}
        />
        <Typography variant="body2" color="text.secondary">
          <strong>{unread}</strong> unread
        </Typography>
      </Stack>

      {Object.entries(TYPE_PALETTE_MAP).map(([type]) => {
        const count = notifications.filter((n) => n.type === type).length
        if (count === 0) return null
        const cfg = typeConfig[type]
        return (
          <Stack
            key={type}
            direction="row"
            gap={0.75}
            sx={{ alignItems: 'center' }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: cfg.color,
              }}
            />
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textTransform: 'capitalize' }}
            >
              <strong>{count}</strong> {type}
            </Typography>
          </Stack>
        )
      })}
    </Stack>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function NotificationsPage() {
  const typeConfig = useTypeConfig()

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')

  const unreadCount = notifications.filter((n) => !n.read).length

  // ── Filtered + searched list ─────────────────────────────────────────────
  const displayedNotifications = useMemo(() => {
    let list = notifications

    if (filter === 'unread') list = list.filter((n) => !n.read)
    else if (filter !== 'all') list = list.filter((n) => n.type === filter)

    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.message.toLowerCase().includes(q)
      )
    }

    return list
  }, [notifications, filter, search])

  // ── Handlers ──────────────────────────────────────────────────────────────
  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )
  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  const removeNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  const clearAll = () => setNotifications([])

  return (
    <Box sx={s.pageRoot}>
      {/* ── Page header ───────────────────────────────────────────────────── */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        gap={2}
        sx={{
          ...s.pageHeader,
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
            <NotificationsActiveRoundedIcon color="primary" />
            <Typography variant="h5" fontWeight={700}>
              Notifications
            </Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} unread`}
                size="small"
                color="error"
                sx={{ fontWeight: 700, fontSize: 11 }}
              />
            )}
          </Stack>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Stay up to date with your orders, profile, and platform updates.
          </Typography>
        </Box>

        {/* Bulk actions */}
        <Stack direction="row" gap={2}>
          {unreadCount > 0 && (
            <Tooltip title="Mark all as read">
              <Button
                variant="outlined"
                size="small"
                startIcon={<DoneAllRoundedIcon />}
                onClick={markAllRead}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 1.5,
                }}
              >
                Mark all read
              </Button>
            </Tooltip>
          )}
          {notifications.length > 0 && (
            <Tooltip title="Clear all notifications">
              <Button
                variant="outlined"
                size="small"
                color="error"
                startIcon={<DeleteSweepRoundedIcon />}
                onClick={clearAll}
                sx={{
                  borderRadius: '8px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 1.5,
                }}
              >
                Clear all
              </Button>
            </Tooltip>
          )}
        </Stack>
      </Stack>

      {/* ── Stats bar ─────────────────────────────────────────────────────── */}
      {notifications.length > 0 && (
        <Box mb={2.5}>
          <StatsBar notifications={notifications} typeConfig={typeConfig} />
        </Box>
      )}

      {/* ── Search ────────────────────────────────────────────────────────── */}
      <TextField
        fullWidth
        size="small"
        placeholder="Search notifications..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: '10px' } }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon fontSize="small" color="disabled" />
              </InputAdornment>
            ),
          },
        }}
      />

      {/* ── Filter tabs ───────────────────────────────────────────────────── */}
      <Box sx={s.pageFilterBar}>
        {NOTIFICATION_FILTERS.map(({ key, label }) => {
          const count =
            key === 'all'
              ? notifications.length
              : key === 'unread'
                ? notifications.filter((n) => !n.read).length
                : notifications.filter((n) => n.type === key).length

          return (
            <Button
              key={key}
              size="small"
              onClick={() => setFilter(key)}
              sx={s.pageFilterTab(filter === key)}
            >
              {label}
              {count > 0 && (
                <Box
                  component="span"
                  sx={{
                    ml: 0.6,
                    px: 0.7,
                    py: 0.1,
                    borderRadius: '6px',
                    fontSize: 10,
                    fontWeight: 700,
                    bgcolor:
                      filter === key
                        ? 'rgba(255,255,255,0.25)'
                        : 'action.hover',
                    lineHeight: '18px',
                  }}
                >
                  {count}
                </Box>
              )}
            </Button>
          )
        })}
      </Box>

      {/* ── Notification cards ────────────────────────────────────────────── */}
      {displayedNotifications.length === 0 ? (
        <Stack sx={{ ...s.pageEmptyState, alignItems: 'center' }}>
          <NotificationsNoneRoundedIcon sx={s.pageEmptyIcon} />
          <Typography variant="h6" color="text.disabled" fontWeight={500}>
            No notifications found
          </Typography>
          <Typography variant="body2" color="text.disabled" mt={0.5}>
            {search
              ? `No results for "${search}"`
              : filter === 'unread'
                ? "You're all caught up!"
                : 'Nothing here yet.'}
          </Typography>
        </Stack>
      ) : (
        <Box>
          {displayedNotifications.map((n) => (
            <NotificationCard
              key={n.id}
              notification={n}
              typeConfig={typeConfig}
              onRead={markAsRead}
              onRemove={removeNotification}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}
