export default [
  {
    title: 'Survey',
    icon: { icon: 'mdi-tooltip-question' },
    children: [
      {
        title: 'Questions',
        icon: { icon: 'mdi-chat-question' },
        to: 'survey-questions-list',
      },
      {
        title: 'After Login',
        icon: { icon: 'mdi-chat-question' },
        to: 'survey-afterlogin-list',
      },
      {
        title: 'Default',
        icon: { icon: 'mdi-chat-question' },
        to: 'survey-default-list',
      },
    ],
  },
]
