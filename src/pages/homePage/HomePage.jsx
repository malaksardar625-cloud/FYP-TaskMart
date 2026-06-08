import { useContext } from 'react'
import { Box, GlobalStyles } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { useNavigate } from 'react-router-dom'

import {
  globalKeyframes,
  darkOverlay,
  sectionPad,
} from '../../styles/shared.Styles'
import { useProducts } from '../../hooks/useProducts'
import { useServices } from '../../hooks/useServices'
import { useResponsive } from '../../hooks/useResponsive'
import { CartContext } from '../../Context/cartContext'
import Navbar from '../../components/navbar/navbar'
import { Footer } from '../../components/footer/footer'

import HeroSection from '../../components/homePage/heroSection/heroSection'
import ProductsSection from '../../components/homePage/service&Products/ProductsSection'
import ServicesSection from '../../components/homePage/service&Products/ServicesSection'
import WhyTaskmart from '../../components/homePage/WhyTaskmart/WhyTaskmart'

export default function HomePage({ setPage }) {
  const theme = useTheme()
  const { isWatch, isMobile, isDark } = useResponsive()
  const overlay = darkOverlay(theme, isDark ? 0.88 : 0.78)
  const pad = sectionPad(isWatch)
  const { addToCart } = useContext(CartContext)
  const navigate = useNavigate()

  const { products, loading: productsLoading } = useProducts(isWatch ? 2 : 6)
  const { services, loading: servicesLoading } = useServices(isWatch ? 2 : 6)

  const colSize = isWatch ? 12 : 4

  return (
    <Box
      sx={{
        bgcolor: theme.palette.background.default,
        minHeight: '100vh',
        overflowX: 'hidden',
      }}
    >
      <GlobalStyles styles={globalKeyframes} />

      <Navbar setPage={setPage} />

      <HeroSection
        overlay={overlay}
        pad={pad}
        isWatch={isWatch}
        isMobile={isMobile}
        onJoin={() => navigate('/signup')}
      />

      <ProductsSection
        overlay={overlay}
        pad={pad}
        isWatch={isWatch}
        isMobile={isMobile}
        colSize={colSize}
        products={products}
        loading={productsLoading}
        onViewAll={() => navigate('/products')}
        addToCart={addToCart}
      />

      <ServicesSection
        overlay={overlay}
        pad={pad}
        isWatch={isWatch}
        isMobile={isMobile}
        colSize={colSize}
        services={services}
        loading={servicesLoading}
        onViewAll={() => navigate('/services')}
        addToCart={addToCart}
      />

      <WhyTaskmart
        pad={pad}
        isWatch={isWatch}
        isMobile={isMobile}
        isDark={isDark}
        colSize={colSize}
      />

      <Footer />
    </Box>
  )
}
