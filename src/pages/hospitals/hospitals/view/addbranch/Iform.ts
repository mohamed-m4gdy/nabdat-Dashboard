interface branchForm {
  name: {
    ar: string
    en: string
  }
  address: {
    ar: string
    en: string
  }
  country_id: number | null
  government_id: number | null
  city_id: number | null
  organization_id: number | null
  calling_code: string | null
  phone_calling_code: string | null
  phone: string
  mobile: string
  specialities: []
  lat: number | null
  lon: number | null

  // Objects
  files: [{
    file: string
    type: string
  }]
}

export default branchForm
