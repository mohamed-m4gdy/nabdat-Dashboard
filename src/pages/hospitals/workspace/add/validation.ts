import { helpers, maxLength, minLength, numeric, required } from '@vuelidate/validators'

const rules = {
  title: {
    ar: {
      required: helpers.withMessage('Arabic title is required', required),
      minLength: helpers.withMessage('Arabic title must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic title must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('English title is required', required),
      minLength: helpers.withMessage('English title must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English title must be smaller than or equal 121', maxLength(121)),
    },
  },
  speciality_id: {
    required: helpers.withMessage('Speciality is required', required),
  },
  organization_id: {
    required: helpers.withMessage('Hospital is required', required),
  },
  branch_id: {
    required: helpers.withMessage('Branch is required', required),
  },
  calling_code: {
    required: helpers.withMessage('', required),
  },
  mobile: {
    numeric: helpers.withMessage('Mobile must be number', numeric),
    required: helpers.withMessage('Mobile is required', required),
  },
  phone: {
    numeric: helpers.withMessage('Phone must be number', numeric),
    required: helpers.withMessage('Phone is required', required),
  },
  facilities: {
    required: helpers.withMessage('facilities is required', required),
  },
}

export default rules
