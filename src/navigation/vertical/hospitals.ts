export default [
  {
    title: 'Hospitals',
    icon: { icon: 'mdi-hospital-building' },
    children: [
      {
        title: 'Hospitals list',
        icon: { icon: 'mdi-hospital-building' },
        to: 'hospitals-hospitals-list',
      },
      {
        title: 'Hospital invitations',
        icon: { icon: 'mdi-account-multiple-plus-outline' },
        to: 'hospitals-hospitalinvitations-list',
      },
      {
        title: 'Workspaces',
        icon: { icon: 'mdi-briefcase' },
        to: 'hospitals-workspace-list',
      }, 
    ],
  },
]
