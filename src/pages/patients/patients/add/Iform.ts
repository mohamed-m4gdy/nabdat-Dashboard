interface patientsForm {
  firstname: string
  lastname: string
  email: string
  mobile: number | null
  phone: number | null
  dob: string
  default_language_id: string
  gender: string
  password: string
  password_confirmation: string
  calling_code: number | null
  city_id: number | null
  government_id: number | null
  country_id: number | null
  active: boolean
}

export default patientsForm
