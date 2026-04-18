import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Grid,
  Chip,
  Button,
  LinearProgress,
  Card,
  CardContent,
} from '@mui/material'
import {
  ShoppingBagOutlined,
  StorefrontOutlined,
  HandymanOutlined,
  TrendingUpOutlined,
  StarOutlined,
  ChatBubbleOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AddOutlined,
  VisibilityOutlined,
  PeopleOutlined,
  PaymentOutlined,
  CheckCircleOutlined,
  PendingOutlined,
  CancelOutlined,
  HomeOutlined,
  SearchOutlined,
  FavoriteOutlined,
  CalendarTodayOutlined,
  InventoryOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styles } from './dashboard.styles.js'
import NotificationsPopover from './Notifications/Notificationspopover.jsx'
import LogoutButton from './logout.jsx'

// ── JSON imports (all mock data lives in src/mockData/) ──────────────
import MOCK_USER from '../../mockData/user.json'
import STATS_DATA from '../../mockData/stats.json'
import ORDERS_DATA from '../../mockData/orders.json'
import ACTIONS_DATA from '../../mockData/quickActions.json'
import ROLE_DATA from '../../mockData/roleLabels.json'
import STATUS_DATA from '../../mockData/statusConfig.json'
import NAV_DATA from '../../mockData/navItems.json'
import PROFILE_DATA from '../../mockData/profileSteps.json'

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

// Quick-action icons  (key = action.label from quickActions.json)
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

// Role icons  (key = role string from user.json)
const ROLE_ICONS = {
  buyer: <ShoppingBagOutlined />,
  productSeller: <StorefrontOutlined />,
  serviceProvider: <HandymanOutlined />,
}

// Nav icons  (key = nav item label from navItems.json)
const NAV_ICONS = {
  Dashboard: <HomeOutlined />,
  Listings: <InventoryOutlined />,
  Orders: <ShoppingBagOutlined />,
  Messages: <ChatBubbleOutlined />,
  Payments: <PaymentOutlined />,
  Reviews: <StarOutlined />,
  Users: <PeopleOutlined />,
}

// Status icons  (key = status string from statusConfig.json)
const STATUS_ICONS = {
  delivered: <CheckCircleOutlined sx={{ fontSize: 14 }} />,
  shipped: <PendingOutlined sx={{ fontSize: 14 }} />,
  processing: <PendingOutlined sx={{ fontSize: 14 }} />,
  cancelled: <CancelOutlined sx={{ fontSize: 14 }} />,
}

/* ─────────────────── COMPONENT ─────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()

  // Pull current role from JSON — change "role" in user.json to switch views
  const role = MOCK_USER.role

  // Resolve role-level data from JSON
  const roleInfo = ROLE_DATA[role] // { label, color }
  const stats = STATS_DATA[role] // array of stat objects
  const orders = ORDERS_DATA[role] // array of order objects
  const actions = ACTIONS_DATA[role] // array of action objects
  const navItems = NAV_DATA // flat array
  const profileSteps = PROFILE_DATA // flat array

  return (
    <Box sx={styles.root}>
      {/* ── Sidebar ── */}
      <Box sx={styles.sidebar}>
        {/* User info */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: 'center', mb: 4 }}
        >
          <Avatar sx={styles.topAvatar}>{MOCK_USER.fullName[0]}</Avatar>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Typography variant="body2" fontWeight={600} color="text.primary">
              {MOCK_USER.fullName}
            </Typography>
            <Chip
              size="small"
              label={roleInfo.label}
              color={roleInfo.color}
              icon={ROLE_ICONS[role]}
              sx={{ height: 20, fontSize: '0.7rem' }}
            />
          </Box>
        </Stack>

        {/* Nav links */}
        <Stack spacing={0.5} flex={1}>
          {navItems.map((item) => (
            <Box
              key={item.label}
              sx={{
                ...styles.navItem,
                ...(item.active ? styles.navItemActive : {}),
              }}
            >
              <Box
                sx={{
                  color: item.active ? 'primary.main' : 'text.secondary',
                  display: 'flex',
                }}
              >
                {NAV_ICONS[item.label]}
              </Box>
              <Typography
                variant="body2"
                fontWeight={item.active ? 600 : 400}
                color={item.active ? 'primary.main' : 'text.secondary'}
              >
                {item.label}
              </Typography>
            </Box>
          ))}
        </Stack>

        {/* Bottom actions */}
        <Stack spacing={0.5}>
          <Box sx={styles.navItem} onClick={() => navigate('/settings')}>
            <SettingsOutlined sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              Settings
            </Typography>
          </Box>
          <LogoutButton styles={styles} />
        </Stack>
      </Box>

      {/* ── Main Content ── */}
      <Box sx={styles.main}>
        {/* Top bar */}
        <Stack
          direction="row"
          sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 3 }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Welcome back, {MOCK_USER.fullName.split(' ')[0]} 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Here is what is happening on your account today
            </Typography>
          </Box>
          <NotificationsPopover />
        </Stack>

        {/* ── Stat Cards ── */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {stats.map((stat) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={stat.label}>
              <Paper elevation={0} sx={styles.statCard}>
                <Stack
                  direction="row"
                  sx={{
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <Box>
                    <Typography variant="body2" color="text.secondary" mb={0.5}>
                      {stat.label}
                    </Typography>
                    <Typography
                      variant="h4"
                      fontWeight={700}
                      color="text.primary"
                    >
                      {stat.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ mt: 0.5, display: 'block' }}
                    >
                      {stat.trend}
                    </Typography>
                  </Box>
                  {/* Icon resolved from STAT_ICONS map using stat.label */}
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

        {/* ── Two-column layout ── */}
        <Grid container spacing={2.5}>
          {/* Orders / Bookings table */}
          <Grid size={{ xs: 12, lg: 8 }}>
            <Paper elevation={0} sx={styles.section}>
              <Stack
                direction="row"
                sx={{
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mb: 2.5,
                }}
              >
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.primary"
                >
                  {role === 'buyer'
                    ? 'Recent Orders'
                    : role === 'serviceProvider'
                      ? 'Recent Bookings'
                      : 'Recent Orders'}
                </Typography>
                <Button
                  variant="text"
                  size="small"
                  endIcon={<VisibilityOutlined />}
                >
                  View all
                </Button>
              </Stack>

              <Stack spacing={1.5}>
                {orders.map((order) => (
                  <Box key={order.id} sx={styles.orderRow}>
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: 'center', flex: 1 }}
                    >
                      {/* Role-aware order icon */}
                      <Box sx={styles.orderIcon}>
                        {role === 'buyer' ? (
                          <ShoppingBagOutlined
                            sx={{ fontSize: 18, color: 'primary.main' }}
                          />
                        ) : role === 'serviceProvider' ? (
                          <HandymanOutlined
                            sx={{ fontSize: 18, color: 'warning.main' }}
                          />
                        ) : (
                          <StorefrontOutlined
                            sx={{ fontSize: 18, color: 'success.main' }}
                          />
                        )}
                      </Box>

                      <Box flex={1}>
                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{ alignItems: 'center' }}
                        >
                          <Typography
                            variant="body2"
                            fontWeight={600}
                            color="text.primary"
                          >
                            {order.item}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {order.id}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" color="text.secondary">
                          {/* buyer sees seller name; seller/provider sees buyer name */}
                          {role === 'buyer'
                            ? `From: ${order.seller}`
                            : `By: ${order.buyer}`}{' '}
                          · {order.date}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ alignItems: 'center' }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={600}
                        color="text.primary"
                      >
                        {order.amount}
                      </Typography>
                      {/* Status chip — config resolved from STATUS_DATA (statusConfig.json) */}
                      <Chip
                        size="small"
                        label={STATUS_DATA[order.status].label}
                        color={STATUS_DATA[order.status].color}
                        icon={STATUS_ICONS[order.status]}
                        sx={{ fontSize: '0.7rem', height: 22 }}
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
              {/* Quick actions */}
              <Paper elevation={0} sx={styles.section}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.primary"
                  mb={2}
                >
                  Quick Actions
                </Typography>
                <Grid container spacing={1.5}>
                  {actions.map((action) => (
                    <Grid size={{ xs: 6 }} key={action.label}>
                      <Card
                        elevation={0}
                        onClick={() => navigate(action.path)}
                        sx={styles.actionCard}
                      >
                        <CardContent
                          sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}
                        >
                          {/* Icon resolved from ACTION_ICONS map using action.label */}
                          <Box sx={styles.actionIcon}>
                            {ACTION_ICONS[action.label]}
                          </Box>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color="text.primary"
                          >
                            {action.label}
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Profile completion */}
              <Paper elevation={0} sx={styles.section}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  color="text.primary"
                  mb={0.5}
                >
                  Profile Completion
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Complete your profile to build trust
                </Typography>

                <Box sx={{ mt: 2 }}>
                  {/* Progress bar — value computed from profileSteps.json */}
                  {(() => {
                    const total = profileSteps.length
                    const done = profileSteps.filter((s) => s.done).length
                    const pct = Math.round((done / total) * 100)
                    return (
                      <>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: 'space-between' }}
                          mb={0.5}
                        >
                          <Typography variant="caption" color="text.secondary">
                            Progress
                          </Typography>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color="primary.main"
                          >
                            {pct}%
                          </Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate"
                          value={pct}
                          sx={{
                            height: 8,
                            borderRadius: 10,
                            bgcolor: 'grey.200',
                            '& .MuiLinearProgress-bar': {
                              background:
                                'linear-gradient(90deg, #2563eb, #7c3aed)',
                              borderRadius: 10,
                            },
                          }}
                        />
                      </>
                    )
                  })()}

                  <Stack spacing={1} mt={2}>
                    {profileSteps.map((item) => (
                      <Stack
                        key={item.label}
                        direction="row"
                        spacing={1}
                        sx={{ alignItems: 'center' }}
                      >
                        <CheckCircleOutlined
                          sx={{
                            fontSize: 16,
                            color: item.done ? 'success.main' : 'grey.300',
                          }}
                        />
                        <Typography
                          variant="caption"
                          color={item.done ? 'text.primary' : 'text.secondary'}
                        >
                          {item.label}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Button
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() => navigate('/profile-setup')}
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
  )
}
