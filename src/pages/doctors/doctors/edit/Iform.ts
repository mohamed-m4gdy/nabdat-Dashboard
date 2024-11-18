interface doctorForm {
  // doctor data
  firstname: string
  email: string
  photo: string
  password: string
  mobile: string
  dob: string
  default_language_id: number | null
  gender: string
  country_id: number | null
  government_id: number | null
  city_id: number | null
  calling_code: number | null
  national_number: number | null
  active: boolean

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


  // helper objects 
  country: {
    name: string
  }
  government: {
    name: string
  }
  city: {
    name: string
  }
  speciality: {
    title: string
  }
  title: {
    title: string
  }
  default_language: {
    name: string
  }
  main_speciality_obj: {
    title: string
  }
  sub_speciality_obj: {
    title: string
  }
  icon: string
}

export default doctorForm
