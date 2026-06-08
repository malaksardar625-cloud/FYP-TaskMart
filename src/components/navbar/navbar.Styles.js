import { alpha } from '@mui/material/styles'

// ── ROOT ──────────────────────────────────────────────────────
export const navbarRoot = {
  position: 'sticky',
  top: 0,
  zIndex: (theme) => theme.zIndex.appBar,
  width: '100%',
  bgcolor: 'background.paper',
  borderBottom: '1px solid',
  borderColor: 'divider',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 1px 16px rgba(0,0,0,0.08)',
}

export const navbarInner = {
  flexDirection: 'row',
  alignItems: 'center',
  height: 68,
  gap: 2,
}

// ── SEARCH ────────────────────────────────────────────────────
export const searchBar = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  border: `1.5px solid ${theme.palette.divider}`,
  borderRadius: 3,
  bgcolor: 'background.default',
  px: 1.5,
  py: 0.5,
  width: { xs: 160, sm: 240, md: 340 },
  transition: 'border-color 0.2s',
  '&:focus-within': { borderColor: theme.palette.primary.main },
})

export const searchFilter = {
  color: 'text.secondary',
  fontSize: '0.75rem',
  fontWeight: 600,
  '& .MuiSelect-select': { pr: '0 !important', py: 0 },
}

export const searchSubFilter = {
  color: 'text.secondary',
  fontSize: '0.75rem',
  fontWeight: 500,
  cursor: 'pointer',
  '& .MuiSelect-select': { pr: '0 !important', py: 0 },
}

export const searchFilterItem = {
  fontSize: '0.82rem',
  fontWeight: 600,
  color: 'text.primary',
}

export const searchDivider = {
  width: '1px',
  height: 18,
  bgcolor: 'divider',
  flexShrink: 0,
}

export const searchIcon = {
  color: 'text.disabled',
  fontSize: 18,
  flexShrink: 0,
}

export const searchInput = {
  flex: 1,
  color: 'text.primary',
  fontSize: '0.82rem',
  minWidth: 0,
  '& ::placeholder': { color: 'text.disabled' },
}

export const searchClearBtn = {
  color: 'text.disabled',
  p: 0,
  '&:hover': { color: 'text.primary' },
}

// ── NAV ITEMS ─────────────────────────────────────────────────
export const navItemsRow = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 0.5,
  display: { xs: 'none', md: 'flex' },
}

export const navItemWrapper = {
  position: 'relative',
  display: 'inline-block',
}

export const navBtn = {
  color: 'text.primary',
  fontWeight: 600,
  fontSize: '0.9rem',
  px: 1.5,
  py: 1,
  borderRadius: 2,
  textTransform: 'none',
  '&:hover': { bgcolor: 'action.hover', color: 'primary.main' },
}

export const navArrow = {
  fontSize: '18px !important',
  transition: 'transform 0.2s ease',
  color: 'text.secondary',
}

export const navArrowOpen = {
  transform: 'rotate(180deg)',
  color: 'primary.main',
}

export const navDropdown = (theme) => ({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  minWidth: 190,
  zIndex: 1300,
  overflow: 'hidden',
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: 2,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
})

export const navDropdownItem = {
  fontSize: '0.85rem',
  fontWeight: 500,
  py: 1.1,
  px: 2,
  color: 'text.primary',
  transition: 'all 0.15s',
  '&:hover': { bgcolor: 'action.hover', color: 'primary.main', pl: 3 },
}

// ── RIGHT ACTIONS ─────────────────────────────────────────────
export const notifBtn = {
  color: 'text.secondary',
  '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
}

export const dashboardBtn = {
  display: { xs: 'none', sm: 'flex' },
  fontWeight: 700,
  px: 2.5,
}

// ── USER MENU ─────────────────────────────────────────────────
export const userAvatarBtn = {
  p: 0.5,
  '&:hover': { bgcolor: 'action.hover' },
}

export const userAvatar = {
  width: 36,
  height: 36,
  fontSize: '0.85rem',
  fontWeight: 700,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  cursor: 'pointer',
  transition: 'opacity 0.2s',
  '&:hover': { opacity: 0.85 },
}

export const userPopover = {
  width: 280,
  borderRadius: 3,
  mt: 1,
  overflow: 'hidden',
}

export const userPopoverHeader = {
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 2,
}

export const userPopoverAvatar = {
  width: 48,
  height: 48,
  fontSize: '1rem',
  fontWeight: 700,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  flexShrink: 0,
}

export const userRoleBadge = {
  display: 'inline-flex',
  mt: 0.5,
  px: 1,
  py: 0.25,
  borderRadius: 1,
  bgcolor: 'primary.light',
  color: 'primary.main',
}

export const userMenuList = {
  py: 0.5,
}

export const userMenuItem = {
  px: 2,
  py: 1,
  '&:hover': { bgcolor: 'action.hover' },
}

export const userMenuIcon = {
  minWidth: 36,
  color: 'text.secondary',
}

export const userMenuLogout = {
  px: 2,
  py: 1,
  '&:hover': {
    bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
    '& .MuiListItemIcon-root': { color: 'error.main' },
    '& .MuiListItemText-primary': { color: 'error.main' },
  },
}

export const userMenuLogoutIcon = {
  minWidth: 36,
  color: 'text.secondary',
}
