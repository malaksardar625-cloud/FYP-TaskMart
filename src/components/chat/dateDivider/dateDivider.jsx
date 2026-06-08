import { Box, Typography } from '@mui/material'
import * as S from './dateDivider.Styles'

export default function DateDivider({ label }) {
  return (
    <Box sx={S.dateDivider}>
      <Box sx={S.dateDividerLine} />
      <Typography sx={S.dateDividerText}>{label}</Typography>
      <Box sx={S.dateDividerLine} />
    </Box>
  )
}
