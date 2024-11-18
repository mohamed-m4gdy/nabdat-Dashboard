interface doctorForm {

  // doctor data
  firstname: string
  lastname: string
  email: string
  password: string
  photo: string
  mobile: string
  phone: string
  dob: string
  default_language_id: number | null
  gender: string
  country_id: number | null
  government_id: number | null
  category_id: number | null
  city_id: number | null
  calling_code: number | null
  active: number

  // Hospital Details
  name: {
    ar: string
    en: string
  }
  branch_name: {
    ar: string
    en: string
  }
  descriptions: {
    ar: string
    en: string
  }
  branch_status: number
  hospital_logo: string
  ratio: {
    visit: {
      price_type: string
      value: number | null
    }
  }
  
  // Branch Details
  specialities: number[]
  branch_country_id: number | null
  branch_government_id: number | null
  branch_city_id: number | null
  branch_address: {
    ar: string
    en: string
  }
  lat: number | null
  lon: number | null
  files: [{
    file: string
    type: string
    link: string
  }] | null
}

export default doctorForm
