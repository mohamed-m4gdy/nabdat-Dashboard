// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  description: {
    ar: {
      required: helpers.withMessage('Arabic description is required', required),
      minLength: helpers.withMessage('Arabic description must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic description must be smaller than or equal 992', maxLength(992)),
    },
    en: {
      required: helpers.withMessage('English description is required', required),
      minLength: helpers.withMessage('English description must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English description must be smaller than or equal 992', maxLength(992)),
    },
  },
  url: {
    minLength: helpers.withMessage('Url must be bigger than or equal 3', minLength(3)),
    maxLength: helpers.withMessage('Url must be smaller than or equal 992', maxLength(992)),
  },
}

export default rules
