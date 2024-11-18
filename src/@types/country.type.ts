export interface countryType {
  id: number
  name?: string
  nameAr?: string
  nameEn?: string
  code: string
  currency_id: string
  status: boolean
  icon: any
}

export const countryModel = {
  id: -1,
  name: '',
  code: '',
  currency_id: '',
  status: true,
  icon: '',
}
