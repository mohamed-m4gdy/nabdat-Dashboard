interface workspaceForm {
  branch_id: number
  title: {
    ar: string
    en: string
  }
  category_id: number | null
  accept_discount_code: boolean
  speciality_id: number | null
  facilities: number[]
  files: [{
    media_path: string
    type: string
    status: boolean
  }]
}

export default workspaceForm
