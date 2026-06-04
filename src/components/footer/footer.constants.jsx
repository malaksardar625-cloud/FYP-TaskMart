import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'
import { LocationOn, Phone, Email } from '@mui/icons-material'

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

export const SOCIAL_ICONS = [Facebook, XIcon, Instagram, LinkedIn]

export const FOOTER_COLUMNS = [
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

export const CONTACT_ITEMS = [
  { Icon: LocationOn, text: 'Office 14, Blue Area, Islamabad, Pakistan' },
  { Icon: Phone, text: '+92 300 1234567' },
  { Icon: Email, text: 'support@taskmart.pk' },
]

export const LEGAL_LINKS = ['Terms', 'Privacy', 'Cookies']
