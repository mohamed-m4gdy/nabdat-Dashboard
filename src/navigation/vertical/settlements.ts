export default [
  {
    title: 'Settlements',
    icon: { icon: 'mdi-wallet' },
    children: [
      {
        title: 'Doctors',
        icon: { icon: 'mdi-doctor' },
        to: 'settlements-doctors-list',
      },
      {
        title: 'Hospitals',
        icon: { icon: 'mdi-hospital-building' },
        to: 'settlements-hospitals-list',
      },
    ],
  },
]
