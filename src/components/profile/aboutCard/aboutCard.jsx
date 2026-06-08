import { Box, Paper, Stack, Typography, Divider } from '@mui/material'
import {
  LocationOnOutlined,
  WorkOutlined,
  LinkOutlined,
  EmailOutlined,
  PhoneOutlined,
  CalendarTodayOutlined,
} from '@mui/icons-material'
import { EditableField } from '../editableField/editableField'
import { styles } from './aboutCard.Styles'

export function AboutCard({ profile, email, joinedDate, onSave }) {
  return (
    <Box sx={{ width: { xs: '100%', md: 340 }, flexShrink: 0 }}>
      <Paper elevation={0} sx={styles.paper}>
        <Typography
          variant="subtitle1"
          fontWeight={700}
          color="text.primary"
          mb={2}
        >
          About
        </Typography>
        <Stack spacing={2.5}>
          <EditableField
            label="Bio"
            value={profile.bio}
            multiline
            placeholder="Write something about yourself…"
            onSave={onSave('bio')}
          />
          <Divider />
          <EditableField
            label="Location"
            value={profile.country}
            icon={<LocationOnOutlined sx={{ fontSize: 18 }} />}
            placeholder="Add your location"
            onSave={onSave('country')}
          />
          <EditableField
            label="Occupation"
            value={profile.occupation}
            icon={<WorkOutlined sx={{ fontSize: 18 }} />}
            placeholder="Add your occupation"
            onSave={onSave('occupation')}
          />
          <EditableField
            label="Website"
            value={profile.website}
            icon={<LinkOutlined sx={{ fontSize: 18 }} />}
            placeholder="Add a link"
            onSave={onSave('website')}
          />
          <Divider />

          {/* Read-only */}
          <Stack spacing={1.5}>
            {email && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <EmailOutlined sx={styles.readOnlyIcon} />
                <Typography variant="body2" color="text.secondary">
                  {email}
                </Typography>
              </Stack>
            )}
            {profile.phone && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <PhoneOutlined sx={styles.readOnlyIcon} />
                <Typography variant="body2" color="text.secondary">
                  {profile.phone}
                </Typography>
              </Stack>
            )}
            {joinedDate && (
              <Stack direction="row" spacing={1.5} alignItems="center">
                <CalendarTodayOutlined sx={styles.readOnlyIcon} />
                <Typography variant="body2" color="text.secondary">
                  Joined {joinedDate}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      </Paper>
    </Box>
  )
}
