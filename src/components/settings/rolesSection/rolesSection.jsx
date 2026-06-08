import { Box, Typography, Stack, CircularProgress, Chip } from '@mui/material'
import { StorefrontOutlined, HandymanOutlined } from '@mui/icons-material'
import { RoleCard } from '../roleCard/roleCard'
import { styles } from './rolesSection.Styles'

export function RolesSection({
  rolesLoading,
  sellerProfile,
  providerProfile,
  onNavigate,
}) {
  return (
    <Box>
      <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
        Roles
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Expand your presence on TaskMart by becoming a seller or service
        provider
      </Typography>

      {rolesLoading ? (
        <Box sx={styles.loadingBox}>
          <CircularProgress />
        </Box>
      ) : (
        <Stack spacing={2.5}>
          <RoleCard
            icon={<StorefrontOutlined />}
            title="Product Seller"
            description="List physical or digital products, manage inventory, and process orders — all from one dashboard."
            active={!!sellerProfile}
            profile={sellerProfile}
            approvedLabel="Approved"
            pendingLabel="Pending Approval"
            features={[
              'Set up a shop',
              'Upload product listings',
              'Track orders',
            ]}
            manageLabel="Manage Shop"
            onManage={() => onNavigate('/settings/seller')}
            onGetStarted={() => onNavigate('/settings/become-seller')}
            renderProfile={(p) => (
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  <strong>Shop name:</strong> {p.shopName}
                </Typography>
                {p.shopDescription && (
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={styles.descClamp}
                  >
                    <strong>Description:</strong> {p.shopDescription}
                  </Typography>
                )}
              </Stack>
            )}
          />

          <RoleCard
            icon={<HandymanOutlined />}
            title="Service Provider"
            description="Offer your expertise as a freelancer or agency. Set your own rates and connect with clients looking for your skills."
            active={!!providerProfile}
            profile={providerProfile}
            approvedLabel="Approved"
            pendingLabel="Pending Approval"
            features={[
              'Create a profile',
              'Add your skills',
              'Receive service requests',
            ]}
            manageLabel="Manage Profile"
            onManage={() => onNavigate('/settings/provider')}
            onGetStarted={() => onNavigate('/settings/become-provider')}
            renderProfile={(p) => (
              <Stack spacing={0.5}>
                <Typography variant="caption" color="text.secondary">
                  <strong>Title:</strong> {p.title}
                </Typography>
                <Stack direction="row" spacing={0.5} flexWrap="wrap">
                  {p.skills?.slice(0, 4).map((s) => (
                    <Chip
                      key={s}
                      label={s}
                      size="small"
                      sx={styles.skillChip}
                    />
                  ))}
                  {p.skills?.length > 4 && (
                    <Chip
                      label={`+${p.skills.length - 4}`}
                      size="small"
                      sx={styles.skillChip}
                    />
                  )}
                </Stack>
              </Stack>
            )}
          />
        </Stack>
      )}
    </Box>
  )
}
