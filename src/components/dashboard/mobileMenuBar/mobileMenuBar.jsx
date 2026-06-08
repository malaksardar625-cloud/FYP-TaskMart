import { Box, IconButton, Typography } from '@mui/material'
import { MenuOutlined } from '@mui/icons-material'
import { styles } from './mobileMenuBar.Styles'

export function MobileMenuBar({ onOpen }) {
  return (
    <Box sx={styles.wrapper}>
      <IconButton onClick={onOpen}>
        <MenuOutlined />
      </IconButton>
      <Typography fontWeight={700}>TaskMart</Typography>
    </Box>
  )
}
