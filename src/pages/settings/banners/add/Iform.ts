export interface bannersName {
    ar: string
    en: string
}
interface bannersForm {
  name: bannersName[]
  image: {
    ar: string
    en: string
  }
  description: {
    ar: string
    en: string
  }
  url: string
}

export default bannersForm
