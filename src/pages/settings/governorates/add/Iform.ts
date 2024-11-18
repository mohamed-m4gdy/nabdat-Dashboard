interface governmentForm {
  name: {
    ar: string
    en: string
  }
  country_id: number | null
  status: boolean
  lat: number | null
  lon: number | null
}

export default governmentForm
