interface adminForm {
  firstname: string
  lastname: string
  email: string
  mobile: string
  phone: string
  dob: string
  default_language_id: number | null
  gender: string
  password: string
  country_id: number | null
  city_id: number | null
  role_id: number | null
  active: boolean
}

export default adminForm
