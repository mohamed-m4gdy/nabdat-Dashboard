import type { HorizontalNavItems } from '@layouts/types'
import settings from '../vertical/settings'
export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  ...settings
] as HorizontalNavItems
