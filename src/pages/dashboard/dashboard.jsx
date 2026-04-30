import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'

import {
  Box,
  Paper,
  Typography,
  Stack,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Card,
  CardContent,
  IconButton,
  CircularProgress,
} from '@mui/material'

import {
  ShoppingBagOutlined,
  StorefrontOutlined,
  HandymanOutlined,
  TrendingUpOutlined,
  StarOutlined,
  ChatBubbleOutlined,
  AddOutlined,
  VisibilityOutlined,
  CheckCircleOutlined,
  PendingOutlined,
  CancelOutlined,
  SearchOutlined,
  FavoriteOutlined,
  CalendarTodayOutlined,
  InventoryOutlined,
  MenuOutlined,
} from '@mui/icons-material'

import { styles } from './dashboard.styles'
import Sidebar from './sidebar/sidebar'
import Navbar from '../../components/Navbar'

import STATS_DATA from '../../mockData/stats.json'
import ORDERS_DATA from '../../mockData/orders.json'
import ACTIONS_DATA from '../../mockData/quickActions.json'
import STATUS_DATA from '../../mockData/statusConfig.json'
import PROFILE_DATA from '../../mockData/profileSteps.json'

// ── CONSTANTS ─────────────────────────────────────────────────

const STAT_ICONS = {
  'Total Orders': <ShoppingBagOutlined />,
  'Wishlist Items': <FavoriteOutlined />,
  'Reviews Given': <StarOutlined />,
  'Active Chats': <ChatBubbleOutlined />,
  'Total Products': <InventoryOutlined />,
  'Total Sales': <TrendingUpOutlined />,
  'Pending Orders': <PendingOutlined />,
  'Avg Rating': <StarOutlined />,
  'Active Services': <HandymanOutlined />,
  'Total Earnings': <TrendingUpOutlined />,
  Bookings: <CalendarTodayOutlined />,
}

const ACTION_ICONS = {
  'Browse Products': <SearchOutlined />,
  'Find Services': <HandymanOutlined />,
  'My Orders': <ShoppingBagOutlined />,
  Wishlist: <FavoriteOutlined />,
  'Add Product': <AddOutlined />,
  'My Listings': <InventoryOutlined />,
  'View Orders': <ShoppingBagOutlined />,
  Earnings: <TrendingUpOutlined />,
  'Add Service': <AddOutlined />,
  'My Services': <HandymanOutlined />,
  Bookings: <CalendarTodayOutlined />,
}

const STATUS_ICONS = {
  delivered: <CheckCircleOutlined sx={{ fontSize: 14 }} />,
  shipped: <PendingOutlined sx={{ fontSize: 14 }} />,
  processing: <PendingOutlined sx={{ fontSize: 14 }} />,
  cancelled: <CancelOutlined sx={{ fontSize: 14 }} />,
}

// ── API ───────────────────────────────────────────────────────

const api = async (url) => {
  const res = await fetch(`http://localhost:5000${url}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

// ── DASHBOARD ─────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const { data: authUser, isLoading: userLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api('/api/profile/base/byUser'),
  })

  const profile = authUser?.data || authUser
  const role = profile?.role?.[0] || 'buyer'
  const stats = STATS_DATA[role] || STATS_DATA.buyer
  const orders = ORDERS_DATA[role] || ORDERS_DATA.buyer
  const actions = ACTIONS_DATA[role] || ACTIONS_DATA.buyer
  const profileSteps = PROFILE_DATA

  const handleOpenMobile = () => setMobileOpen(true)
  const handleCloseMobile = () => setMobileOpen(false)
  const handleCompleteProfile = () => navigate('/profile-setup')

  if (userLoading) {
    return (
      <Box sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <CircularProgress />
      </Box>
    )
  }

  const firstName = profile?.fullName?.split(' ')[0] || 'User'
  const done = profileSteps.filter((x) => x.done).length
  const pct = Math.round((done / profileSteps.length) * 100)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* ── Row 1: Navbar — full width, sticky in flow ── */}
      <Navbar />

      {/* ── Row 2: Sidebar + Main — fills remaining viewport height ── */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* Sidebar starts exactly where Navbar ends — no overlap */}
        <Sidebar
          mobileOpen={mobileOpen}
          onClose={handleCloseMobile}
          user={{
            fullName: profile.fullName,
            country: profile.country,
            userName: profile.user.userName,
            role: profile.role,
            profileImageUrl: profile.profileImage.file.url || 'default',
          }}
        />

        {/* ── Main scrollable area ── */}
        <Box
          component="main"
          sx={{
            ...styles.main,
            flexGrow: 1,
            overflow: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            pb: 4,
            pt: 3,
          }}
        >
          {/* Mobile top bar — hamburger + brand, xs only */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              mb: 2,
              pb: 1.5,
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            <IconButton onClick={handleOpenMobile}>
              <MenuOutlined />
            </IconButton>
            <Typography fontWeight={700}>TaskMart</Typography>
          </Box>

          {/* ── Header ── */}
          <Stack
            direction="row"
            sx={{
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 3,
            }}
          >
            <Box>
              <Typography variant="h5" fontWeight={700}>
                Welcome back, {firstName} 👋
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Here's what's happening on your account today
              </Typography>
            </Box>
          </Stack>

          {/* ── Stats ── */}
          <Grid container spacing={2.5} sx={{ mb: 3 }}>
            {stats.map((stat) => (
              <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
                <Paper elevation={0} sx={styles.statCard}>
                  <Stack
                    direction="row"
                    sx={{ justifyContent: 'space-between' }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        {stat.label}
                      </Typography>
                      <Typography variant="h4" fontWeight={700}>
                        {stat.value}
                      </Typography>
                      <Typography variant="caption">{stat.trend}</Typography>
                    </Box>
                    <Box
                      sx={{
                        ...styles.statIcon,
                        color: stat.color,
                        bgcolor: `${stat.color}15`,
                      }}
                    >
                      {STAT_ICONS[stat.label]}
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* ── Main grid ── */}
          <Grid container spacing={2.5}>
            {/* Orders */}
            <Grid size={{ xs: 12, lg: 8 }}>
              <Paper elevation={0} sx={styles.section}>
                <Stack
                  direction="row"
                  sx={{ justifyContent: 'space-between', mb: 2.5 }}
                >
                  <Typography fontWeight={600}>Recent Orders</Typography>
                  <Button endIcon={<VisibilityOutlined />}>View all</Button>
                </Stack>

                <Stack spacing={1.5}>
                  {orders.map((order) => (
                    <Box key={order.id} sx={styles.orderRow}>
                      <Stack direction="row" sx={{ gap: 2, flex: 1 }}>
                        <Box sx={styles.orderIcon}>
                          {role === 'buyer' ? (
                            <ShoppingBagOutlined />
                          ) : role === 'serviceProvider' ? (
                            <HandymanOutlined />
                          ) : (
                            <StorefrontOutlined />
                          )}
                        </Box>
                        <Box sx={{ flex: 1 }}>
                          <Typography fontWeight={600}>{order.item}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.id}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack direction="row" sx={{ gap: 2 }}>
                        <Typography fontWeight={600}>{order.amount}</Typography>
                        <Chip
                          size="small"
                          label={STATUS_DATA[order.status].label}
                          color={STATUS_DATA[order.status].color}
                          icon={STATUS_ICONS[order.status]}
                        />
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </Paper>
            </Grid>

            {/* Right column */}
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={2.5}>
                {/* Quick Actions */}
                <Paper elevation={0} sx={styles.section}>
                  <Typography fontWeight={600} sx={{ mb: 2 }}>
                    Quick Actions
                  </Typography>
                  <Grid container spacing={1.5}>
                    {actions.map((action) => (
                      <Grid size={{ xs: 6 }} key={action.label}>
                        <Card
                          elevation={0}
                          sx={styles.actionCard}
                          onClick={() => navigate(action.path)}
                        >
                          <CardContent>
                            <Box sx={styles.actionIcon}>
                              {ACTION_ICONS[action.label]}
                            </Box>
                            <Typography variant="caption">
                              {action.label}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </Paper>

                {/* Profile Completion */}
                <Paper elevation={0} sx={styles.section}>
                  <Typography fontWeight={600}>Profile Completion</Typography>
                  <Typography variant="caption" color="text.secondary">
                    Complete your profile to build trust
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <LinearProgress variant="determinate" value={pct} />
                    <Typography sx={{ mt: 1 }} variant="caption">
                      {pct}% Complete
                    </Typography>

                    <Stack spacing={1} sx={{ mt: 2 }}>
                      {profileSteps.map((item) => (
                        <Stack key={item.label} direction="row" sx={{ gap: 1 }}>
                          <CheckCircleOutlined
                            sx={{
                              fontSize: 16,
                              color: item.done ? 'success.main' : 'grey.400',
                            }}
                          />
                          <Typography variant="caption">
                            {item.label}
                          </Typography>
                        </Stack>
                      ))}
                    </Stack>

                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={handleCompleteProfile}
                    >
                      Complete Profile
                    </Button>
                  </Box>
                </Paper>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
