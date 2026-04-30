import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import {
  Box,
  Stack,
  InputBase,
  IconButton,
  Button,
  Badge,
  Paper,
  Container,
  FormControl,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Avatar,
  Popover,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import {
  Search,
  Notifications,
  ShoppingBag,
  Build,
  Dashboard,
  Close,
  Person,
  Settings,
  Logout,
  Home,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'

import LogoutButton from '../pages/dashboard/sidebar/logout.jsx'
import { Logo } from './shared.jsx'
import * as S from './styles.js'

// ── API ───────────────────────────────────────────────────────

const fetchProfile = async () => {
  const res = await fetch('http://localhost:5000/api/profile/base/byUser', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

// ── DATA ──────────────────────────────────────────────────────

const SEARCH_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'users', label: 'Users' },
  { value: 'products', label: 'Products' },
  { value: 'services', label: 'Services' },
]

// path replaces page — NavItem uses navigate(item.path) directly
const NAV_ITEMS = [
  {
    label: 'Products',
    icon: <ShoppingBag fontSize="small" />,
    path: '/products',
  },
  {
    label: 'Services',
    icon: <Build fontSize="small" />,
    path: '/services',
  },
]

const USER_MENU_ITEMS = [
  { label: 'My Profile', icon: <Person fontSize="small" />, path: '/profile' },
  {
    label: 'Account Settings',
    icon: <Settings fontSize="small" />,
    path: '/settings',
  },
]

// ── SEARCH BAR ────────────────────────────────────────────────

function SearchBar() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  const handleFilterChange = (e) => setFilter(e.target.value)
  const handleQueryChange = (e) => setQuery(e.target.value)
  const handleClear = () => setQuery('')

  return (
    <Paper elevation={0} sx={S.searchBar}>
      <FormControl variant="standard" sx={{ minWidth: 0 }}>
        <Select
          disableUnderline
          value={filter}
          onChange={handleFilterChange}
          IconComponent={() => null}
          sx={S.searchFilter}
        >
          {SEARCH_FILTERS.map((f) => (
            <MenuItem key={f.value} value={f.value}>
              {f.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Box sx={S.searchDivider} />
      <Search sx={S.searchIcon} />

      <InputBase
        value={query}
        onChange={handleQueryChange}
        placeholder="Search users, products, services..."
        sx={S.searchInput}
      />

      {query && (
        <IconButton size="small" onClick={handleClear} sx={S.searchClearBtn}>
          <Close fontSize="small" />
        </IconButton>
      )}
    </Paper>
  )
}

// ── NAV ITEM ──────────────────────────────────────────────────

function NavItem({ item }) {
  const navigate = useNavigate()

  const handleClick = () => navigate(item.path)

  return (
    <Button startIcon={item.icon} onClick={handleClick} sx={S.navBtn}>
      {item.label}
    </Button>
  )
}

// ── USER MENU ─────────────────────────────────────────────────

function UserMenu({ profile }) {
  const navigate = useNavigate()
  const [anchor, setAnchor] = useState(null)

  const isOpen = Boolean(anchor)

  const handleOpen = (e) => setAnchor(e.currentTarget)
  const handleClose = () => setAnchor(null)

  const handleNavigate = (path) => {
    handleClose()
    navigate(path)
  }

  const initials = profile.fullName
    ? profile.fullName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : ''

  return (
    <>
      <IconButton onClick={handleOpen} sx={S.userAvatarBtn}>
        <Avatar
          src={profile.profileImage.file.url ?? undefined}
          sx={S.userAvatar}
        >
          {!profile.profilePhoto && initials}
        </Avatar>
      </IconButton>

      <Popover
        open={isOpen}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ paper: { sx: S.userPopover } }}
      >
        <Box sx={S.userPopoverHeader}>
          <Avatar
            src={profile.profileImage?.file?.url ?? undefined}
            sx={S.userPopoverAvatar}
          >
            {!profile.profilePhoto && initials}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" fontWeight={700}>
              {profile.fullName}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              {profile.user?.email ?? '—'}
            </Typography>
            <Box sx={S.userRoleBadge}>
              <Typography variant="caption" fontWeight={600}>
                {profile.role?.[0] ?? 'Buyer'}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        <List disablePadding sx={S.userMenuList}>
          {USER_MENU_ITEMS.map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => handleNavigate(item.path)}
              sx={S.userMenuItem}
            >
              <ListItemIcon sx={S.userMenuIcon}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Divider />

        <LogoutButton styles={{ navItem: S.userMenuLogout }} />
      </Popover>
    </>
  )
}

// ── NAVBAR ────────────────────────────────────────────────────

export default function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [showMsg, setShowMsg] = useState(false)

  const { data: authUser } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false,
  })

  const profile = authUser?.data || authUser || null

  const isOnDashboard = location.pathname === '/dashboard'

  const handleDashboard = () => {
    if (isOnDashboard) {
      navigate('/')
    } else if (profile) {
      navigate('/dashboard')
    } else {
      setShowMsg(true)
    }
  }

  const handleCloseMsg = () => setShowMsg(false)

  const handleSignIn = () => {
    setShowMsg(false)
    navigate('/login')
  }

  return (
    <Box component="header" sx={S.navbarRoot}>
      <Container maxWidth="xl">
        <Stack sx={S.navbarInner}>
          <Logo />

          <SearchBar />

          <Box sx={{ flex: 1 }} />

          <Stack sx={S.navItemsRow}>
            {NAV_ITEMS.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </Stack>

          <IconButton sx={S.notifBtn}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          <Button
            variant="contained"
            color="primary"
            startIcon={isOnDashboard ? <Home /> : <Dashboard />}
            onClick={handleDashboard}
            sx={S.dashboardBtn}
          >
            {isOnDashboard ? 'Home' : 'Dashboard'}
          </Button>

          {profile && <UserMenu profile={profile} />}

          <Snackbar
            open={showMsg}
            autoHideDuration={6000}
            onClose={handleCloseMsg}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >
            <Alert
              severity="warning"
              onClose={handleCloseMsg}
              action={
                <Button color="inherit" size="small" onClick={handleSignIn}>
                  Sign in
                </Button>
              }
            >
              Sign in or create an account to access your dashboard.
            </Alert>
          </Snackbar>
        </Stack>
      </Container>
    </Box>
  )
}
