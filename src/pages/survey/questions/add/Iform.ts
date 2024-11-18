export interface questionOption {
  option: {
    ar: string
    en: string
  },
  status: boolean
}
interface questionsForm {
  question: {
    ar: string
    en: string
  }
  type: string
  survey_id: number
  status: boolean
  required: boolean
  options: questionOption[]
  
}

export default questionsForm
