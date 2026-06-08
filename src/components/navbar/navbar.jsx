import { useContext, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
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
  Home,
  AccountCircle,
  Chat,
} from '@mui/icons-material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { Logo } from '../logo/logo'
import * as S from './navbar.Styles'
import { AuthContext } from '../../context/authContext'
import { CartContext } from '../../context/cartContext'

// ── CONSTANTS ─────────────────────────────────────────────────

const SEARCH_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'users', label: 'Users' },
  { value: 'products', label: 'Products' },
  { value: 'services', label: 'Services' },
]

const NAV_ITEMS = [
  {
    label: 'Products',
    icon: <ShoppingBag fontSize="small" />,
    path: '/products',
  },
  { label: 'Services', icon: <Build fontSize="small" />, path: '/services' },
]

const USER_MENU_ITEMS = [
  { label: 'My Profile', icon: <Person fontSize="small" />, path: '/profile' },
  {
    label: 'Account Settings',
    icon: <Settings fontSize="small" />,
    path: '/settings',
  },
  { label: 'Messages', icon: <Chat fontSize="small" />, path: '/chat' },
]

const DASHBOARD_ROLES = ['productSeller', 'serviceProvider', 'admin']

const fetchProfile = async () => {
  const res = await fetch('http://localhost:5000/api/profile/base/byUser', {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Not authenticated')
  return res.json()
}

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

// ── ACCOUNT BUTTON ────────────────────────────────────────────
/**
 * Only rendered when user is logged in.
 * - Sellers / providers / admins: "Dashboard" or "Home" (when on /dashboard)
 * - Buyers: "My Account"
 */
function AccountButton({ role, isOnDashboard }) {
  const navigate = useNavigate()

  const isDashboardUser = DASHBOARD_ROLES.includes(role)

  const handleClick = () => {
    if (isDashboardUser) {
      navigate(isOnDashboard ? '/home' : '/dashboard')
    } else {
      navigate('/my-account')
    }
  }

  const label = isDashboardUser
    ? isOnDashboard
      ? 'Home'
      : 'Dashboard'
    : 'My Account'

  const icon = isDashboardUser ? (
    isOnDashboard ? (
      <Home />
    ) : (
      <Dashboard />
    )
  ) : (
    <AccountCircle />
  )

  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={icon}
      onClick={handleClick}
      sx={S.dashboardBtn}
    >
      {label}
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
          src={profile.profileImage?.file?.url ?? undefined}
          sx={S.userAvatar}
        >
          {!profile.profileImage?.file?.url && initials}
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
            {!profile.profileImage?.file?.url && initials}
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
  const { cartCount } = useContext(CartContext)
  const user = useContext(AuthContext)

  const { data: authUser } = useQuery({
    queryKey: ['profile'],
    queryFn: fetchProfile,
    retry: false,
    // Only attempt fetch when user is logged in
    enabled: Boolean(user),
  })

  const profile = authUser?.data || authUser || null
  const isOnDashboard = location.pathname === '/dashboard'
  const userRole = user?.role ?? 'buyer'

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

          <IconButton
            onClick={() => navigate('/cart')}
            color="inherit"
            sx={{ ml: 1 }}
          >
            <Badge badgeContent={cartCount} color="error" max={99}>
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {/* ── Only shown when user is authenticated ── */}
          {user && (
            <AccountButton role={userRole} isOnDashboard={isOnDashboard} />
          )}

          {profile && <UserMenu profile={profile} />}
        </Stack>
      </Container>
    </Box>
  )
}
