import {
  ShoppingBagOutlined,
  FavoriteOutlined,
  StarOutlined,
  ChatBubbleOutlined,
  InventoryOutlined,
  TrendingUpOutlined,
  PendingOutlined,
  HandymanOutlined,
  CalendarTodayOutlined,
  SearchOutlined,
  AddOutlined,
  CheckCircleOutlined,
  CancelOutlined,
} from '@mui/icons-material'

export const STAT_ICONS = {
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

export const ACTION_ICONS = {
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

export const STATUS_ICONS = {
  delivered: <CheckCircleOutlined sx={{ fontSize: 14 }} />,
  shipped: <PendingOutlined sx={{ fontSize: 14 }} />,
  processing: <PendingOutlined sx={{ fontSize: 14 }} />,
  cancelled: <CancelOutlined sx={{ fontSize: 14 }} />,
}
