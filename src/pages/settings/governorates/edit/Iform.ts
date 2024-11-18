interface governmentForm {
  name: {
    ar: string
    en: string
  }
  country_id: number | null
  lat: number | null
  lon: number | null
  status: boolean

  country: {
    name: string
  }
}

export default governmentForm
