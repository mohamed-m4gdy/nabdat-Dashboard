interface workspaceForm {
  title: {
    ar: string
    en: string
  }
  accept_discount_code: boolean
  mobile: string
  phone: string
  calling_code: number | null
  speciality_id: number | null
  branch_id: number | null
  facilities: number[]
  files: [{
    id?: number | null
    media_path: string
    type: string
    status: boolean
  }]

  // Helper Object
  speciality: {
    title: string
  }
  icon: string
}

export default workspaceForm
