export default [
  {
    title: 'Approvals',
    icon: { icon: 'mdi-check-decagram' },
    children: [
      {
        title: 'Doctor App',
        icon: { icon: 'mdi-application-settings-outline' },
        children: [
          {
            title: 'Registration',
            icon: { icon: 'mdi-check-decagram-outline' },
            to: 'approvals-approvalsdoctorapp-list',
          },
          {
            title: 'Bio & Name',
            icon: { icon: 'mdi-check-decagram' },
            to: 'approvals-approvalsbioandname-list',
          },
          {
            title: 'Titles',
            icon: { icon: 'mdi-check-decagram-outline' },
            to: 'approvals-titlesapprovals-list',
          },
          {
            title: 'Photo',
            icon: { icon: 'mdi-check-decagram-outline' },
            to: 'approvals-approvalsdoctorphoto-list',
          },
          {
            title: 'Clinics',
            icon: { icon: 'mdi-check-decagram' },
            to: 'approvals-approvalsworkspace-list',
          },
        ]
      },
      {
        title: 'Hospitals',
        icon: { icon: 'mdi-hospital-building' },
        children: [
          {
            title: 'Doctors',
            icon: { icon: 'mdi-check-decagram' },
            to: 'approvals-approvalshospitaldoctor-list',
          },
          {
            title: 'Clinics',
            icon: { icon: 'mdi-check-decagram' },
            to: 'approvals-approvalshospitalsworkspace-list',
          },
          {
            title: 'Branches',
            icon: { icon: 'mdi-check-decagram-outline' },
            to: 'approvals-approvalsbranch-list',
          },
          
          {
            title: 'Oranization Info',
            icon: { icon: 'mdi-check-decagram-outline' },
            to: 'approvals-approvalshospitalinfo-list',
          },
         
        
        ]
      },
     
    ],
  },
]
