export const convItem = (isActive) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1.5,
  px: 2,
  py: 1.5,
  cursor: 'pointer',
  bgcolor: isActive ? 'primary.light' : 'transparent',
  borderLeft: '3px solid',
  borderColor: isActive ? 'primary.main' : 'transparent',
  transition: 'all 0.15s',
  '&:hover': { bgcolor: isActive ? 'primary.light' : 'action.hover' },
})

export const avatarWrapper = {
  position: 'relative',
  flexShrink: 0,
}

export const convAvatar = (isActive) => ({
  width: 46,
  height: 46,
  bgcolor: isActive ? 'primary.main' : 'secondary.main',
  fontSize: '0.9rem',
  fontWeight: 700,
  flexShrink: 0,
})

export const onlineDot = {
  width: 10,
  height: 10,
  borderRadius: '50%',
  bgcolor: '#44c767',
  border: '2px solid',
  borderColor: 'background.paper',
  position: 'absolute',
  bottom: 2,
  right: 2,
}

export const convItemContent = {
  flex: 1,
  minWidth: 0,
}

export const convItemTopRow = {
  display: 'flex',
  alignItems: 'baseline',
  justifyContent: 'space-between',
  mb: 0.25,
}

export const convName = (hasUnread) => ({
  fontWeight: hasUnread ? 700 : 500,
  fontSize: '0.9rem',
  color: 'text.primary',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  maxWidth: 160,
})

export const convTime = (hasUnread) => ({
  fontSize: '0.7rem',
  color: hasUnread ? 'primary.main' : 'text.disabled',
  fontWeight: hasUnread ? 700 : 400,
  flexShrink: 0,
  ml: 0.5,
})

export const convLastMsg = (hasUnread) => ({
  fontSize: '0.8rem',
  color: hasUnread ? 'text.primary' : 'text.secondary',
  fontWeight: hasUnread ? 600 : 400,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

export const convUnreadBadge = {
  width: 20,
  height: 20,
  borderRadius: '50%',
  bgcolor: 'primary.main',
  color: 'primary.contrastText',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '0.68rem',
  fontWeight: 700,
  flexShrink: 0,
}
