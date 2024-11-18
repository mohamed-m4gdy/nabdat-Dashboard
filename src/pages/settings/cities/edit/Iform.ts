interface cityForm {
  name: {
    ar: string
    en: string
  }
  government_id: number | null
  lat: number | null
  lon: number | null
  status: boolean
  home_visit_allowed: boolean
  government: {
    name: string
  }
}

export default cityForm
