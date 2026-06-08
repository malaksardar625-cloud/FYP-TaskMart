import { useContext } from 'react'
import { Box, Container, Divider } from '@mui/material'
import {
  ShoppingBagOutlined,
  StarOutlined,
  ChatBubbleOutlined,
  FavoriteOutlined,
  SettingsOutlined,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext'
import Navbar from '../../components/navbar/navbar'
import {
  ProfileHeader,
  QuickLinks,
  GrowSection,
} from '../../components/myAccount'

const QUICK_LINKS = [
  { label: 'My Orders', icon: <ShoppingBagOutlined />, path: '/orders' },
  { label: 'Wishlist', icon: <FavoriteOutlined />, path: '/wishlist' },
  { label: 'My Reviews', icon: <StarOutlined />, path: '/reviews' },
  { label: 'Messages', icon: <ChatBubbleOutlined />, path: '/messages' },
  { label: 'Settings', icon: <SettingsOutlined />, path: '/settings' },
]

export default function MyAccountPage() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  return (
    <Box>
      <Navbar />
      <Container maxWidth="md" sx={{ py: 5 }}>
        <ProfileHeader user={user} onEdit={() => navigate('/profile')} />
        <QuickLinks links={QUICK_LINKS} onNavigate={navigate} />
        <Divider sx={{ mb: 3 }} />
        <GrowSection
          onBecomeSeller={() => navigate('/settings/become-seller')}
          onBecomeProvider={() => navigate('/settings/become-provider')}
        />
      </Container>
    </Box>
  )
}
