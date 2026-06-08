import {
  PaletteOutlined,
  PersonOutlined,
  NotificationsOutlined,
  LockOutlined,
  DeleteOutlined,
  BadgeOutlined,
  LightModeOutlined,
  DarkModeOutlined,
  SettingsBrightnessOutlined,
} from '@mui/icons-material'

export const SECTION_NAV = [
  { id: 'appearance', label: 'Appearance', icon: <PaletteOutlined /> },
  { id: 'account', label: 'Account', icon: <PersonOutlined /> },
  { id: 'roles', label: 'Roles', icon: <BadgeOutlined /> },
  {
    id: 'notifications',
    label: 'Notifications',
    icon: <NotificationsOutlined />,
  },
  { id: 'privacy', label: 'Privacy', icon: <LockOutlined /> },
  { id: 'danger', label: 'Account Actions', icon: <DeleteOutlined /> },
]
export const THEME_OPTIONS = [
  {
    value: 'light',
    label: 'Light',
    desc: 'Clean white interface',
    icon: <LightModeOutlined />,
  },
  {
    value: 'dark',
    label: 'Dark',
    desc: 'Easy on the eyes at night',
    icon: <DarkModeOutlined />,
  },
  {
    value: 'system',
    label: 'System',
    desc: 'Follows your device settings',
    icon: <SettingsBrightnessOutlined />,
  },
]

export const NOTIFICATION_ITEMS = [
  {
    key: 'orderUpdates',
    label: 'Order updates',
    desc: 'Get notified when your order status changes',
    group: 'activity',
  },
  {
    key: 'newMessages',
    label: 'New messages',
    desc: 'Receive alerts for incoming chat messages',
    group: 'activity',
  },
  {
    key: 'reviews',
    label: 'Reviews',
    desc: 'When someone leaves a review on your listing',
    group: 'activity',
  },
  {
    key: 'systemAlerts',
    label: 'System alerts',
    desc: 'Important platform announcements and updates',
    group: 'activity',
  },
  {
    key: 'promotions',
    label: 'Promotions',
    desc: 'Deals, discounts and special offers',
    group: 'email',
  },
  {
    key: 'emailDigest',
    label: 'Weekly digest',
    desc: 'A summary of activity sent every Monday',
    group: 'email',
  },
]

export const PRIVACY_ITEMS = [
  {
    key: 'profileVisible',
    label: 'Public profile',
    desc: 'Let others find and view your profile',
  },
  {
    key: 'showPhone',
    label: 'Show phone number',
    desc: 'Display your phone on your public profile',
  },
  {
    key: 'showEmail',
    label: 'Show email',
    desc: 'Display your email on your public profile',
  },
  {
    key: 'allowMessages',
    label: 'Allow messages',
    desc: 'Let other users send you direct messages',
  },
]
