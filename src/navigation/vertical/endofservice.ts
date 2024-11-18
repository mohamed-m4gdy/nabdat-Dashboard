export default [
  {
    title: 'End Of Service',
    icon: { icon: 'mdi-ray-end-arrow' },
    children: [
      {
        title: 'List',
        to: { name: 'endofservice-list' },
        icon: { icon: 'mdi-ray-end-arrow' },
      },
      {
        title: 'Doctors Released',
        to: { name: 'endofservicedoctors-list' },
        icon: { icon: 'mdi-minus-circle' },
      },
      {
        title: 'Hospitals Released',
        to: { name: 'endofservicehospital-list' },
        icon: { icon: 'mdi-minus-circle' },
      },
    ],
  },
]
