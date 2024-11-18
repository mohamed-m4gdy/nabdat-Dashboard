interface workspaceForm {
  title: {
    ar: string
    en: string
  }
  accept_discount_code: boolean
  organization_id: number | null
  branch_id: number | null
  calling_code: number | null
  facilities: number[]
  mobile: string
  phone: string
  speciality_id: number | null
  files: [{
    media_path: string
    type: string
    status: boolean
  }]
}

export default workspaceForm
