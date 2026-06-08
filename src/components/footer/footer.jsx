import {
  Box,
  Stack,
  Typography,
  InputBase,
  IconButton,
  Button,
  Divider,
  Grid,
  Container,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { Logo } from '../logo/logo'
import {
  SOCIAL_ICONS,
  FOOTER_COLUMNS,
  CONTACT_ITEMS,
  LEGAL_LINKS,
} from './footerConstants'
import * as S from './footer.Styles'

export function Footer() {
  const theme = useTheme()

  return (
    <Box component="footer" sx={S.footerRoot(theme)}>
      <Container maxWidth="xl">
        <Grid container spacing={5} mb={5}>
          {/* ── Brand ── */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Logo />
            <Typography sx={S.footerDesc(theme)}>
              Pakistan's leading marketplace for products and services. Buy,
              sell, and book everything in one trusted platform.
            </Typography>
            <Stack sx={{ flexDirection: 'row', gap: 1 }}>
              {SOCIAL_ICONS.map((Icon, i) => (
                <IconButton key={i} size="small" sx={S.footerSocialBtn(theme)}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* ── Link columns ── */}
          {FOOTER_COLUMNS.map((col) => (
            <Grid size={{ xs: 6, md: 2 }} key={col.title}>
              <Typography variant="subtitle1" sx={S.footerColTitle(theme)}>
                {col.title}
              </Typography>
              <Stack sx={{ gap: 1.2 }}>
                {col.links.map((link) => (
                  <Typography
                    key={link}
                    variant="body2"
                    sx={S.footerLink(theme)}
                  >
                    {link}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* ── Contact ── */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography variant="subtitle1" sx={S.footerColTitle(theme)}>
              Contact Us
            </Typography>

            {CONTACT_ITEMS.map((item) => (
              <Stack key={item.text} sx={S.footerContactRow}>
                <Box sx={S.footerContactIcon(theme)}>
                  <item.Icon style={{ fontSize: 16 }} />
                </Box>
                <Typography variant="body2" sx={S.footerContactText(theme)}>
                  {item.text}
                </Typography>
              </Stack>
            ))}

            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={S.footerNewsletterLabel(theme)}>
                Subscribe to our newsletter
              </Typography>
              <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                <InputBase
                  placeholder="Your email"
                  sx={S.footerNewsletterInput(theme)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ minWidth: 0, px: 2 }}
                >
                  Go
                </Button>
              </Stack>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.10)', mb: 3 }} />

        <Stack sx={S.footerBottomRow}>
          <Typography variant="caption" sx={S.footerCopyright(theme)}>
            © 2025 TaskMart. All rights reserved. Made with ❤️ in Pakistan
          </Typography>
          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            {LEGAL_LINKS.map((link) => (
              <Typography
                key={link}
                variant="caption"
                sx={S.footerLegalLink(theme)}
              >
                {link}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}
