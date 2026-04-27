import { useState, useRef } from 'react'
import {
  Box,
  Stack,
  Typography,
  InputBase,
  IconButton,
  Button,
  Badge,
  Paper,
  Container,
  FormControl,
  Select,
  AppBar,
  Toolbar,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  Search,
  Notifications,
  ShoppingBag,
  Build,
  Dashboard,
  KeyboardArrowDown,
  Storefront,
  Close,
} from '@mui/icons-material'

import { PAGES } from './shared.jsx'
import * as S from './styles.js'
import { Logo } from './shared.jsx'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

// ── DATA ──────────────────────────────────────────────────────

const SEARCH_FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'user', label: 'Users' },
  { value: 'product', label: 'Products' },
  { value: 'service', label: 'Services' },
]

const NAV_ITEMS = [
  {
    label: 'Products',
    icon: <ShoppingBag fontSize="small" />,
    page: PAGES.PRODUCTS,
    submenu: ['All Products', 'Featured', 'New Arrivals', 'Flash Sales'],
  },
  {
    label: 'Services',
    icon: <Build fontSize="small" />,
    page: PAGES.SERVICES,
    submenu: ['All Services', 'Home Repair', 'Tutoring', 'Digital Services'],
  },
]

// ── SEARCH BAR ────────────────────────────────────────────────

function SearchBar() {
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  return (
    <Paper elevation={0} sx={S.searchBar}>
      <FormControl variant="standard" sx={{ minWidth: 0 }}>
        <Select
          disableUnderline
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          IconComponent={() => null}
          sx={S.searchFilter}
        >
          {SEARCH_FILTERS.map(
            () =>
              function NavDropdownItem({ item, setPage }) {
                const [open, setOpen] = useState(false)
                const closeTimer = useRef(null)

                const handleEnter = () => {
                  clearTimeout(closeTimer.current)
                  setOpen(true)
                }

                const handleLeave = () => {
                  closeTimer.current = setTimeout(() => setOpen(false), 120)
                }

                return (
                  <Box
                    sx={S.navItemWrapper}
                    onMouseEnter={handleEnter}
                    onMouseLeave={handleLeave}
                  >
                    <Button
                      startIcon={item.icon}
                      endIcon={<KeyboardArrowDown />}
                      onClick={() => setPage(item.page)}
                      sx={S.navBtn}
                    >
                      {item.label}
                    </Button>

                    {open && (
                      <Paper elevation={4} sx={S.navDropdown}>
                        {item.submenu.map((sub) => (
                          <Box
                            key={sub}
                            onClick={() => {
                              setPage(item.page)
                              setOpen(false)
                            }}
                            sx={S.navDropdownItem}
                          >
                            {sub}
                          </Box>
                        ))}
                      </Paper>
                    )}
                  </Box>
                )
              }
          )}
        </Select>
      </FormControl>

      <Box sx={S.searchDivider} />
      <Search sx={S.searchIcon} />

      <InputBase
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search users, products, services..."
        sx={S.searchInput}
      />

      {query && (
        <IconButton
          size="small"
          onClick={() => setQuery('')}
          sx={S.searchClearBtn}
        >
          <Close fontSize="small" />
        </IconButton>
      )}
    </Paper>
  )
}

// ── NAV DROPDOWN ITEM ─────────────────────────────────────────

function NavDropdownItem({ item, setPage }) {
  const [open, setOpen] = useState(false)
  const closeTimer = useRef(null)

  const handleEnter = () => {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  return (
    <Box
      sx={S.navItemWrapper}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Button
        startIcon={item.icon}
        endIcon={
          <KeyboardArrowDown
            sx={{ ...S.navArrow, ...(open ? S.navArrowOpen : {}) }}
          />
        }
        onClick={() => setPage(item.page)}
        sx={S.navBtn}
        disableRipple={false}
      >
        {item.label}
      </Button>

      {open && (
        <Paper elevation={4} sx={S.navDropdown}>
          {item.submenu.map((sub) => (
            <Box
              key={sub}
              onClick={() => {
                setPage(item.page)
                setOpen(false)
              }}
              sx={S.navDropdownItem}
            >
              {sub}
            </Box>
          ))}
        </Paper>
      )}
    </Box>
  )
}

// ── NAVBAR ────────────────────────────────────────────────────

export function Navbar({ setPage }) {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [showMsg, setShowMsg] = useState(false)

  const handleDashboard = () => {
    if (user) {
      navigate('/dashboard')
    } else {
      setShowMsg(true)
    }
  }
  return (
    <Box component="header" sx={S.navbarRoot}>
      <Container maxWidth="xl">
        <Stack sx={S.navbarInner}>
          {/* Logo */}
          <Logo />

          {/* Search */}
          <SearchBar />

          <Box sx={{ flex: 1 }} />

          {/* Products & Services nav */}
          <Stack sx={S.navItemsRow}>
            {NAV_ITEMS.map((item) => (
              <NavDropdownItem key={item.label} item={item} setPage={setPage} />
            ))}
          </Stack>

          {/* Notifications */}
          <IconButton sx={S.notifBtn}>
            <Badge badgeContent={3} color="error">
              <Notifications />
            </Badge>
          </IconButton>

          {/* Dashboard */}
          <>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Dashboard />}
              onClick={handleDashboard}
              sx={S.dashboardBtn}
            >
              Dashboard
            </Button>

            {/* Toast message with sign in button */}
            <Snackbar
              open={showMsg}
              autoHideDuration={6000}
              onClose={() => setShowMsg(false)}
              anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
              <Alert
                severity="warning"
                onClose={() => setShowMsg(false)}
                action={
                  <Button
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setShowMsg(false)
                      navigate('/login')
                    }}
                  >
                    Sign in
                  </Button>
                }
              >
                Sign in or create an account to access your dashboard.
              </Alert>
            </Snackbar>
          </>
        </Stack>
      </Container>
    </Box>
  )
}
