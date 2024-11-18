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
  calling_code: number | null
  phone_calling_code: number | null
  phone: string
  mobile: string
  organization_id: number | null
  specialities: number[]
  lat: number | null,
  lon: number | null,

  // Objects
  country: {
    name: string
  }
  government: {
    name: string
  }
  city: {
    name: string
  }
  organization: {
    name: string
  }
  specialities_obj: {
    id: number
    title: string
  }[]
  files: [{
    file: string
    type: string
  }]
  icon: string
}

export default branchForm
