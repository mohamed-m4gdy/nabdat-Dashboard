// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  content: {
    ar: {
      required: helpers.withMessage('Arabic content is required', required),
      minLength: helpers.withMessage('Arabic content must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic content must be smaller than or equal 121', maxLength(999)),
    },
    en: {
      required: helpers.withMessage('English content is required', required),
      minLength: helpers.withMessage('English content must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English content must be smaller than or equal 121', maxLength(999)),
    },
  },
}

export default rules
