import { IconButton, Tooltip, CircularProgress } from '@mui/material'
import { MyLocationOutlined } from '@mui/icons-material'
import { styles } from './userLocationButton.styles'

export function UserLocationButton({ loading, onClick }) {
  return (
    <Tooltip title="Use my location" placement="left">
      <span>
        <IconButton onClick={onClick} disabled={loading} sx={styles.btn}>
          {loading ? (
            <CircularProgress size={18} />
          ) : (
            <MyLocationOutlined fontSize="small" />
          )}
        </IconButton>
      </span>
    </Tooltip>
  )
}
