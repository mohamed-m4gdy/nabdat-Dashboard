
import { helpers, minLength, required } from '@vuelidate/validators'

const rules = {
  name: {
    ar: {
      required: helpers.withMessage('Name in arabic is required', required),
      minLength: helpers.withMessage('Name in arabic must be bigger than or equal 2', minLength(2)),
    },
    en: {
      required: helpers.withMessage('Name in english is required', required),
      minLength: helpers.withMessage('Name in english must be bigger than or equal 2', minLength(2)),
    },
  },
  address: {
    ar: {
      required: helpers.withMessage('Address in arabic is required', required),
      minLength: helpers.withMessage('Address in arabic must be bigger than or equal 2', minLength(2)),
    },
    en: {
      required: helpers.withMessage('Address in english is required', required),
      minLength: helpers.withMessage('Address in english must be bigger than or equal 2', minLength(2)),
    },
  },
  country_id: {
    required: helpers.withMessage('Country is required', required),
  },
  government_id: {
    required: helpers.withMessage('Government is required', required),
  },
  city_id: {
    required: helpers.withMessage('City is required', required),
  },
  specialities: {
    minLength: helpers.withMessage('Specialities is required', minLength(1)),
  },
  lat: {
    required: helpers.withMessage('Lat is required', required),
  },
  lon: {
    required: helpers.withMessage('Lon is required', required),
  },
}

export default rules
