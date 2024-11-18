export default [
    {
      title: 'Security',
      icon: { icon: 'mdi-lock' },
      children: [
        {
          title: 'Admins',
          icon: { icon: 'mdi-account-outline' },
          to: 'security-admins-list',
        },
        {
          title: 'Roles',
          icon: { icon: 'mdi-access-point-check' },
          to: 'security-roles-list',
        },
      ],
    },
  ]
  