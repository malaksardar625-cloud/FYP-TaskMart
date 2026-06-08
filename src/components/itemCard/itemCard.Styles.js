import { alpha } from '@mui/material/styles'

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
