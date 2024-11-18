interface countryForm {
  name: {
    ar: string
    en: string
  }
  code: string
  status: boolean
  calling_code: string
  currency_id: number | null
  lat: number | null
  lon: number | null
  currency: {
    name: string
  }
}

export default countryForm
