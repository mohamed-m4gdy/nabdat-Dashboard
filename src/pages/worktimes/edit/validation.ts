// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  title: {
    required: helpers.withMessage('Title is required', required),
    minLength: helpers.withMessage('Title must be bigger than or equal 3', minLength(3)),
    maxLength: helpers.withMessage('Title must be smaller than or equal 121', maxLength(121)),
  },
  time_interval: {
    required: helpers.withMessage('Time interval is required', required)
  },
  type: {
    required: helpers.withMessage('Type is required', required)
  }
}

export default rules
