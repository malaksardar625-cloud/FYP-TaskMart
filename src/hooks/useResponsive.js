import { useTheme, useMediaQuery } from '@mui/material'

/**
 * useResponsive
 * ─────────────────────────────────────────────────────────────
 * Drop-in hook that exposes:
 *   • device flags   — isWatch | isMobile | isTablet | isDesktop
 *   • shared sx      — sectionPad | viewAllSx | cardHoverSx | stripSx
 *
 * Usage:
 *   const { isWatch, isMobile, sectionPad, viewAllSx, cardHoverSx, stripSx } = useResponsive()
 */
export function useResponsive() {
  const theme = useTheme()
  const t = theme.palette
  const isDark = t.mode === 'dark'

  // ── Device flags ──────────────────────────────────────────
  const isWatch = useMediaQuery('(max-width:320px)') // smartwatch
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')) // phone
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  // ── Shared sx objects ─────────────────────────────────────

  /** Consistent vertical + horizontal padding across every section */
  const sectionPad = {
    py: { xs: 5, sm: 7, md: 10 },
    px: { xs: 2, sm: 3, md: 4 },
  }

  /**
   * Arrow "View All" button — no border, no outline, colour-aware
   * @param {string} [color]  override text colour (default: primary.main)
   */
  const viewAllSx = (color) => ({
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    background: 'none',
    color: color || t.primary.main,
    fontWeight: 700,
    px: { xs: 1.5, sm: 2 },
    minWidth: 'unset',
    gap: 0.5,
    transition: 'color 0.18s, transform 0.18s',
    '&:hover': {
      background: 'none',
      color: color
        ? 'rgba(255,255,255,0.90)'
        : isDark
          ? t.primary.light
          : t.primary.dark,
      transform: 'translateX(4px)',
    },
  })

  /**
   * Hover lift effect for feature / why-cards
   * @param {boolean} [disabled]  pass isWatch to skip transform on tiny screens
   */
  const cardHoverSx = (disabled = false) => ({
    transition: 'border-color 0.22s, transform 0.22s, box-shadow 0.22s',
    '&:hover': {
      borderColor: t.primary.main,
      transform: disabled ? 'none' : 'translateY(-5px)',
      boxShadow: `0 14px 36px ${
        isDark ? 'rgba(0,0,0,0.38)' : 'rgba(35,83,71,0.13)'
      }`,
    },
  })

  /**
   * Coupon / offer strip base styles
   * @param {'dashed'|'solid'} [borderStyle]
   */
  const stripSx = (borderStyle = 'dashed') => ({
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    alignItems: { xs: 'flex-start', sm: 'center' },
    gap: { xs: 2, sm: 3 },
    mt: 6,
    borderRadius: 3,
    p: { xs: 2, sm: 3, md: 3.5 },
    border: `1.5px ${borderStyle} ${t.primary.main}`,
  })

  /** Coupon strip on light bg */
  const couponStripSx = {
    ...stripSx('dashed'),
    bgcolor: isDark ? t.primary.dark : t.primary.light,
  }

  /** Offer strip on dark/image bg (glassmorphism) */
  const offerStripSx = {
    ...stripSx('solid'),
    bgcolor: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(12px)',
  }

  /** CTA button hover — lift + shadow */
  const ctaHoverSx = {
    fontWeight: 700,
    flexShrink: 0,
    transition: 'transform 0.18s, box-shadow 0.18s',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.26)',
    },
    '&:active': { transform: 'translateY(0)' },
  }

  return {
    // flags
    isWatch,
    isMobile,
    isTablet,
    isDesktop,
    isDark,
    t,
    theme,
    // sx helpers
    sectionPad,
    viewAllSx,
    cardHoverSx,
    couponStripSx,
    offerStripSx,
    ctaHoverSx,
  }
}
