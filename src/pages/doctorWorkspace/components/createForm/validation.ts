// validation
import { helpers, required, numeric } from '@vuelidate/validators'

const rules = {
  time_interval: {
    required: helpers.withMessage('Time interval is required', required)
  },
  doctor_id: {
    required: helpers.withMessage('Doctor is required', required)
  },
  cost: {
    required: helpers.withMessage('Cost is required', required),
    numeric: helpers.withMessage('Cost must be number', numeric),
  },
  follow_up_cost: {
    required: helpers.withMessage('Follow up cost is required', required),
    numeric: helpers.withMessage('Follow up cost must be number', numeric),
  },
  waiting_time: {
    required: helpers.withMessage('Waiting time is required', required),
    numeric: helpers.withMessage('Waiting time must be number', numeric),
  },
}

export default rules
