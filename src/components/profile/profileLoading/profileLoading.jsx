import { Box, Skeleton } from '@mui/material'
import Navbar from '../../navbar/navbar'
import { styles } from './profileLoading.Styles'

export function ProfileLoading() {
  return (
    <Box sx={styles.root}>
      <Navbar />
      <Box sx={styles.wrapper}>
        <Skeleton variant="rectangular" height={280} sx={styles.cover} />
        <Skeleton
          variant="circular"
          width={120}
          height={120}
          sx={styles.avatar}
        />
        <Skeleton width={200} height={32} sx={{ mt: 2 }} />
        <Skeleton width={300} height={20} sx={{ mt: 1 }} />
      </Box>
    </Box>
  )
}
