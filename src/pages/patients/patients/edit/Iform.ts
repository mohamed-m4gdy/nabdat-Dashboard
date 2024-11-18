interface patientsForm {
  firstname: string
  lastname: string
  email: string
  mobile: number | null
  phone: number | null
  dob: string
  default_language_id: string
  gender: string
  city_id: number | null
  calling_code: number | null
  country_id: number | null
  active: boolean
  main_survey_answered: boolean

  // Objects
  country: {
    name: string
  }
  city: {
    name: string
  }
  default_language: {
    name: string
  }
  icon: string
}

export default patientsForm
