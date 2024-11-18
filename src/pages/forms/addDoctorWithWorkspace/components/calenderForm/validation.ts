// validation
import { helpers, required } from '@vuelidate/validators'

const rules = {
  time_interval: {
    required: helpers.withMessage('Time interval is required', required)
  }
}

export default rules
