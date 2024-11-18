import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  // doctor data
  note: {
    required: helpers.withMessage('Note is required', required),
    minLength: helpers.withMessage('Note must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Note must be smaller than or equal 121', maxLength(121)),
  },
}

export default rules
