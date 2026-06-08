import {
  Paper,
  Stack,
  Box,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert,
} from '@mui/material'
import {
  ShoppingBagOutlined,
  HandymanOutlined,
  StorefrontOutlined,
  VisibilityOutlined,
} from '@mui/icons-material'
import { STATUS_ICONS } from '../dashboard.constants'
import { styles } from './recentOrders.Styles'
import STATUS_DATA from '../../../mockData/statusConfig.json'

const ROLE_ICON = {
  buyer: <ShoppingBagOutlined />,
  serviceProvider: <HandymanOutlined />,
  seller: <StorefrontOutlined />,
}

export function RecentOrders({ orders, ordersLoading, role }) {
  return (
    <Paper elevation={0} sx={styles.section}>
      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2.5 }}>
        <Typography fontWeight={600}>Recent Orders</Typography>
        <Button endIcon={<VisibilityOutlined />}>View all</Button>
      </Stack>

      {ordersLoading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress size={28} />
        </Box>
      ) : orders.length === 0 ? (
        <Alert severity="info" variant="outlined">
          No orders yet. They will appear here once your backend returns data
          from <code>/api/dashboard/orders?role={role}</code>
        </Alert>
      ) : (
        <Stack spacing={1.5}>
          {orders.map((order) => (
            <Box key={order._id || order.id} sx={styles.orderRow}>
              <Stack direction="row" gap={2} flex={1}>
                <Box sx={styles.orderIcon}>
                  {ROLE_ICON[role] ?? <ShoppingBagOutlined />}
                </Box>
                <Box flex={1}>
                  <Typography fontWeight={600}>
                    {order.item || order.name || 'Order'}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {order._id || order.id}
                  </Typography>
                </Box>
              </Stack>
              <Stack direction="row" gap={2}>
                <Typography fontWeight={600}>{order.amount}</Typography>
                {order.status && STATUS_DATA[order.status] && (
                  <Chip
                    size="small"
                    label={STATUS_DATA[order.status].label}
                    color={STATUS_DATA[order.status].color}
                    icon={STATUS_ICONS[order.status]}
                  />
                )}
              </Stack>
            </Box>
          ))}
        </Stack>
      )}
    </Paper>
  )
}
