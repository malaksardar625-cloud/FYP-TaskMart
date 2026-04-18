import { alpha } from '@mui/material/styles'

export const notificationStyles = {
  // ─── Bell button ─────────────────────────────────────────────────────────────
  bellButton: (open) => ({
    color: open ? 'primary.main' : 'text.secondary',
    bgcolor: open ? 'action.selected' : 'transparent',
    transition: 'all 0.2s',
    '&:hover': { bgcolor: 'action.hover' },
  }),

  badge: {
    '& .MuiBadge-badge': {
      fontSize: 10,
      height: 17,
      minWidth: 17,
      fontWeight: 700,
    },
  },

  // ─── Popover ─────────────────────────────────────────────────────────────────
  popoverPaper: {
    mt: 1.5,
    width: 390,
    maxHeight: 560,
    borderRadius: 3,
    border: '1px solid',
    borderColor: 'divider',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  // ─── Header ──────────────────────────────────────────────────────────────────
  headerBox: {
    px: 2.5,
    pt: 2,
    pb: 1.5,
    background: (theme) =>
      `linear-gradient(135deg, ${theme.palette.primary.dark}, ${alpha(theme.palette.primary.dark, 0.78)})`,
  },

  headerTitleIcon: {
    color: 'primary.light',
    fontSize: 20,
  },

  newChip: {
    height: 20,
    fontSize: 11,
    fontWeight: 700,
    bgcolor: 'error.main',
    color: 'error.contrastText',
    '& .MuiChip-label': { px: 1 },
  },

  markAllReadBtn: {
    color: 'primary.light',
    '&:hover': { color: 'common.white' },
  },

  clearAllBtn: {
    color: 'primary.light',
    '&:hover': { color: 'error.light' },
  },

  // ─── Filter tabs ─────────────────────────────────────────────────────────────
  filterTab: (isActive) => ({
    borderRadius: 1.5,
    textTransform: 'capitalize',
    fontSize: 12,
    fontWeight: 600,
    minWidth: 0,
    px: 1.5,
    py: 0.4,
    bgcolor: isActive ? 'primary.main' : 'transparent',
    color: isActive ? 'primary.contrastText' : 'primary.light',
    '&:hover': {
      bgcolor: isActive ? 'primary.dark' : 'action.hover',
      color: 'common.white',
    },
  }),

  // ─── List ─────────────────────────────────────────────────────────────────────
  listContainer: {
    overflowY: 'auto',
    flex: 1,
  },

  emptyState: {
    py: 7,
    px: 3,
  },

  emptyStateIcon: {
    fontSize: 52,
    color: 'text.disabled',
  },

  // ─── Footer ──────────────────────────────────────────────────────────────────
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
    borderRadius: 1.5,
    '&:hover': { bgcolor: 'action.hover' },
  },

  // ─── Notification item ────────────────────────────────────────────────────────
  listItem: (read, color) => ({
    px: 2,
    py: 1.5,
    alignItems: 'flex-start',
    bgcolor: read ? 'transparent' : alpha(color, 0.04),
    borderLeft: read ? '3px solid transparent' : `3px solid ${color}`,
    transition: 'background 0.2s',
    '&:hover': { bgcolor: alpha(color, 0.07) },
  }),

  dismissBtn: {
    opacity: 0,
    transition: 'opacity 0.15s',
    color: 'text.disabled',
    '.MuiListItem-root:hover &': { opacity: 1 },
    '&:hover': { color: 'text.primary' },
  },

  dismissIcon: {
    fontSize: 14,
  },

  itemAvatar: {
    minWidth: 40,
    mt: 0.5,
  },

  iconBox: (bg, color) => ({
    width: 36,
    height: 36,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: bg,
    color,
    flexShrink: 0,
  }),

  listItemText: (read) => ({
    cursor: read ? 'default' : 'pointer',
    pr: 2,
    my: 0,
  }),

  title: {
    maxWidth: 200,
  },

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

  // ─── Notifications page ───────────────────────────────────────────────────────
  pageRoot: {
    minHeight: '100vh',
    bgcolor: 'background.default',
    px: { xs: 2, md: 4 },
    py: 4,
  },

  pageHeader: {
    mb: 3,
  },

  pageFilterBar: {
    display: 'flex',
    gap: 1,
    flexWrap: 'wrap',
    p: 1.5,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border: '1px solid',
    borderColor: 'divider',
    mb: 3,
  },

  pageFilterTab: (isActive) => ({
    borderRadius: 1.5,
    textTransform: 'capitalize',
    fontSize: 13,
    fontWeight: 600,
    px: 2,
    py: 0.6,
    bgcolor: isActive ? 'primary.main' : 'transparent',
    color: isActive ? 'primary.contrastText' : 'text.secondary',
    '&:hover': {
      bgcolor: isActive ? 'primary.dark' : 'action.hover',
      color: isActive ? 'primary.contrastText' : 'primary.main',
    },
  }),

  pageCard: (read, color) => ({
    p: 2.5,
    mb: 1.5,
    borderRadius: 2,
    border: '1px solid',
    borderColor: read ? 'divider' : alpha(color, 0.35),
    bgcolor: read ? 'background.paper' : alpha(color, 0.03),
    borderLeft: `4px solid ${read ? 'transparent' : color}`,
    transition: 'all 0.2s',
    '&:hover': {
      borderColor: alpha(color, 0.5),
      bgcolor: alpha(color, 0.05),
      transform: 'translateY(-1px)',
      boxShadow: `0 4px 20px ${alpha(color, 0.1)}`,
    },
  }),

  pageIconBox: (bg, color) => ({
    width: 44,
    height: 44,
    borderRadius: 2,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: bg,
    color,
    flexShrink: 0,
  }),

  pageUnreadDot: (color) => ({
    width: 8,
    height: 8,
    borderRadius: '50%',
    bgcolor: color,
    flexShrink: 0,
    mt: 0.5,
  }),

  pageDetailBox: (color) => ({
    mt: 1.5,
    p: 1.5,
    borderRadius: 1.5,
    bgcolor: alpha(color, 0.05),
    border: '1px solid',
    borderColor: alpha(color, 0.15),
  }),

  pageActionBtn: (color) => ({
    fontSize: 12,
    fontWeight: 600,
    textTransform: 'none',
    color,
    borderColor: alpha(color, 0.4),
    borderRadius: 1.5,
    '&:hover': {
      borderColor: color,
      bgcolor: alpha(color, 0.06),
    },
  }),

  pageEmptyState: {
    py: 12,
  },

  pageEmptyIcon: {
    fontSize: 72,
    color: 'text.disabled',
    mb: 1,
  },
}
