import { helpers, required } from '@vuelidate/validators'

const rules = {
  title_id: {
    required: helpers.withMessage('Title in arabic is required', required),
  },
}

export default rules
