interface citiesForm {
  name: {
    ar: string
    en: string
  }
  government_id: number | null
  lat: number | null
  lon: number | null
  status: boolean
  home_visit_allowed: boolean
}

export default citiesForm
