// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  name: {
    required: helpers.withMessage('Name is required', required),
    minLength: helpers.withMessage('Name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Name must be smaller than or equal 121', maxLength(121)),
  },
}

export default rules
