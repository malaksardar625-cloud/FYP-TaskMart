import { Box, Button, Chip, Stack, Typography } from '@mui/material'
import { ArrowForward } from '@mui/icons-material'
import { useTheme } from '@mui/material/styles'
import { viewAllBtn } from './sectionHeader.Styles'

/**
 * Reusable section header: chip + title + subtitle + "View All" button.
 *
 * Props:
 *   chip      – label text for the Chip
 *   title     – section heading
 *   subtitle  – supporting copy
 *   onViewAll – click handler for the View All button
 *   isWatch   – boolean, compact breakpoint
 *   isMobile  – boolean, mobile breakpoint
 *   light     – boolean, white text (for dark/parallax backgrounds)
 */
export default function SectionHeader({
  chip,
  title,
  subtitle,
  onViewAll,
  isWatch,
  isMobile,
  light = false,
}) {
  const theme = useTheme()

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      sx={{ justifyContent: 'space-between', mb: 5, gap: 2 }}
    >
      <Box>
        <Chip
          label={chip}
          sx={{
            mb: 1.5,
            bgcolor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            fontWeight: 700,
          }}
        />
        <Typography
          variant={isWatch ? 'h6' : isMobile ? 'h5' : 'h4'}
          sx={{
            fontWeight: 800,
            color: light ? '#fff' : theme.palette.text.primary,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            mt: 0.5,
            mb: 2,
            lineHeight: 1.7,
            color: light
              ? 'rgba(255,255,255,0.70)'
              : theme.palette.text.secondary,
          }}
        >
          {subtitle}
        </Typography>
      </Box>

      <Button
        variant="text"
        endIcon={<ArrowForward />}
        onClick={onViewAll}
        disableRipple
        sx={viewAllBtn(theme)}
      >
        {isWatch ? 'All' : 'View All'}
      </Button>
    </Stack>
  )
}
