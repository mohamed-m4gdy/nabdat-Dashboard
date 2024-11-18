export default [
  {
    title: 'Doctors',
    icon: { icon: 'mdi-doctor' },
    children: [
      {
        title: 'Doctors',
        to: { name: 'doctors-doctors-list' },
        icon: { icon: 'mdi-doctor' },
      },
      {
        title: 'Unassigned Doctors',
        to: { name: 'doctors-unassigneddoctors-list' },
        icon: { icon: 'mdi-plus-minus-box' },
      },
      {
        title: 'Doctors Released',
        to: { name: 'doctors-endofservicedoctors-list' },
        icon: { icon: 'mdi-minus-circle' },
      },
    ],
  },
]
