// validation
import { helpers, required } from '@vuelidate/validators'

const rules = {
  tradename: { required: helpers.withMessage('Trade name is required', required) },
  activeingredient: { required: helpers.withMessage('Active ingredient  is required', required) },
  company: { required: helpers.withMessage('Company is required', required) },
  group: { required: helpers.withMessage('Group is required', required) },
  info: { required: helpers.withMessage('Info is required', required) },
  form: { required: helpers.withMessage('Form is required', required) },
  price: { required: helpers.withMessage('Price is required', required) },
}

export default rules
