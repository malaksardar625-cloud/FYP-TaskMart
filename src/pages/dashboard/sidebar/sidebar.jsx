import {
  Box,
  Typography,
  Stack,
  Avatar,
  Chip,
  Drawer,
  IconButton,
} from '@mui/material'
import {
  ShoppingBagOutlined,
  StorefrontOutlined,
  HandymanOutlined,
  StarOutlined,
  ChatBubbleOutlined,
  SettingsOutlined,
  HomeOutlined,
  InventoryOutlined,
  PeopleOutlined,
  PaymentOutlined,
  CloseOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { styles } from '../dashboard.styles.js'
import LogoutButton from './logout.jsx'

import MOCK_USER from '../../../mockData/user.json'
import ROLE_DATA from '../../../mockData/roleLabels.json'
import NAV_DATA from '../../../mockData/navItems.json'

const ROLE_ICONS = {
  buyer: <ShoppingBagOutlined />,
  productSeller: <StorefrontOutlined />,
  serviceProvider: <HandymanOutlined />,
}

const NAV_ICONS = {
  Dashboard: <HomeOutlined />,
  Listings: <InventoryOutlined />,
  Orders: <ShoppingBagOutlined />,
  Messages: <ChatBubbleOutlined />,
  Payments: <PaymentOutlined />,
  Reviews: <StarOutlined />,
  Users: <PeopleOutlined />,
}

export default function Sidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate()
  const role = MOCK_USER.role
  const roleInfo = ROLE_DATA[role]

  const content = (
    <Box sx={styles.sidebar}>
      {/* Close button — mobile only */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          justifyContent: 'flex-end',
          mb: 1,
        }}
      >
        <IconButton onClick={onClose} size="small">
          <CloseOutlined />
        </IconButton>
      </Box>

      {/* User info */}
      <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center', mb: 4 }}>
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
      <Stack spacing={0.5} flex={1} sx={{ overflow: 'auto' }}>
        {NAV_DATA.map((item) => (
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
  )

  return (
    <>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 260,
            boxSizing: 'border-box',
            overflow: 'hidden',
          },
        }}
      >
        {content}
      </Drawer>

      {/* Desktop — always visible */}
      <Box sx={{ display: { xs: 'none', md: 'block' }, overflow: 'hidden' }}>
        {content}
      </Box>
    </>
  )
}
