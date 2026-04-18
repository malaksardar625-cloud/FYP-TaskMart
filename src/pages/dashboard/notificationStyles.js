import { alpha } from '@mui/material/styles'
export const notificationStyles = {
  // ── Bell trigger ──────────────────────────────────────────────────────────
  bellButton: (open) => ({
    position: 'relative',
    color: open ? 'primary.main' : 'text.secondary',
    bgcolor: open ? alpha('#3b82f6', 0.1) : 'transparent',
    '&:hover': { bgcolor: alpha('#3b82f6', 0.08) },
    transition: 'all 0.2s',
  }),

  badge: {
    '& .MuiBadge-badge': {
      fontSize: 10,
      height: 17,
      minWidth: 17,
      fontWeight: 700,
    },
  },

  // ── Popover paper ─────────────────────────────────────────────────────────
  popoverPaper: {
    mt: 1.5,
    width: 380,
    maxHeight: 540,
    borderRadius: '16px',
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  // ── Header ────────────────────────────────────────────────────────────────
  headerBox: {
    px: 2.5,
    pt: 2,
    pb: 1.5,
    background: 'linear-gradient(135deg, #1e3a5f 0%, #0f2a4a 100%)',
  },

  headerTitleIcon: {
    color: '#60a5fa',
    fontSize: 20,
  },

  newChip: {
    height: 20,
    fontSize: 11,
    fontWeight: 700,
    bgcolor: '#ef4444',
    color: '#fff',
    '& .MuiChip-label': { px: 1 },
  },

  markAllReadBtn: {
    color: '#93c5fd',
    '&:hover': { color: '#fff' },
  },

  clearAllBtn: {
    color: '#93c5fd',
    '&:hover': { color: '#f87171' },
  },

  // ── Filter tabs ───────────────────────────────────────────────────────────
  filterTab: (isActive) => ({
    borderRadius: '8px',
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 600,
    minWidth: 0,
    px: 1.5,
    py: 0.4,
    ...(isActive
      ? {
          bgcolor: '#3b82f6',
          color: '#fff',
          '&:hover': { bgcolor: '#2563eb' },
        }
      : {
          color: '#93c5fd',
          '&:hover': {
            bgcolor: alpha('#3b82f6', 0.15),
            color: '#fff',
          },
        }),
  }),

  // ── List container ────────────────────────────────────────────────────────
  listContainer: {
    overflowY: 'auto',
    flex: 1,
  },

  emptyState: {
    py: 6,
    px: 3,
  },

  emptyStateIcon: {
    fontSize: 48,
    color: 'text.disabled',
  },

  // ── Footer ────────────────────────────────────────────────────────────────
  footerBox: {
    px: 2,
    py: 1.2,
    textAlign: 'center',
  },

  viewAllBtn: {
    textTransform: 'none',
    fontSize: 13,
    fontWeight: 600,
    color: 'primary.main',
    borderRadius: '8px',
    '&:hover': { bgcolor: alpha('#3b82f6', 0.08) },
  },

  // ── Notification item ─────────────────────────────────────────────────────
  listItem: (read, color) => ({
    px: 2,
    py: 1.5,
    gap: 1.5,
    bgcolor: read ? 'transparent' : alpha(color, 0.04),
    borderLeft: read ? '3px solid transparent' : `3px solid ${color}`,
    transition: 'background 0.2s',
    '&:hover': { bgcolor: alpha(color, 0.07) },
    cursor: 'default',
  }),

  dismissBtn: {
    opacity: 0,
    '.MuiListItem-root:hover &': { opacity: 1 },
    transition: 'opacity 0.15s',
    color: 'text.disabled',
    '&:hover': { color: 'text.primary' },
  },

  dismissIcon: { fontSize: 14 },

  itemAvatar: { minWidth: 36, mt: 0.5 },

  iconBox: (bg, color) => ({
    width: 34,
    height: 34,
    borderRadius: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: bg,
    color: color,
    flexShrink: 0,
  }),

  listItemText: (read) => ({
    cursor: read ? 'default' : 'pointer',
    pr: 2,
  }),

  title: { maxWidth: 190 },

  unreadDot: (color) => ({
    width: 7,
    height: 7,
    borderRadius: '50%',
    bgcolor: color,
    flexShrink: 0,
  }),

  message: {
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
    lineHeight: 1.5,
  },
}
