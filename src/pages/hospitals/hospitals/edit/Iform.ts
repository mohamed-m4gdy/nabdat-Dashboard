interface doctorForm {

  // doctor data
  firstname: string
  lastname: string
  email: string
  photo: string
  mobile: string
  phone: string
  dob: string
  default_language_id: number | null
  gender: string
  country_id: number | null
  city_id: number | null
  government_id: number | null
  category_id: number | null
  calling_code: number | null
  active: number

  // Hospital Details
  name: {
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
  
  // Ojbects
  default_language: {
    name: string
  }
  country: {
    name: string
  }
  city: {
    name: string
  }
  government: {
    name: string
  }
  category: {
    title: string
  }
  icon: string
}

export default doctorForm
