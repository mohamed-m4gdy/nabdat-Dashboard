import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  title: {
    ar: {
      required: helpers.withMessage('Title is required', required),
      minLength: helpers.withMessage('Title must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Title must be bigger than or equal 3', maxLength(99)),
    },
    en: {
      required: helpers.withMessage('Title is required', required),
      minLength: helpers.withMessage('Title must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Title must be bigger than or equal 3', maxLength(99)),
    },
  }
}

export default rules
