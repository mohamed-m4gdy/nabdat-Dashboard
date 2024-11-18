interface workspaceForm {
  title: {
    ar: string
    en: string
  }
  doctor_id: number | null
  country_id: number | null
  government_id: number | null
  city_id: number | null
  accept_discount_code: boolean
  lat: number | null
  lon: number | null
  address: {
    en: string
    ar: string
  }
  speciality_id: number | null
  mobile: string
  facilities: number[]
  facilities_obj: {
    id: number | null
    title: string
  }[]
  calling_code: number | null
  files: [{
    id: number | null
    media_path: string
    type: string
    status: boolean
  }]
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
  doctor: {
    name: string
  }
  icon: string
}

export default workspaceForm
