interface workspaceForm {
  title: {
    ar: string
    en: string
  }
  accept_discount_code: boolean
  speciality_id: number | null
  facilities: number[]
  speciality: {
    id: string
    title: string
  }
  files: [{
    id?: number
    media_path: string
    type: string
    status: boolean
  }]
}

export default workspaceForm
