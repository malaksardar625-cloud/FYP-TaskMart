export const leftPanel = (isMobileOpen) => ({
  width: { xs: isMobileOpen ? '100%' : 0, md: 340 },
  minWidth: { md: 340 },
  display: { xs: isMobileOpen ? 'flex' : 'none', md: 'flex' },
  flexDirection: 'column',
  borderRight: '1px solid',
  borderColor: 'divider',
  bgcolor: 'background.paper',
  flexShrink: 0,
  overflow: 'hidden',
  transition: 'width 0.2s ease',
})

export const leftPanelHeader = {
  px: 2,
  py: 1.75,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid',
  borderColor: 'divider',
  flexShrink: 0,
}

export const leftPanelTitle = {
  fontWeight: 800,
  fontSize: '1.1rem',
  color: 'text.primary',
}

export const leftPanelActions = {
  display: 'flex',
  alignItems: 'center',
  gap: 0.5,
}

export const newChatBtn = {
  color: 'primary.main',
  '&:hover': { bgcolor: 'primary.light' },
}

export const searchWrapper = {
  px: 2,
  py: 1,
  flexShrink: 0,
}

export const searchInput = (theme) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 1,
  px: 1.5,
  py: 0.75,
  borderRadius: 3,
  bgcolor: 'background.default',
  border: `1px solid ${theme.palette.divider}`,
  '&:focus-within': { borderColor: theme.palette.primary.main },
})

export const convList = {
  flex: 1,
  overflowY: 'auto',
  '&::-webkit-scrollbar': { width: 4 },
  '&::-webkit-scrollbar-track': { bgcolor: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    bgcolor: 'divider',
    borderRadius: 2,
  },
}

export const noConversations = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  p: 3,
  color: 'text.secondary',
}
