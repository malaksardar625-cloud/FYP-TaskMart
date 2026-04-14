export const styles = {
  root: {
    minHeight: '10vh',
    bgcolor: 'background.default',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    px: 3,
    py: 3,
  },

  wrapper: {
    width: '100%',
    maxWidth: 500,
  },

  brandRow: {
    mb: 3,
  },

  logoMark: {
    width: 32,
    height: 32,
    borderRadius: 2,
    background: (theme) =>
      `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
    boxShadow: (theme) => `0 2px 8px ${theme.palette.primary.main}44`,
  },

  brandName: {
    fontWeight: 700,
  },
  card: {
    p: { xs: 3, sm: 4 },
    borderRadius: 1.5,
    border: '1px solid',
    borderColor: 'grey.200',
  },

  heading: {
    mb: 0.5,
  },

  subheading: {
    mb: 3,
  },

  alert: {
    mb: 2.5,
  },

  form: {
    // Stack handles spacing via `spacing` prop
  },

  icon: {
    color: 'grey.400',
    fontSize: 20,
  },

  submitBtn: {
    // Styled globally via theme — no overrides needed here
  },

  divider: {
    my: 3,
  },

  footerText: {
    // body2 color handled by theme
  },
}
