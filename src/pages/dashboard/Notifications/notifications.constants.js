// ─── Filter tabs ─────────────────────────────────────────────────────────────
export const NOTIFICATION_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'success', label: 'Success' },
  { key: 'error', label: 'Error' },
  { key: 'warning', label: 'Warning' },
  { key: 'info', label: 'Info' },
]

// Maps notification type → MUI palette key
export const TYPE_PALETTE_MAP = {
  success: 'success',
  error: 'error',
  warning: 'warning',
  info: 'info',
}

// ─── Mock data ────────────────────────────────────────────────────────────────
export const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'success',
    title: 'Profile approved',
    message:
      'Your seller profile has been reviewed and approved by our team. You can now start receiving orders.',
    detail:
      'Our review team verified your documents and identity. Your profile is now publicly visible to buyers. Make sure to complete your portfolio and set your availability to start receiving orders.',
    time: '2m ago',
    date: 'Today, 11:45 AM',
    read: false,
  },
  {
    id: 2,
    type: 'info',
    title: 'New order received',
    message:
      'You have a new order #1023 from Ahmed Khan for a web design service worth PKR 15,000.',
    detail:
      'Ahmed Khan has placed an order for your "Professional Website Design" service. The order is worth PKR 15,000 with a 7-day delivery deadline. Please review the requirements and accept or reject the order within 24 hours.',
    time: '1h ago',
    date: 'Today, 10:30 AM',
    read: false,
  },
  {
    id: 3,
    type: 'warning',
    title: 'Scheduled maintenance',
    message:
      'The platform will undergo maintenance on Sunday from 2–4 AM PKT. Services may be temporarily unavailable.',
    detail:
      'We will be performing critical infrastructure upgrades to improve platform performance and reliability. During this window, you will not be able to log in, accept orders, or send messages. Please plan your work accordingly.',
    time: '3h ago',
    date: 'Today, 8:15 AM',
    read: false,
  },
  {
    id: 4,
    type: 'success',
    title: 'Order completed',
    message:
      'Order #1019 has been marked as completed by the buyer. Funds will be released within 24 hours.',
    detail:
      'Congratulations! The buyer confirmed delivery for Order #1019. A total of PKR 12,000 will be credited to your TaskMart wallet within 24 hours after the escrow release period.',
    time: '1d ago',
    date: 'Yesterday, 4:00 PM',
    read: true,
  },
  {
    id: 5,
    type: 'error',
    title: 'Payment failed',
    message:
      'Your payout for order #1017 could not be processed. Please update your bank details.',
    detail:
      'The bank transfer for order #1017 was rejected by your financial institution. This may be due to incorrect account details or a temporary bank issue. Please go to Settings → Payment Methods to update your bank information and retry the payout.',
    time: '2d ago',
    date: 'Mon, Apr 17, 9:20 AM',
    read: true,
  },
  {
    id: 6,
    type: 'info',
    title: 'New feature: Task scheduling',
    message:
      'You can now schedule tasks directly from your dashboard. Set deadlines, reminders, and track progress.',
    detail:
      'We have launched a powerful new task scheduling tool in your dashboard. You can create tasks linked to orders, assign deadlines, set reminders, and view your workload on a calendar view. Head to Dashboard → My Tasks to get started.',
    time: '3d ago',
    date: 'Sun, Apr 16, 12:00 PM',
    read: true,
  },
  {
    id: 7,
    type: 'warning',
    title: 'Profile incomplete',
    message:
      'Your profile is only 60% complete. Add a portfolio and skills to improve visibility.',
    detail:
      'Profiles with complete information receive 3x more orders on average. You are missing: a portfolio section, skill tags, and a professional profile photo. Complete your profile from Settings → Profile to increase your chances of being discovered by buyers.',
    time: '4d ago',
    date: 'Sat, Apr 15, 3:45 PM',
    read: true,
  },
]
