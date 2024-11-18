interface payOfflineForm {
  title: {
    ar: string
    en: string
  }
  details: {
    ar: string
    en: string
  }
  refernce_number: string
  logo: string
  fees: number | null
  payment_id: number | null
  is_active: boolean

  // Helper
  paymentGate: {
    title: string
  }
}

export default payOfflineForm
