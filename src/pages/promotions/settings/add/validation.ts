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
  price: {
    required: helpers.withMessage('Price is required', required),
  },
  units: {
    required: helpers.withMessage('Units is required', required),
  },
  durations: {
    required: helpers.withMessage('Durations is required', required),
  },
  country_id: {
    required: helpers.withMessage('Country is required', required),
  },
}

export default rules
