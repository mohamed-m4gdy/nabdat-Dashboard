// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  name: {
    ar: {
      required: helpers.withMessage('Arabic name is required', required),
      minLength: helpers.withMessage('Arabic name must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic name must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('English name is required', required),
      minLength: helpers.withMessage('English name must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English name must be smaller than or equal 121', maxLength(121)),
    },
  },
  code: {
    required: helpers.withMessage('Code is required', required),
    minLength: helpers.withMessage('Code must be bigger than or equal 1', minLength(1)),
    maxLength: helpers.withMessage('Code must not be greater than 3 characters.', maxLength(3)),
  },
}

export default rules
