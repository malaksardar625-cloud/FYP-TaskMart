import React, { useState } from 'react'
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
} from '@mui/material'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import NotificationsActiveRoundedIcon from '@mui/icons-material/NotificationsActiveRounded'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded'
import DoneAllRoundedIcon from '@mui/icons-material/DoneAllRounded'
import DeleteSweepRoundedIcon from '@mui/icons-material/DeleteSweepRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'

// ── Single import from the unified styles file ────────────────────────────────
import { notificationStyles as s } from './notificationStyles.js'

// ─── Notification type config ────────────────────────────────────────────────
const TYPE_CONFIG = {
  success: {
    icon: <CheckCircleOutlineRoundedIcon fontSize="small" />,
    color: '#22c55e',
    bg: '#f0fdf4',
  },
  error: {
    icon: <ErrorOutlineRoundedIcon fontSize="small" />,
    color: '#ef4444',
    bg: '#fef2f2',
  },
  warning: {
    icon: <WarningAmberRoundedIcon fontSize="small" />,
    color: '#f59e0b',
    bg: '#fffbeb',
  },
  info: {
    icon: <InfoOutlinedIcon fontSize="small" />,
    color: '#3b82f6',
    bg: '#eff6ff',
  },
}

// ─── Demo data ────────────────────────────────────────────────────────────────
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Deployment Successful',
    message: 'Version 2.4.1 was deployed to production without any issues.',
    time: '2 min ago',
    read: false,
  },
  {
    id: 2,
    type: 'error',
    title: 'Payment Failed',
    message: 'Transaction #8842 could not be processed. Card was declined.',
    time: '15 min ago',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Storage Almost Full',
    message: 'Your storage is at 87% capacity. Consider upgrading your plan.',
    time: '1 hr ago',
    read: false,
  },
  {
    id: 4,
    type: 'info',
    title: 'New Team Member',
    message: 'Sara Ahmed joined your workspace and is ready to collaborate.',
    time: '3 hr ago',
    read: true,
  },
  {
    id: 5,
    type: 'success',
    title: 'Backup Complete',
    message:
      'Your weekly data backup finished successfully. All files secured.',
    time: 'Yesterday',
    read: true,
  },
  {
    id: 6,
    type: 'info',
    title: 'Scheduled Maintenance',
    message: 'System maintenance is scheduled for Sunday 2:00 AM – 4:00 AM.',
    time: '2 days ago',
    read: true,
  },
]

// ─── Single notification item ─────────────────────────────────────────────────
function NotificationItem({ notification, onRead, onRemove }) {
  const { id, type, title, message, time, read } = notification
  const cfg = TYPE_CONFIG[type]

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
      {/* Icon Avatar */}
      <ListItemAvatar sx={s.itemAvatar}>
        <Box sx={s.iconBox(cfg.bg, cfg.color)}>{cfg.icon}</Box>
      </ListItemAvatar>

      {/* Text */}
      <ListItemText
        onClick={() => !read && onRead(id)}
        sx={s.listItemText(read)}
        primary={
          <Stack direction="row" alignItems="center" gap={0.75}>
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
            <Typography variant="caption" color="text.secondary" sx={s.message}>
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

// ─── Main component ───────────────────────────────────────────────────────────
export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS)
  const [anchorEl, setAnchorEl] = useState(null)
  const [filter, setFilter] = useState('all')

  const open = Boolean(anchorEl)
  const unreadCount = notifications.filter((n) => !n.read).length
  const filtered =
    filter === 'unread' ? notifications.filter((n) => !n.read) : notifications

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

  return (
    <>
      {/* ── Bell trigger button ── */}
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

      {/* ── Popover ── */}
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
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack direction="row" alignItems="center" gap={1}>
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
                variant={filter === tab ? 'contained' : 'text'}
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
              alignItems="center"
              justifyContent="center"
              gap={1.5}
              sx={s.emptyState}
            >
              <NotificationsNoneRoundedIcon sx={s.emptyStateIcon} />
              <Typography
                variant="body2"
                color="text.disabled"
                textAlign="center"
              >
                {filter === 'unread'
                  ? "You're all caught up! No unread notifications."
                  : 'No notifications yet.'}
              </Typography>
            </Stack>
          ) : (
            <List disablePadding>
              {filtered.map((n, idx) => (
                <React.Fragment key={n.id}>
                  <NotificationItem
                    notification={n}
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
              <Button size="small" fullWidth sx={s.viewAllBtn}>
                View all notifications →
              </Button>
            </Box>
          </>
        )}
      </Popover>
    </>
  )
}
