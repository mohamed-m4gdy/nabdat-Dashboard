import settings from './settings'
import clinics from './clinics'
import patients from './patients'
import medicines from './medicines'
import doctorReviews from './doctorReviews'
import homeVisits from './homeVisits'
import support from './support'
import promotions from './promotions'
import hospitals from './hospitals'
import survey from './survey'
import security from './security'
import approvals from './approvals'
import doctors from './doctors'
import settlements from './settlements'
import endofservice from './endofservice'
import bookings from './bookings'
import type { VerticalNavItems } from '@/@layouts/types'

export default [
  {
    title: 'Home',
    to: { name: 'index' },
    icon: { icon: 'mdi-home-outline' },
  },
  ...doctors,
  ...clinics,
  ...hospitals,
  ...endofservice,
  {
    title: 'Wizard',
    icon: { icon: 'mdi-list-box-outline' },
    children: [
      {
        title: 'Add doctor with clinic',
        icon: { icon: 'mdi-account-multiple-plus-outline' },
        to: 'forms-addDoctorWithWorkspace',
      }
    ],
  },
  {
    title: 'Calls',
    to: { name: 'calls-list' },
    icon: { icon: 'mdi-phone-hangup' },
  },
  {
    title: 'Calendars',
    to: { name: 'calender-list' },
    icon: { icon: 'mdi-calendar-blank' },
  },
  {
    title: 'Transactions',
    to: { name: 'transactions-list' },
    icon: { icon: 'ri-exchange-dollar-line' },
  },
  ...bookings,
  ...homeVisits,
  ...patients,
  ...medicines,
  ...doctorReviews,
  ...promotions,
  ...support,
  ...approvals,
  ...survey,
  ...security,
  ...settings,
  ...settlements,
] as VerticalNavItems
