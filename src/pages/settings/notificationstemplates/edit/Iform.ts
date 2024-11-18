interface notificationsForm {
  content: {
    ar: string
    en: string
  }

  // Helpers
  type: string
  code: string
  title: {
    ar: string
    en: string
  }
  tags: string[]
}

export default notificationsForm
