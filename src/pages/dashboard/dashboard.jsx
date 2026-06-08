import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { Box, Grid, Stack, CircularProgress } from '@mui/material'
import { AuthContext } from '../../context/authContext'
import Navbar from '../../components/navbar/navbar'
import Sidebar from './sidebar'
import {
  MobileMenuBar,
  DashboardHeader,
  StatsGrid,
  RecentOrders,
  QuickActions,
  ProfileCompletion,
} from '../../components/dashboard'
import ACTIONS_DATA from '../../mockData/quickActions.json'

const api = async (url) => {
  try {
    const res = await fetch(`http://localhost:5000${url}`, {
      credentials: 'include',
    })
    if (!res.ok) throw new Error('Request failed')
    return res.json()
  } catch {
    return {}
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { user: ctxUser } = useContext(AuthContext)

  const { data: authUser, isLoading: userLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => api('/api/profile/base/byUser'),
  })

  const profile = authUser?.data || authUser || {}
  const role = profile?.role?.[0] || ctxUser?.role || 'buyer'
  const actions = ACTIONS_DATA[role] || ACTIONS_DATA.buyer

  const { data: statsRes, isLoading: statsLoading } = useQuery({
    queryKey: ['dashboardStats', role],
    queryFn: () => api(`/api/dashboard/stats?role=${role}`),
    enabled: !userLoading,
    placeholderData: { stats: [] },
  })
  const stats = statsRes?.stats || statsRes?.data?.stats || []

  const { data: ordersRes, isLoading: ordersLoading } = useQuery({
    queryKey: ['dashboardOrders', role],
    queryFn: () => api(`/api/dashboard/orders?role=${role}`),
    enabled: !userLoading,
    placeholderData: { orders: [] },
  })
  const orders = ordersRes?.orders || ordersRes?.data?.orders || []

  const profileSteps = [
    { label: 'Basic info', done: !!(profile?.fullName && profile?.country) },
    { label: 'Profile photo', done: !!profile?.profileImage?.file?.url },
    { label: 'Phone number', done: !!profile?.phone },
    { label: 'Bio / About', done: !!profile?.bio },
    { label: 'First listing', done: !!profile?.hasListing },
  ]

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
      <Navbar />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            px: { xs: 2, sm: 3, md: 4 },
            pb: 4,
            pt: 3,
          }}
        >
          <MobileMenuBar onOpen={() => setMobileOpen(true)} />
          <DashboardHeader firstName={firstName} />
          <StatsGrid stats={stats} statsLoading={statsLoading} role={role} />

          <Grid container spacing={2.5}>
            <Grid size={{ xs: 12, lg: 8 }}>
              <RecentOrders
                orders={orders}
                ordersLoading={ordersLoading}
                role={role}
              />
            </Grid>
            <Grid size={{ xs: 12, lg: 4 }}>
              <Stack spacing={2.5}>
                <QuickActions actions={actions} />
                <ProfileCompletion
                  profileSteps={profileSteps}
                  pct={pct}
                  onComplete={() => navigate('/profile-setup')}
                />
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  )
}
