import { useState, useEffect, useCallback, useContext } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Snackbar, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useThemeMode } from '../../context/themeContext'
import { AuthContext } from '../../context/authContext'
import { styles } from './settings.Styles'
import {
  SettingsSidebar,
  AppearanceSection,
  AccountSection,
  RolesSection,
  NotificationsSection,
  PrivacySection,
  DangerSection,
  Logout
} from '../../components/settings'

const api = async (url) => {
  const res = await fetch(`http://localhost:5000${url}`, {
    credentials: 'include',
  })
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export default function Settings() {
  const navigate = useNavigate()
  const { mode, toggleMode, resolvedMode } = useThemeMode()
  useContext(AuthContext)

  const { data: authUser } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api('/api/profile/base/byUser'),
  })
  const profile = authUser?.data || authUser

  const [activeSection, setActiveSection] = useState('appearance')
  const [themeChoice, setThemeChoice] = useState(mode)
  const [editingAccount, setEditingAccount] = useState(false)
  const [accountForm, setAccountForm] = useState({
    fullName: '',
    username: '',
    email: '',
    phone: '',
    bio: '',
  })
  const [sellerProfile, setSellerProfile] = useState(null)
  const [providerProfile, setProviderProfile] = useState(null)
  const [rolesLoading, setRolesLoading] = useState(false)
  const [notifications, setNotifications] = useState({
    orderUpdates: true,
    newMessages: true,
    promotions: false,
    reviews: true,
    systemAlerts: true,
    emailDigest: false,
  })
  const [privacy, setPrivacy] = useState({
    profileVisible: true,
    showPhone: false,
    showEmail: false,
    allowMessages: true,
  })
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  })

  const showSnackbar = (message, severity = 'success') =>
    setSnackbar({ open: true, message, severity })
  const closeSnackbar = () => setSnackbar((p) => ({ ...p, open: false }))

  useEffect(() => {
    if (profile) {
      setAccountForm({
        fullName: profile?.fullName || '',
        username: profile?.user?.userName || '',
        email: profile?.user?.email || '',
        phone: profile?.phone || '',
        bio: profile?.bio || '',
      })
    }
  }, [profile])

  const fetchRoleProfiles = useCallback(async () => {
    if (!profile?._id) return
    setRolesLoading(true)
    try {
      const [sellerRes, providerRes] = await Promise.allSettled([
        fetch(`http://localhost:5000/api/sellers/me`, {
          credentials: 'include',
        }),
        fetch(`http://localhost:5000/api/providers?user=${profile?._id}`, {
          credentials: 'include',
        }),
      ])
      if (sellerRes.status === 'fulfilled' && sellerRes.value.ok) {
        const data = await sellerRes.value.json()
        setSellerProfile(data?.data || data || null)
      }
      if (providerRes.status === 'fulfilled' && providerRes.value.ok) {
        const data = await providerRes.value.json()
        setProviderProfile(data?.data || data || null)
      }
    } catch {
      /* leave null */
    } finally {
      setRolesLoading(false)
    }
  }, [profile?._id])

  useEffect(() => {
    if (activeSection === 'roles') fetchRoleProfiles()
  }, [activeSection, fetchRoleProfiles])

  const handleThemeChange = (value) => {
    setThemeChoice(value)
    toggleMode(value)
    showSnackbar('Appearance updated')
  }

  const handleSaveAccount = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/profile/base`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(accountForm),
      })
      if (!res.ok) throw new Error()
      setEditingAccount(false)
      showSnackbar('Account details saved')
    } catch {
      showSnackbar('Failed to save account details', 'error')
    }
  }

  const handleNotificationToggle = (key) => {
    setNotifications((p) => ({ ...p, [key]: !p[key] }))
    showSnackbar('Notification preference updated')
  }

  const handlePrivacyToggle = (key) => {
    setPrivacy((p) => ({ ...p, [key]: !p[key] }))
    showSnackbar('Privacy setting updated')
  }

  // ── Section map — keeps JSX out of render ─────────────────────
  const SECTIONS = {
    appearance: (
      <AppearanceSection
        themeChoice={themeChoice}
        resolvedMode={resolvedMode}
        onThemeChange={handleThemeChange}
      />
    ),
    account: (
      <AccountSection
        profile={profile}
        accountForm={accountForm}
        editing={editingAccount}
        onFormChange={(key, val) =>
          setAccountForm((p) => ({ ...p, [key]: val }))
        }
        onEdit={() => setEditingAccount(true)}
        onSave={handleSaveAccount}
        onChangePassword={() => navigate('/forgot-password')}
      />
    ),
    roles: (
      <RolesSection
        rolesLoading={rolesLoading}
        sellerProfile={sellerProfile}
        providerProfile={providerProfile}
        onNavigate={navigate}
      />
    ),
    notifications: (
      <NotificationsSection
        notifications={notifications}
        onToggle={handleNotificationToggle}
      />
    ),
    privacy: (
      <PrivacySection privacy={privacy} onToggle={handlePrivacyToggle} />
    ),
    danger: <DangerSection />,
    logout: <Logout/>
  }

  return (
    <Box sx={styles.root}>
      <SettingsSidebar
        activeSection={activeSection}
        onSelect={setActiveSection}
        onBack={() => navigate('/dashboard')}
      />
      <Box sx={styles.main}>{SECTIONS[activeSection]}</Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2500}
        onClose={closeSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ borderRadius: 2 }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  )
}
