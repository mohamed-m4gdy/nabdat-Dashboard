interface settingsForm {
  title: {
    ar: string
    en: string
  }
  price: number | null
  units: string
  durations: string
  country_id: number | null
  country: {
    name: string
  }
}

export default settingsForm
