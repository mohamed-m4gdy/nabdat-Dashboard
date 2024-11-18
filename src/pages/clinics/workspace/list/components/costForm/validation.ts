import { helpers, numeric, required } from '@vuelidate/validators'

const rules = {
  cost: {
    required: helpers.withMessage('Cost is required', required),
    numeric: helpers.withMessage('Cost must be number', numeric),
  },
  follow_up_cost: {
    required: helpers.withMessage('Follow up cost is required', required),
    numeric: helpers.withMessage('Follow up cost must be number', numeric),
  }
}

export default rules
