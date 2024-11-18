interface discountForm {
  name: {
    ar: string
    en: string
  }
  country: {
    name: string
  }
  country_id: number | null
  status: boolean
  type: string
  code: string
  limit: number | null
  user_limit: number | null
  value: number | null
  start_date: string
  expires_at: string
}

export default discountForm
