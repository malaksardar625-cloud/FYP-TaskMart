import { useState } from 'react'
import {
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Snackbar,
  Alert,
} from '@mui/material'
import { Add, FavoriteBorder } from '@mui/icons-material'
import { Stars } from '../stars'
import { badgeColor } from '../../shared/shared.utils'
import { WISH_SNACK_DURATION } from './itemCard.constants'
import * as S from '../styles'

export function ItemCard({ item, addToCart, isService = false }) {
  const [isWished, setIsWished] = useState(false)
  const [isSnackOpen, setIsSnackOpen] = useState(false)

  const discountPercent = item.originalPrice
    ? Math.round((1 - item.price / item.originalPrice) * 100)
    : null

  const handleAdd = () => {
    addToCart({
      id: item.id + (isService ? 1000 : 0),
      name: item.name,
      price: item.price,
      image: item.image,
      qty: 1,
    })
    setIsSnackOpen(true)
  }

  const handleToggleWish = () => setIsWished((prev) => !prev)
  const handleSnackClose = () => setIsSnackOpen(false)

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
          onClick={handleToggleWish}
          size="small"
          sx={S.itemCardWishBtn}
        >
          <FavoriteBorder
            sx={{
              fontSize: 18,
              color: isWished ? 'error.main' : 'text.secondary',
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
                label={`${discountPercent}% off`}
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
        open={isSnackOpen}
        autoHideDuration={WISH_SNACK_DURATION}
        onClose={handleSnackClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          sx={{ fontWeight: 600 }}
          onClose={handleSnackClose}
        >
          Added to cart!
        </Alert>
      </Snackbar>
    </Card>
  )
}
