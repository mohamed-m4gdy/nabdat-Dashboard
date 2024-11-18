// validation
import { helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators'

const rules = {
  name: {
    ar: {
      required: helpers.withMessage('Arabic name is required', required),
      minLength: helpers.withMessage('Arabic name must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic name must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('English name is required', required),
      minLength: helpers.withMessage('English name must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English name must be smaller than or equal 121', maxLength(121)),
    },
  },
  country_id: {
    required: helpers.withMessage('Country is required', required),
  },
  code: {
    required: helpers.withMessage('Code is required', required),
  },
  limit: {
    numeric: helpers.withMessage('Limit must be number', numeric),
    required: helpers.withMessage('Limit is required', required),
  },
  user_limit: {
    numeric: helpers.withMessage('User Limit must be number', numeric),
    required: helpers.withMessage('User limit is required', required),
  },
  type: {
    required: helpers.withMessage('Type is required', required),
  },
  value: {
    numeric: helpers.withMessage('Value must be number', numeric),
    required: helpers.withMessage('Value is required', required),
  },
  start_date: {
    required: helpers.withMessage('Start Date limit is required', required),
  },
  expires_at: {
    required: helpers.withMessage('End Date limit is required', required),
  },
}

export default rules
