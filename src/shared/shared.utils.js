import { BADGE_COLOR_MAP } from './shared.constants'

export const badgeColor = (badge) => BADGE_COLOR_MAP[badge] || 'default'
