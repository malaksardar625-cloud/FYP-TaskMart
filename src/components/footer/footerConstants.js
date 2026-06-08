import { Facebook, Instagram, LinkedIn } from '@mui/icons-material'
import { LocationOn, Phone, Email } from '@mui/icons-material'
import XIcon from './Xicon'

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
