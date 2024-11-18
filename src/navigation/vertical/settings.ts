import tags from './tags'

export default [
  {
    title: 'Settings',
    icon: { icon: 'mdi-settings-outline' },
    children: [
      {
        title: 'General',
        icon: { icon: 'mdi-settings-outline' },
        children: [
          {
            title: 'Site configrations',
            to: 'settings-settings',
          },
          {
            title: 'Notifications Templates',
            to: 'settings-notificationstemplates-list',
            icon: { icon: 'mdi-bell-outline' },
          },
          {
            title: 'Commisions & Taxes',
            to: 'settings-commisions-list',
          },
          {
            title: 'Countries',
            icon: { icon: 'mdi-earth' },
            to: 'settings-countries-list',
          },
          {

            title: 'Governorates',
            icon: { icon: 'mdi-coins' },
            to: 'settings-governorates-list',
          },
          {
            title: 'Cities',
            icon: { icon: 'mdi-city' },
            to: 'settings-cities-list',
          },
          {
            title: 'Languages',
            icon: { icon: 'mdi-translate' },
            to: 'settings-languages-list',
          },
          {
            title: 'Currencies',
            icon: { icon: 'mdi-currency-usd' },
            to: 'settings-currencies-list',
          },
          {
            title: 'Pages',
            icon: { icon: 'mdi-file-outline' },
            to: 'settings-page-list',
          },
          {
            title: 'Providers',
            icon: { icon: 'mdi-ray-start-vertex-end' },
            to: 'settings-providers-list',
          },
          {
            title: 'Payment gate',
            icon: { icon: 'mdi-credit-card-outline' },
            to: 'settings-paymentgate-list',
          },
          {
            title: 'Pay Online',
            icon: { icon: 'mdi-credit-card-settings-outline' },
            to: 'settings-paygateonline-list',
          },
          {
            title: 'Pay Offline',
            icon: { icon: 'mdi-cash-sync' },
            to: 'settings-paymentoffline-list',
          },
          {

            title: 'Splash screens',
            icon: { icon: 'mdi-monitor-screenshot' },
            to: 'settings-splash-list',
          },
          {
            title: 'Discount codes',
            icon: { icon: 'mdi-sale-outline' },
            to: 'settings-discountcodes-list',
          },
          {
            title: 'Banners',
            icon: { icon: 'mdi-page-layout-header' },
            to: 'settings-banners-list',
          }
        ]
      },
      {
        title: 'Medical',
        icon: { icon: 'mdi-doctor' },
        children: [
          {
            title: 'Calendar templates',
            icon: { icon: 'mdi-calendar' },
            to: 'settings-calendartemplates-list',
          },
          {
            title: 'Doctor Titles',
            icon: { icon: 'mdi-format-title' },
            to: 'doctors-doctortitles-list',
          },
          {
            title: 'Doctor Medical History Tags',
            icon: { icon: 'mdi-tags' },
            to: 'doctormedicalhistorytags-list',
          },
          {
            title: 'Medical History Tags',
            icon: { icon: 'mdi-tags' },
            to: 'medicalhistorytags-list',
          },
          {
            title: 'Home visits',
            icon: { icon: 'mdi-home' },
            to: 'settings-homevisitassistant-list',
          },
          ...tags,
          {
            title: 'Specialities',
            icon: { icon: 'mdi-ray-start-vertex-end' },
            to: 'doctors-specialities-list',
          },
          {
            title: 'Facilities',
            icon: { icon: 'mdi-ray-start-vertex-end' },
            to: 'doctors-facilities-list',
          },
          {
            title: 'Organization Categories',
            icon: { icon: 'mdi-briefcase-outline' },
            to: 'hospitals-workspacecategory-list',
          },
          {
            title: 'Patient Support Categories',
            icon: { icon: 'mdi-shape-plus-outline' },
            to: 'support-patientsupportcategory-list',
          },
          {
            title: 'Doctor Support Categories',
            icon: { icon: 'mdi-shape-plus-outline' },
            to: 'support-doctorsupportcategory-list',
          },
          {
            title: 'Medicines',
            icon: { icon: 'mdi-pill-multiple' },
            to: 'medicines-list',
          }
        ]
      }
    ],
  },
]
