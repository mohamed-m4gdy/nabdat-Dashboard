import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

const rules = {
  title: {
    ar: {
      required: helpers.withMessage('Title in arabic is required', required),
      minLength: helpers.withMessage('Title in arabic must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Title in arabic must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('Title in english is required', required),
      minLength: helpers.withMessage('Title in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Title in english must be smaller than or equal 121', maxLength(121)),
    },
  },
  address: {
    ar: {
      required: helpers.withMessage('Address in arabic is required', required),
      minLength: helpers.withMessage('Address in arabic must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Address in arabic must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('Address in english is required', required),
      minLength: helpers.withMessage('Address in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Address in english must be smaller than or equal 121', maxLength(121)),
    },
  },
  lat_lon: {
    required: helpers.withMessage('Lat & lon in is required', required),
    minLength: helpers.withMessage('Lat & lon in must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Lat & lon in must be smaller than or equal 121', maxLength(121)),
  }
}

export default rules
