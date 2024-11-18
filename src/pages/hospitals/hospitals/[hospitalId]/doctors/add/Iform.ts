import workspaceItem from '@/components/form/inputs/workspacesItems/workspaceItem'

interface doctorForm {
  // doctor data
  firstname: string
  email: string
  password: string
  mobile: string
  dob: string
  default_language_id: number | null
  gender: string
  photo: string
  country_id: number | null
  government_id: number | null
  national_number: number | null
  calling_code: number | null
  city_id: number | null
  active: number

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
  
  bio: {
    ar: string
    en: string
  }

  // files
  attachments: {
    practice_cert: string[]
    national_id: string[]
  }
  

  // clinic data
  workspaces: workspaceItem[]
}

export default doctorForm
