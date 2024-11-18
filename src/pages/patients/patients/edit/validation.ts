// validation
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  firstname: {
    required: helpers.withMessage('First name is required', required),
    minLength: helpers.withMessage('First name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('First name must be smaller than or equal 121', maxLength(121)),
  },
  lastname: {
    required: helpers.withMessage('Last name is required', required),
    minLength: helpers.withMessage('Last name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Last name must be smaller than or equal 121', maxLength(121)),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    emial: helpers.withMessage('Email is invalid', email),
  },
  mobile: {
    required: helpers.withMessage('Mobile is required', required),
    minLength: helpers.withMessage('Mobile must be bigger than or equal 8', minLength(8)),
    maxLength: helpers.withMessage('Mobile must be smaller than or equal 14', maxLength(14)),
  },
  calling_code: {
    required: helpers.withMessage('', required),
  },
  phone: {
    minLength: helpers.withMessage('Phone must be bigger than or equal 8', minLength(8)),
    maxLength: helpers.withMessage('Phone must be smaller than or equal 14', maxLength(14)),
  },
  dob: {
    required: helpers.withMessage('Date of birth is required', required),
  },
  default_language_id: {
    required: helpers.withMessage('Default language is required', required),
  },
  gender: {
    required: helpers.withMessage('Gender is required', required),
  },
  country_id: {
    required: helpers.withMessage('Country is required', required),
  },
}

export default rules
