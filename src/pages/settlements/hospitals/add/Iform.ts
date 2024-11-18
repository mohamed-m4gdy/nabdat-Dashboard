interface workspaceForm {
  title: {
    ar: string
    en: string
  }
  address: {
    ar: string
    en: string
  }
  doctor_id: number | null
  country_id: number | null
  government_id: number | null
  city_id: number | null
  accept_discount_code: boolean
  facilities: number[]
  lat_lon: string
  mobile: string
  speciality_id: number | null
  files: [{
    media_path: string
    type: string
    status: boolean
  }]
}

export default workspaceForm
