import { alpha } from '@mui/material/styles'

// ── ROOT ─────────────────────────────────────────────────────
export const navbarRoot = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 1200,
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

// ── LOGO ─────────────────────────────────────────────────────
export const logoWrapper = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
  cursor: 'pointer',
  flexShrink: 0,
  userSelect: 'none',
}

export const logoIconBox = {
  width: 36,
  height: 36,
  borderRadius: 2,
  bgcolor: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 2,
}

export const logoText = {
  fontWeight: 800,
  letterSpacing: '-0.5px',
  display: { xs: 'none', sm: 'block' },
  color: 'text.primary',
  fontSize: '1.2rem',
}

export const logoAccent = { color: 'primary.main' }

// ── SEARCH ───────────────────────────────────────────────────
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

// ── NAV ITEMS ────────────────────────────────────────────────
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

// ── FLOATING CART ─────────────────────────────────────────────
export const cartFabWrapper = {
  position: 'fixed',
  bottom: 28,
  right: 28,
  zIndex: 1300,
}

export const cartFabBtn = {
  width: 58,
  height: 58,
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  boxShadow: 4,
  transition: 'all .2s',
  '&:hover': { bgcolor: 'primary.dark', transform: 'scale(1.07)' },
}

export const cartDrawerPaper = {
  width: { xs: '100%', sm: 400 },
  borderRadius: '16px 0 0 16px',
}

export const cartInner = {
  p: 3,
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}

export const cartHeader = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  mb: 2,
}

export const cartEmpty = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  gap: 2,
  color: 'text.secondary',
}

export const cartEmptyIcon = { fontSize: 64, opacity: 0.2 }

export const cartListItem = {
  px: 0,
  py: 1.5,
  borderBottom: '1px solid',
  borderColor: 'divider',
}

export const cartQtyBtn = {
  width: 24,
  height: 24,
  border: '1px solid',
  borderColor: 'divider',
}

export const cartItemPrice = {
  color: 'primary.main',
  fontWeight: 700,
  ml: 1,
}

export const cartRemoveBtn = { mt: 0.5, color: 'error.main' }

export const cartTotalRow = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  mb: 2,
}

export const cartTotalValue = { color: 'primary.main', fontWeight: 800 }

// ── ITEM CARD ─────────────────────────────────────────────────
export const itemCard = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  transition: 'transform .2s, box-shadow .2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: 8,
  },
}

export const itemCardWishBtn = (theme) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  bgcolor: alpha(theme.palette.background.paper, 0.92),
  '&:hover': { bgcolor: theme.palette.background.paper },
})

export const itemCardCategoryChip = (theme) => ({
  position: 'absolute',
  bottom: 8,
  right: 8,
  bgcolor: alpha(theme.palette.background.paper, 0.92),
  fontSize: '0.68rem',
  fontWeight: 600,
})

export const itemCardTitle = {
  fontWeight: 700,
  mb: 0.5,
  lineHeight: 1.3,
  color: 'text.primary',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}

export const itemCardMeta = { color: 'text.secondary', display: 'block', mb: 1 }

export const itemCardMetaAccent = {
  color: 'secondary.main',
  fontSize: '0.68rem',
}

export const itemCardPrice = { fontWeight: 800, color: 'primary.main' }

export const itemCardOriginalPrice = {
  textDecoration: 'line-through',
  color: 'text.disabled',
}

// ── FOOTER ────────────────────────────────────────────────────
export const footerRoot = {
  bgcolor: 'background.paper',
  pt: 7,
  pb: 3,
  borderTop: '2px solid',
  borderColor: 'primary.main',
}

export const footerLogoWrapper = {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 1,
  mb: 2,
}

export const footerLogoIconBox = {
  width: 38,
  height: 38,
  borderRadius: 2,
  bgcolor: 'primary.main',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

export const footerLogoAccent = { color: 'primary.main' }

export const footerDesc = {
  color: 'text.secondary',
  fontSize: '0.9rem',
  lineHeight: 1.8,
  mb: 2.5,
}

export const footerSocialBtn = (theme) => ({
  color: 'text.disabled',
  border: `1px solid ${theme.palette.divider}`,
  '&:hover': {
    color: 'primary.main',
    borderColor: theme.palette.primary.main,
  },
})

export const footerColTitle = { fontWeight: 700, mb: 2, color: 'primary.main' }

export const footerLink = {
  color: 'text.secondary',
  cursor: 'pointer',
  transition: 'color .15s',
  '&:hover': { color: 'text.primary' },
}

export const footerContactRow = {
  flexDirection: 'row',
  gap: 1.5,
  alignItems: 'flex-start',
  mb: 1.5,
}

export const footerContactIcon = {
  color: 'primary.main',
  mt: 0.2,
  flexShrink: 0,
}

export const footerContactText = { color: 'text.secondary', lineHeight: 1.6 }

export const footerNewsletterLabel = {
  color: 'text.disabled',
  display: 'block',
  mb: 1,
}

export const footerNewsletterInput = (theme) => ({
  flex: 1,
  bgcolor: 'background.default',
  borderRadius: 2,
  px: 2,
  py: 0.8,
  color: 'text.primary',
  fontSize: '0.82rem',
  border: `1px solid ${theme.palette.divider}`,
})

export const footerBottomRow = {
  flexDirection: { xs: 'column', sm: 'row' },
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: 1,
}

export const footerCopyright = { color: 'text.disabled' }

export const footerLegalLink = {
  color: 'text.disabled',
  cursor: 'pointer',
  '&:hover': { color: 'text.primary' },
}
