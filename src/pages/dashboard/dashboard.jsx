import {
  Box,
  Paper,
  Typography,
  Stack,
  Avatar,
  Grid,
  Chip,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  LinearProgress,
  IconButton,
  Badge,
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
  NotificationsOutlined,
  SettingsOutlined,
  LogoutOutlined,
  AddOutlined,
  VisibilityOutlined,
  PeopleOutlined,
  PaymentOutlined,
  CheckCircleOutlined,
  PendingOutlined,
  CancelOutlined,
  ArrowUpwardOutlined,
  ArrowDownwardOutlined,
  HomeOutlined,
  SearchOutlined,
  FavoriteOutlined,
  CalendarTodayOutlined,
  InventoryOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styles } from './dashboard.styles.js'
import ThemeToggle from '../../components/ThemeToggle.jsx'

/* ─────────────────── MOCK DATA ─────────────────── 
The dashboard is role-aware — change MOCK_USER.role between 'buyer', 'productSeller' and 'serviceProvider'
to see it adapt. Once your backend auth is working you can replace MOCK_USER with real data from
 your Redux store or TanStack Query.
*/

const MOCK_USER = {
  fullName: 'Abdul Qudoos',
  username: 'abdulq',
  role: 'buyer', //'productSeller', change to 'buyer' or 'serviceProvider' to test
  profileImage: '',
  country: 'Pakistan',
}

const STATS = {
  buyer: [
    {
      label: 'Total Orders',
      value: '12',
      icon: <ShoppingBagOutlined />,
      color: 'primary.main',
      trend: '+2 this month',
    },
    {
      label: 'Wishlist Items',
      value: '8',
      icon: <FavoriteOutlined />,
      color: 'error.main',
      trend: '3 on sale',
    },
    {
      label: 'Reviews Given',
      value: '5',
      icon: <StarOutlined />,
      color: 'warning.main',
      trend: '+1 this week',
    },
    {
      label: 'Active Chats',
      value: '3',
      icon: <ChatBubbleOutlined />,
      color: 'success.main',
      trend: '1 unread',
    },
  ],
  productSeller: [
    {
      label: 'Total Products',
      value: '24',
      icon: <InventoryOutlined />,
      color: 'primary.main',
      trend: '+3 this month',
    },
    {
      label: 'Total Sales',
      value: 'Rs 45K',
      icon: <TrendingUpOutlined />,
      color: 'success.main',
      trend: '+12% vs last month',
    },
    {
      label: 'Pending Orders',
      value: '6',
      icon: <PendingOutlined />,
      color: 'warning.main',
      trend: '2 urgent',
    },
    {
      label: 'Avg Rating',
      value: '4.8',
      icon: <StarOutlined />,
      color: 'warning.main',
      trend: '32 reviews',
    },
  ],
  serviceProvider: [
    {
      label: 'Active Services',
      value: '5',
      icon: <HandymanOutlined />,
      color: 'primary.main',
      trend: '+1 this month',
    },
    {
      label: 'Total Earnings',
      value: 'Rs 62K',
      icon: <TrendingUpOutlined />,
      color: 'success.main',
      trend: '+18% vs last month',
    },
    {
      label: 'Bookings',
      value: '14',
      icon: <CalendarTodayOutlined />,
      color: 'warning.main',
      trend: '3 this week',
    },
    {
      label: 'Avg Rating',
      value: '4.9',
      icon: <StarOutlined />,
      color: 'warning.main',
      trend: '58 reviews',
    },
  ],
}

const ORDERS = {
  buyer: [
    {
      id: '#1042',
      item: 'Wireless Headphones',
      seller: 'TechStore PK',
      status: 'delivered',
      amount: 'Rs 3,500',
      date: 'Apr 12',
    },
    {
      id: '#1038',
      item: 'Laptop Stand',
      seller: 'GadgetHub',
      status: 'shipped',
      amount: 'Rs 1,200',
      date: 'Apr 10',
    },
    {
      id: '#1031',
      item: 'Mechanical Keyboard',
      seller: 'KeyboardKing',
      status: 'processing',
      amount: 'Rs 7,800',
      date: 'Apr 8',
    },
    {
      id: '#1028',
      item: 'USB-C Hub',
      seller: 'TechStore PK',
      status: 'cancelled',
      amount: 'Rs 2,100',
      date: 'Apr 5',
    },
  ],
  productSeller: [
    {
      id: '#2091',
      item: 'Samsung Galaxy A54',
      buyer: 'Ali Hassan',
      status: 'processing',
      amount: 'Rs 55,000',
      date: 'Apr 14',
    },
    {
      id: '#2088',
      item: 'iPhone Case',
      buyer: 'Sara Khan',
      status: 'shipped',
      amount: 'Rs 850',
      date: 'Apr 12',
    },
    {
      id: '#2085',
      item: 'Wireless Charger',
      buyer: 'Usman Tariq',
      status: 'delivered',
      amount: 'Rs 2,400',
      date: 'Apr 10',
    },
    {
      id: '#2079',
      item: 'Bluetooth Speaker',
      buyer: 'Fatima Malik',
      status: 'delivered',
      amount: 'Rs 4,200',
      date: 'Apr 8',
    },
  ],
  serviceProvider: [
    {
      id: '#B301',
      item: 'Logo Design',
      buyer: 'Ali Hassan',
      status: 'processing',
      amount: 'Rs 5,000',
      date: 'Apr 14',
    },
    {
      id: '#B298',
      item: 'Web Development',
      buyer: 'ABC Company',
      status: 'processing',
      amount: 'Rs 25,000',
      date: 'Apr 12',
    },
    {
      id: '#B291',
      item: 'SEO Audit',
      buyer: 'Sara Khan',
      status: 'delivered',
      amount: 'Rs 8,000',
      date: 'Apr 9',
    },
    {
      id: '#B285',
      item: 'Social Media Setup',
      buyer: 'Local Shop PK',
      status: 'cancelled',
      amount: 'Rs 3,500',
      date: 'Apr 6',
    },
  ],
}

const QUICK_ACTIONS = {
  buyer: [
    { label: 'Browse Products', icon: <SearchOutlined />, path: '/products' },
    { label: 'Find Services', icon: <HandymanOutlined />, path: '/services' },
    { label: 'My Orders', icon: <ShoppingBagOutlined />, path: '/orders' },
    { label: 'Wishlist', icon: <FavoriteOutlined />, path: '/wishlist' },
  ],
  productSeller: [
    { label: 'Add Product', icon: <AddOutlined />, path: '/products/new' },
    { label: 'My Listings', icon: <InventoryOutlined />, path: '/products' },
    { label: 'View Orders', icon: <ShoppingBagOutlined />, path: '/orders' },
    { label: 'Earnings', icon: <TrendingUpOutlined />, path: '/earnings' },
  ],
  serviceProvider: [
    { label: 'Add Service', icon: <AddOutlined />, path: '/services/new' },
    { label: 'My Services', icon: <HandymanOutlined />, path: '/services' },
    { label: 'Bookings', icon: <CalendarTodayOutlined />, path: '/bookings' },
    { label: 'Earnings', icon: <TrendingUpOutlined />, path: '/earnings' },
  ],
}

const ROLE_LABELS = {
  buyer: { label: 'Buyer', icon: <ShoppingBagOutlined />, color: 'primary' },
  productSeller: {
    label: 'Product Seller',
    icon: <StorefrontOutlined />,
    color: 'success',
  },
  serviceProvider: {
    label: 'Service Provider',
    icon: <HandymanOutlined />,
    color: 'warning',
  },
}

const STATUS_CONFIG = {
  delivered: {
    label: 'Delivered',
    color: 'success',
    icon: <CheckCircleOutlined sx={{ fontSize: 14 }} />,
  },
  shipped: {
    label: 'Shipped',
    color: 'info',
    icon: <PendingOutlined sx={{ fontSize: 14 }} />,
  },
  processing: {
    label: 'Processing',
    color: 'warning',
    icon: <PendingOutlined sx={{ fontSize: 14 }} />,
  },
  cancelled: {
    label: 'Cancelled',
    color: 'error',
    icon: <CancelOutlined sx={{ fontSize: 14 }} />,
  },
}

/* ─────────────────── COMPONENT ─────────────────── */
export default function Dashboard() {
  const navigate = useNavigate()
  const role = MOCK_USER.role
  const roleInfo = ROLE_LABELS[role]
  const stats = STATS[role]
  const orders = ORDERS[role]
  const actions = QUICK_ACTIONS[role]

  return (
    <Box sx={styles.root}>
      <ThemeToggle />

      {/* ── Sidebar ── */}
      <Box sx={styles.sidebar}>
        {/* Logo */}
        <Stack
          direction="row"
          spacing={1.5}
          sx={{ alignItems: 'center', mb: 4 }}
        >
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Avatar sx={styles.topAvatar}>{MOCK_USER.fullName[0]}</Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' } }}>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {MOCK_USER.fullName}
              </Typography>
              <Chip
                size="small"
                label={roleInfo.label}
                color={roleInfo.color}
                icon={roleInfo.icon}
                sx={{ height: 20, fontSize: '0.7rem' }}
              />
            </Box>
          </Stack>
        </Stack>

        {/* Nav */}
        <Stack spacing={0.5} flex={1}>
          {[
            { label: 'Dashboard', icon: <HomeOutlined />, active: true },
            { label: 'Listings', icon: <InventoryOutlined />, active: false },
            { label: 'Orders', icon: <ShoppingBagOutlined />, active: false },
            { label: 'Messages', icon: <ChatBubbleOutlined />, active: false },
            { label: 'Payments', icon: <PaymentOutlined />, active: false },
            { label: 'Reviews', icon: <StarOutlined />, active: false },
            { label: 'Users', icon: <PeopleOutlined />, active: false },
          ].map((item) => (
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
                {item.icon}
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
          <Box sx={styles.navItem}>
            <SettingsOutlined sx={{ color: 'text.secondary', fontSize: 20 }} />
            <Typography variant="body2" color="text.secondary">
              Settings
            </Typography>
          </Box>
          <Box sx={styles.navItem} onClick={() => navigate('/login')}>
            <LogoutOutlined sx={{ color: 'error.main', fontSize: 20 }} />
            <Typography variant="body2" color="error.main">
              Logout
            </Typography>
          </Box>
        </Stack>
      </Box>

      {/* ── Main Content ── */}
      <Box sx={styles.main}>
        {/* Top bar */}
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ alignItems: 'center', mb: 3 }}
        >
          <Box>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              Welcome back, {MOCK_USER.fullName.split(' ')[0]} 👋
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Here is what is happening on your account today
            </Typography>
          </Box>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'end' }}>
            <IconButton sx={styles.iconBtn}>
              <Badge badgeContent={3} color="error">
                <NotificationsOutlined />
              </Badge>
            </IconButton>
          </Stack>
        </Stack>

        {/* Stats cards */}
        <Grid container spacing={2.5} sx={{ mb: 3 }}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} lg={3} key={stat.label}>
              <Paper elevation={0} sx={styles.statCard}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ alignItems: 'flex-start' }}
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
                  <Box
                    sx={{
                      ...styles.statIcon,
                      color: stat.color,
                      bgcolor: `${stat.color}15`,
                    }}
                  >
                    {stat.icon}
                  </Box>
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Two column layout */}
        <Grid container spacing={2.5}>
          {/* Orders / Bookings table */}
          <Grid item xs={12} lg={8}>
            <Paper elevation={0} sx={styles.section}>
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ alignItems: 'center', mb: 2.5 }}
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
                      <Chip
                        size="small"
                        label={STATUS_CONFIG[order.status].label}
                        color={STATUS_CONFIG[order.status].color}
                        icon={STATUS_CONFIG[order.status].icon}
                        sx={{ fontSize: '0.7rem', height: 22 }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Paper>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} lg={4}>
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
                    <Grid item xs={6} key={action.label}>
                      <Card
                        elevation={0}
                        onClick={() => navigate(action.path)}
                        sx={styles.actionCard}
                      >
                        <CardContent
                          sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}
                        >
                          <Box sx={styles.actionIcon}>{action.icon}</Box>
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
                  <Stack
                    direction="row"
                    justifyContent="space-between"
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
                      75%
                    </Typography>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                      height: 8,
                      borderRadius: 10,
                      bgcolor: 'grey.200',
                      '& .MuiLinearProgress-bar': {
                        background: 'linear-gradient(90deg, #2563eb, #7c3aed)',
                        borderRadius: 10,
                      },
                    }}
                  />
                  <Stack spacing={1} mt={2}>
                    {[
                      { label: 'Basic info', done: true },
                      { label: 'Profile photo', done: false },
                      { label: 'Phone number', done: true },
                      { label: 'First listing', done: true },
                    ].map((item) => (
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
                          sx={{ textDecoration: item.done ? 'none' : 'none' }}
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
