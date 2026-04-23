import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  InputBase,
  IconButton,
  Button,
  Chip,
  Avatar,
  Badge,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Container,
  Drawer,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material'
import {
  ShoppingCart,
  Close,
  Add,
  Remove,
  Delete,
  LocalOffer,
  Storefront,
  FavoriteBorder,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  LocationOn,
  Phone,
  Email,
} from '@mui/icons-material'

import couponsData from '../mockData/coupons.json'
import * as S from './styles.js'

// ── CONSTANTS ────────────────────────────────────────────────
export const PAGES = {
  HOME: 'home',
  PRODUCTS: 'products',
  SERVICES: 'services',
}

const BADGE_COLOR_MAP = {
  'Best Seller': 'warning',
  New: 'info',
  Sale: 'error',
  Hot: 'error',
  'Top Rated': 'success',
  Popular: 'secondary',
}

const FOOTER_COLUMNS = [
  {
    title: 'Marketplace',
    links: [
      'All Products',
      'All Services',
      'Top Sellers',
      'New Arrivals',
      'Flash Sales',
    ],
  },
  {
    title: 'Company',
    links: ['About Us', 'How It Works', 'Careers', 'Press', 'Blog'],
  },
  {
    title: 'Support',
    links: [
      'Help Center',
      'Contact Us',
      'Returns Policy',
      'Shipping Info',
      'Privacy Policy',
    ],
  },
]

const CONTACT_ITEMS = [
  { Icon: LocationOn, text: 'Office 14, Blue Area, Islamabad, Pakistan' },
  { Icon: Phone, text: '+92 300 1234567' },
  { Icon: Email, text: 'support@taskmart.pk' },
]

const SOCIAL_ICONS = [Facebook, Twitter, Instagram, LinkedIn]

const LEGAL_LINKS = ['Terms', 'Privacy', 'Cookies']

// ── HELPERS ──────────────────────────────────────────────────
export const badgeColor = (b) => BADGE_COLOR_MAP[b] || 'default'

// ── STARS ────────────────────────────────────────────────────
export function Stars({ value, count }) {
  return (
    <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 0.5 }}>
      <Rating
        value={value}
        precision={0.1}
        size="small"
        readOnly
        sx={{ color: 'secondary.main' }}
      />
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        ({count})
      </Typography>
    </Stack>
  )
}

// ── FLOATING CART ────────────────────────────────────────────
export function FloatingCart({ cart, setCart, open, setOpen }) {
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const update = (id, delta) =>
    setCart((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0)
    )

  const handleDecrement = (e) => update(Number(e.currentTarget.dataset.id), -1)
  const handleIncrement = (e) => update(Number(e.currentTarget.dataset.id), 1)
  const handleRemove = (e) => {
    const id = Number(e.currentTarget.dataset.id)
    const item = cart.find((i) => i.id === id)
    if (item) update(id, -item.qty)
  }

  return (
    <>
      {/* FAB */}
      <Box sx={S.cartFabWrapper}>
        <Badge
          badgeContent={count}
          color="error"
          overlap="circular"
          sx={{ '& .MuiBadge-badge': { fontSize: '0.75rem', fontWeight: 700 } }}
        >
          <IconButton onClick={() => setOpen(true)} sx={S.cartFabBtn}>
            <ShoppingCart />
          </IconButton>
        </Badge>
      </Box>

      {/* Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: S.cartDrawerPaper }}
      >
        <Box sx={S.cartInner}>
          <Stack sx={S.cartHeader}>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              🛒 Your Cart
            </Typography>
            <IconButton onClick={() => setOpen(false)}>
              <Close />
            </IconButton>
          </Stack>
          <Divider />

          {cart.length === 0 ? (
            <Box sx={S.cartEmpty}>
              <ShoppingCart sx={S.cartEmptyIcon} />
              <Typography>Your cart is empty</Typography>
            </Box>
          ) : (
            <List sx={{ flex: 1, overflowY: 'auto' }}>
              {cart.map((item) => (
                <ListItem
                  key={item.id}
                  alignItems="flex-start"
                  sx={S.cartListItem}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item.image}
                      variant="rounded"
                      sx={{ width: 56, height: 56, mr: 1 }}
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                    }
                    secondary={
                      <Stack
                        sx={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 1,
                          mt: 0.5,
                        }}
                      >
                        <IconButton
                          size="small"
                          data-id={item.id}
                          onClick={handleDecrement}
                          sx={S.cartQtyBtn}
                        >
                          <Remove sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                          {item.qty}
                        </Typography>
                        <IconButton
                          size="small"
                          data-id={item.id}
                          onClick={handleIncrement}
                          sx={S.cartQtyBtn}
                        >
                          <Add sx={{ fontSize: 14 }} />
                        </IconButton>
                        <Typography variant="body2" sx={S.cartItemPrice}>
                          PKR {(item.price * item.qty).toLocaleString()}
                        </Typography>
                      </Stack>
                    }
                  />
                  <IconButton
                    size="small"
                    data-id={item.id}
                    onClick={handleRemove}
                    sx={S.cartRemoveBtn}
                  >
                    <Delete fontSize="small" />
                  </IconButton>
                </ListItem>
              ))}
            </List>
          )}

          {cart.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Divider sx={{ mb: 2 }} />
              <Stack sx={S.cartTotalRow}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6" sx={S.cartTotalValue}>
                  PKR {total.toLocaleString()}
                </Typography>
              </Stack>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                size="large"
                sx={{ py: 1.5 }}
              >
                Proceed to Checkout
              </Button>
            </Box>
          )}
        </Box>
      </Drawer>
    </>
  )
}

// ── ITEM CARD ────────────────────────────────────────────────
export function ItemCard({ item, addToCart, isService = false }) {
  const [wished, setWished] = useState(false)
  const [snack, setSnack] = useState(false)

  const handleAdd = () => {
    addToCart({
      id: item.id + (isService ? 1000 : 0),
      name: item.name,
      price: item.price,
      image: item.image,
      qty: 1,
    })
    setSnack(true)
  }

  return (
    <Card sx={S.itemCard}>
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="190"
          image={item.image}
          alt={item.name}
          sx={{ objectFit: 'cover' }}
        />

        {item.badge && (
          <Chip
            label={item.badge}
            color={badgeColor(item.badge)}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              fontWeight: 700,
              fontSize: '0.7rem',
            }}
          />
        )}

        <IconButton
          onClick={() => setWished((w) => !w)}
          size="small"
          sx={S.itemCardWishBtn}
        >
          <FavoriteBorder
            sx={{
              fontSize: 18,
              color: wished ? 'error.main' : 'text.secondary',
            }}
          />
        </IconButton>

        <Chip
          label={item.category}
          size="small"
          variant="outlined"
          sx={S.itemCardCategoryChip}
        />
      </Box>

      <CardContent sx={{ flex: 1, pb: 1 }}>
        <Typography variant="body1" sx={S.itemCardTitle}>
          {item.name}
        </Typography>

        <Typography variant="caption" sx={S.itemCardMeta}>
          {isService ? `by ${item.provider}` : `by ${item.seller}`}
          {isService && (
            <Box component="span" sx={S.itemCardMetaAccent}>
              {' '}
              · {item.unit}
            </Box>
          )}
        </Typography>

        <Stars value={item.rating} count={item.reviews} />

        <Stack
          sx={{ flexDirection: 'row', alignItems: 'baseline', gap: 1, mt: 1 }}
        >
          <Typography variant="h6" sx={S.itemCardPrice}>
            PKR {item.price.toLocaleString()}
          </Typography>
          {item.originalPrice && (
            <>
              <Typography variant="caption" sx={S.itemCardOriginalPrice}>
                {item.originalPrice.toLocaleString()}
              </Typography>
              <Chip
                label={`${Math.round((1 - item.price / item.originalPrice) * 100)}% off`}
                size="small"
                color="success"
                sx={{ fontSize: '0.65rem', height: 18 }}
              />
            </>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, pt: 0 }}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          startIcon={<Add />}
          onClick={handleAdd}
          size="small"
        >
          {isService ? 'Book Now' : 'Add to Cart'}
        </Button>
      </CardActions>

      <Snackbar
        open={snack}
        autoHideDuration={2000}
        onClose={() => setSnack(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ fontWeight: 600 }}
          onClose={() => setSnack(false)}
        >
          Added to cart!
        </Alert>
      </Snackbar>
    </Card>
  )
}

// ── COUPON BANNER ────────────────────────────────────────────
export function CouponBanner() {
  return (
    <Box
      sx={{
        mt: 4,
        mb: 2,
        p: 3,
        borderRadius: 3,
        bgcolor: 'primary.main',
        color: 'primary.contrastText',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Stack sx={{ flexDirection: 'row', alignItems: 'center', gap: 2, mb: 2 }}>
        <LocalOffer sx={{ color: 'secondary.main', fontSize: 32 }} />
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Active Coupons & Offers
        </Typography>
      </Stack>
      <Grid container spacing={2}>
        {couponsData.map((c) => (
          <Grid item xs={12} sm={6} md={3} key={c.code}>
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.12)',
                borderRadius: 2,
                p: 2,
                border: '1.5px dashed rgba(255,255,255,0.3)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  color: 'secondary.main',
                  letterSpacing: 1,
                }}
              >
                {c.code}
              </Typography>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9rem' }}>
                {c.discount}
              </Typography>
              <Typography variant="caption" sx={{ opacity: 0.75 }}>
                Min. order: PKR {c.minOrder.toLocaleString()}
              </Typography>
              <Typography
                variant="caption"
                sx={{ display: 'block', opacity: 0.65 }}
              >
                Valid till: {c.validUntil}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}

// ── FOOTER ───────────────────────────────────────────────────
export function Footer() {
  return (
    <Box component="footer" sx={S.footerRoot}>
      <Container maxWidth="xl">
        <Grid container spacing={5} mb={5}>
          {/* Brand */}
          <Grid item xs={12} md={3}>
            <Logo />
            <Typography sx={S.footerDesc}>
              Pakistan's leading marketplace for products and services. Buy,
              sell, and book everything in one trusted platform.
            </Typography>
            <Stack sx={{ flexDirection: 'row', gap: 1 }}>
              {SOCIAL_ICONS.map((Icon, i) => (
                <IconButton key={i} size="small" sx={S.footerSocialBtn}>
                  <Icon fontSize="small" />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {/* Link columns */}
          {FOOTER_COLUMNS.map((col) => (
            <Grid item xs={6} md={2} key={col.title}>
              <Typography variant="subtitle1" sx={S.footerColTitle}>
                {col.title}
              </Typography>
              <Stack sx={{ gap: 1.2 }}>
                {col.links.map((l) => (
                  <Typography key={l} variant="body2" sx={S.footerLink}>
                    {l}
                  </Typography>
                ))}
              </Stack>
            </Grid>
          ))}

          {/* Contact */}
          <Grid item xs={12} md={3}>
            <Typography variant="subtitle1" sx={S.footerColTitle}>
              Contact Us
            </Typography>
            {CONTACT_ITEMS.map(({ Icon, text }) => (
              <Stack key={text} sx={S.footerContactRow}>
                <Box sx={S.footerContactIcon}>
                  <Icon sx={{ fontSize: 16 }} />
                </Box>
                <Typography variant="body2" sx={S.footerContactText}>
                  {text}
                </Typography>
              </Stack>
            ))}
            <Box sx={{ mt: 2 }}>
              <Typography variant="caption" sx={S.footerNewsletterLabel}>
                Subscribe to our newsletter
              </Typography>
              <Stack sx={{ flexDirection: 'row', gap: 1 }}>
                <InputBase
                  placeholder="Your email"
                  sx={S.footerNewsletterInput}
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

        <Divider sx={{ mb: 3 }} />
        <Stack sx={S.footerBottomRow}>
          <Typography variant="caption" sx={S.footerCopyright}>
            © 2025 TaskMart. All rights reserved. Made with ❤️ in Pakistan
          </Typography>
          <Stack sx={{ flexDirection: 'row', gap: 2 }}>
            {LEGAL_LINKS.map((t) => (
              <Typography key={t} variant="caption" sx={S.footerLegalLink}>
                {t}
              </Typography>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

export function Logo({ size = 'h5' }) {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 2,
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Storefront sx={{ color: 'white', fontSize: 20 }} />
      </Box>

      <Typography variant={size} sx={{ fontWeight: 800 }}>
        Task
        <Box component="span" sx={{ color: 'secondary.main' }}>
          Mart
        </Box>
      </Typography>
    </Stack>
  )
}
