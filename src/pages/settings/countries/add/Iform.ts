interface countryForm {
  name: {
    ar: string
    en: string
  }
  code: string
  calling_code: string
  status: boolean
  currency_id: number | null
  lat: number | null
  lon: number | null
}

export default countryForm
