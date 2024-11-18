import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  first_name: {
    ar: {
      required: helpers.withMessage('First name in arabic is required', required),
      minLength: helpers.withMessage('First name in arabic must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('First name in arabic must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('First name in english is required', required),
      minLength: helpers.withMessage('First name in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('First name in english must be smaller than or equal 121', maxLength(121)),
    },
  },
  last_name: {
    ar: {
      required: helpers.withMessage('Last name in arabic is required', required),
      minLength: helpers.withMessage('Last name in arabic must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Last name in arabic must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('Last name in english is required', required),
      minLength: helpers.withMessage('Last name in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Last name in english must be smaller than or equal 121', maxLength(121)),
    },
  },
  bio: {
    ar: {
      required: helpers.withMessage('Bio in arabic is required', required),
      minLength: helpers.withMessage('Bio in arabic must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Bio in arabic must be smaller than or equal 121', maxLength(999)),
    },
    en: {
      required: helpers.withMessage('Bio in english is required', required),
      minLength: helpers.withMessage('Bio in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Bio in english must be smaller than or equal 121', maxLength(999)),
    },
  },
}

export default rules
