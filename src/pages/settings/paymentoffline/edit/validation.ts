// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  title: {
    ar: {
      required: helpers.withMessage('Arabic title is required', required),
      minLength: helpers.withMessage('Arabic title must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic title must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('English title is required', required),
      minLength: helpers.withMessage('English title must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English title must be smaller than or equal 121', maxLength(121)),
    },
  },
  details: {
    ar: {
      required: helpers.withMessage('Arabic details is required', required),
      minLength: helpers.withMessage('Arabic details must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic details must be smaller than or equal 999', maxLength(999)),
    },
    en: {
      required: helpers.withMessage('English details is required', required),
      minLength: helpers.withMessage('English details must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English details must be smaller than or equal 999', maxLength(999)),
    },
  },
  refernce_number: {
    required: helpers.withMessage('Refernce number is required', required),
  },
  fees: {
    required: helpers.withMessage('Fees is required', required),
  },
  payment_id: {
    required: helpers.withMessage('Payment is required', required),
  },
}

export default rules
