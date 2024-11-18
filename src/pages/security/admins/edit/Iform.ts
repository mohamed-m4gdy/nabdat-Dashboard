interface adminForm {
  firstname: string
  lastname: string
  email: string
  mobile: string
  phone: string
  dob: string
  default_language_id: number | null
  gender: string
  country_id: number | null
  city_id: number | null
  role_id: number | null
  active: boolean

  default_language: {
    name: string
  }
  country: {
    name: string
  }
  city: {
    name: string
  }
  role: {
    name: string
  }
}

export default adminForm
