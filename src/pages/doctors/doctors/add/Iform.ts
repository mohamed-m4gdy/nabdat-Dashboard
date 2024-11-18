interface doctorForm {
  // doctor data
  firstname: string
  email: string
  password: string
  passowrd_confirmation: string
  photo: string
  mobile: string
  dob: string
  default_language_id: number | null
  gender: string
  country_id: number | null
  government_id: number | null
  city_id: number | null
  active: boolean
  calling_code: number | null
  national_number: number | null
  // doctor profile
  first_name: {
    ar: string
    en: string
  }
  last_name: {
    ar: string
    en: string
  }
  title_id: number | null
  main_speciality: number | null
  sub_speciality: number | null
  ratio: {
    voice_call: {
      price_type: string
      value: number | null
    }
    video_call: {
      price_type: string
      value: number | null
    }
    visit: {
      price_type: string
      value: number | null
    }
  }
  bio: {
    ar: string
    en: string
  }
  // files
  attachments: {
    practice_cert: string[]
    national_id: string[]
  }

}

export default doctorForm
