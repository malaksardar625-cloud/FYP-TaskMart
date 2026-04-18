import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Badge,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Popover,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material'
import { alpha } from '@mui/material/styles'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

import { notificationStyles as s } from './notificationStyles.js'
import {
  INITIAL_NOTIFICATIONS,
  TYPE_PALETTE_MAP,
} from './notifications.constants.js'

// ─── Icons map ───────────────────────────────────────────────────────────────
const TYPE_ICONS = {
  success: <CheckCircleOutlineRoundedIcon fontSize="small" />,
  error: <ErrorOutlineRoundedIcon fontSize="small" />,
  warning: <WarningAmberRoundedIcon fontSize="small" />,
  info: <InfoOutlinedIcon fontSize="small" />,
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

// ─── Single notification item ─────────────────────────────────────────────────
function NotificationItem({ notification, typeConfig, onRead, onRemove }) {
  const { id, type, title, message, time, read } = notification
  const cfg = typeConfig[type]

  return (
    <ListItem
      alignItems="flex-start"
      sx={s.listItem(read, cfg.color)}
      secondaryAction={
        <Tooltip title="Dismiss">
          <IconButton
            edge="end"
            size="small"
            onClick={() => onRemove(id)}
            sx={s.dismissBtn}
          >
            <CloseRoundedIcon sx={s.dismissIcon} />
          </IconButton>
        </Tooltip>
      }
    >
      {/* Type icon */}
      <ListItemAvatar sx={s.itemAvatar}>
        <Box sx={s.iconBox(cfg.bg, cfg.color)}>{cfg.icon}</Box>
      </ListItemAvatar>

      {/* Text content */}
      <ListItemText
        onClick={() => !read && onRead(id)}
        sx={s.listItemText(read)}
        primary={
          <Stack direction="row" gap={0.75} sx={{ alignItems: 'center' }}>
            <Typography
              variant="body2"
              fontWeight={read ? 500 : 700}
              color="text.primary"
              noWrap
              sx={s.title}
            >
              {title}
            </Typography>
            {!read && <Box sx={s.unreadDot(cfg.color)} />}
          </Stack>
        }
        secondary={
          <>
            <Typography
              variant="caption"
              color="text.secondary"
              component="span"
              display="block"
              sx={s.message}
            >
              {message}
            </Typography>
            <Typography
              variant="caption"
              color={cfg.color}
              display="block"
              mt={0.3}
              fontWeight={500}
            >
              {time}
            </Typography>
          </>
        }
      />
    </ListItem>
  )
}

// ─── Main popover component ───────────────────────────────────────────────────
export default function NotificationsPopover() {
  const navigate = useNavigate()
  const typeConfig = useTypeConfig()

  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [anchorEl, setAnchorEl] = useState(null)
  const [filter, setFilter] = useState('all')

  const open = Boolean(anchorEl)
  const unreadCount = notifications.filter((n) => !n.read).length
  const filtered =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

  // ── Handlers ────────────────────────────────────────────────────────────────
  const handleOpen = (e) => setAnchorEl(e.currentTarget)
  const handleClose = () => setAnchorEl(null)

  const markAsRead = (id) =>
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    )

  const markAllRead = () =>
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))

  const removeNotification = (id) =>
    setNotifications((prev) => prev.filter((n) => n.id !== id))

  const clearAll = () => setNotifications([])

  const handleViewAll = () => {
    handleClose()
    navigate('/notifications')
  }

  return (
    <>
      {/* ── Bell button ──────────────────────────────────────────────────────── */}
      <Tooltip title="Notifications">
        <IconButton onClick={handleOpen} size="medium" sx={s.bellButton(open)}>
          <Badge badgeContent={unreadCount} color="error" sx={s.badge}>
            {unreadCount > 0 ? (
              <NotificationsActiveRoundedIcon />
            ) : (
              <NotificationsNoneRoundedIcon />
            )}
          </Badge>
        </IconButton>
      </Tooltip>

      {/* ── Popover ──────────────────────────────────────────────────────────── */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { elevation: 8, sx: s.popoverPaper } }}
      >
        {/* Header */}
        <Box sx={s.headerBox}>
          <Stack
            direction="row"
            sx={{ alignItems: 'center', justifyContent: 'space-between' }}
          >
            <Stack direction="row" gap={1} sx={{ alignItems: 'center' }}>
              <NotificationsActiveRoundedIcon sx={s.headerTitleIcon} />
              <Typography
                variant="subtitle1"
                fontWeight={700}
                color="#f0f9ff"
                letterSpacing={0.3}
              >
                Notifications
              </Typography>
              {unreadCount > 0 && (
                <Chip
                  label={`${unreadCount} new`}
                  size="small"
                  sx={s.newChip}
                />
              )}
            </Stack>

            <Stack direction="row" gap={0.5}>
              {unreadCount > 0 && (
                <Tooltip title="Mark all as read">
                  <IconButton
                    size="small"
                    onClick={markAllRead}
                    sx={s.markAllReadBtn}
                  >
                    <DoneAllRoundedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              )}
              {notifications.length > 0 && (
                <Tooltip title="Clear all">
                  <IconButton
                    size="small"
                    onClick={clearAll}
                    sx={s.clearAllBtn}
                  >
                    <DeleteSweepRoundedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Tooltip>
              )}
            </Stack>
          </Stack>

          {/* Filter tabs */}
          <Stack direction="row" gap={0.75} mt={1.5}>
            {['all', 'unread'].map((tab) => (
              <Button
                key={tab}
                size="small"
                onClick={() => setFilter(tab)}
                sx={s.filterTab(filter === tab)}
              >
                {tab === 'all'
                  ? `All (${notifications.length})`
                  : `Unread (${unreadCount})`}
              </Button>
            ))}
          </Stack>
        </Box>

        <Divider />

        {/* Notification list */}
        <Box sx={s.listContainer}>
          {filtered.length === 0 ? (
            <Stack
              gap={1.5}
              sx={{
                ...s.emptyState,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <NotificationsNoneRoundedIcon sx={s.emptyStateIcon} />
              <Typography
                variant="body2"
                color="text.disabled"
                textAlign="center"
              >
                {filter === 'unread'
                  ? "You're all caught up!"
                  : 'No notifications yet.'}
              </Typography>
            </Stack>
          ) : (
            <List disablePadding>
              {filtered.map((n, idx) => (
                <React.Fragment key={n.id}>
                  <NotificationItem
                    notification={n}
                    typeConfig={typeConfig}
                    onRead={markAsRead}
                    onRemove={removeNotification}
                  />
                  {idx < filtered.length - 1 && (
                    <Divider variant="fullWidth" component="li" />
                  )}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {notifications.length > 0 && (
          <>
            <Divider />
            <Box sx={s.footerBox}>
              <Button
                size="small"
                fullWidth
                sx={s.viewAllBtn}
                onClick={handleViewAll}
              >
                View all notifications →
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  )
}
