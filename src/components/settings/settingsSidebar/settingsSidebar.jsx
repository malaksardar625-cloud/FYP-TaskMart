import { useState } from 'react'
import { Box, Stack, Typography, IconButton } from '@mui/material'
import { ArrowBackOutlined } from '@mui/icons-material'

import { SECTION_NAV } from '../settings.constants'
import { styles } from './settingsSidebar.Styles'
import { SettingsNavItem } from './settingsNavItem/settingsNavItem'
import { LogoutOutlined } from '@mui/icons-material'
import { logoutUser } from '../../../api/authApi'
import { useNavigate } from 'react-router-dom'

export function SettingsSidebar({ activeSection, onSelect, onBack }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const handleLogout = async () => {
    try {
      setLoading(true)

      await logoutUser(navigate)

      localStorage.removeItem('user')

      navigate('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={styles.sidebar}>
      <Stack direction="row" spacing={1} alignItems="center" mb={3}>
        <IconButton size="small" onClick={onBack}>
          <ArrowBackOutlined fontSize="small" />
        </IconButton>

        <Typography variant="body2" fontWeight={600}>
          Back to Dashboard
        </Typography>
      </Stack>

      <Typography variant="h6" fontWeight={700} mb={2}>
        Settings
      </Typography>

      <Stack spacing={0.5}>
        {SECTION_NAV.map((section) => (
          <SettingsNavItem
            key={section.id}
            icon={section.icon}
            label={section.label}
            active={activeSection === section.id}
            onClick={() => onSelect(section.id)}
          />
        ))}

        {/* ✅ Logout using SAME component */}
        <SettingsNavItem
          icon={<LogoutOutlined sx={{ color: 'error.main' }} />}
          label={loading ? 'Logging out...' : 'Logout'}
          active={false}
          onClick={handleLogout}
        />
      </Stack>
    </Box>
  )
}
