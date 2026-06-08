import { Paper, Stack, Typography, Divider } from '@mui/material'
import {
  PersonOutlined,
  LocationOnOutlined,
  WorkOutlined,
  LinkOutlined,
} from '@mui/icons-material'
import { EditableField } from '../editableField/editableField'
import { styles } from './personalInfoCard.Styles'

export function PersonalInfoCard({ profile, onSave }) {
  return (
    <Paper elevation={0} sx={styles.paper}>
      <Typography
        variant="subtitle1"
        fontWeight={700}
        color="text.primary"
        mb={2}
      >
        Personal Information
      </Typography>
      <Stack spacing={2.5}>
        <EditableField
          label="Full Name"
          value={profile.fullName}
          icon={<PersonOutlined sx={{ fontSize: 18 }} />}
          placeholder="Enter your full name"
          onSave={onSave('fullName')}
        />
        <Divider />
        <EditableField
          label="Bio"
          value={profile.bio}
          multiline
          placeholder="Tell people about yourself…"
          onSave={onSave('bio')}
        />
        <Divider />
        <EditableField
          label="Location"
          value={profile.country}
          icon={<LocationOnOutlined sx={{ fontSize: 18 }} />}
          placeholder="City, Country"
          onSave={onSave('country')}
        />
        <Divider />
        <EditableField
          label="Occupation"
          value={profile.occupation}
          icon={<WorkOutlined sx={{ fontSize: 18 }} />}
          placeholder="What do you do?"
          onSave={onSave('occupation')}
        />
        <Divider />
        <EditableField
          label="Website"
          value={profile.website}
          icon={<LinkOutlined sx={{ fontSize: 18 }} />}
          placeholder="https://yourwebsite.com"
          onSave={onSave('website')}
        />
      </Stack>
    </Paper>
  )
}
