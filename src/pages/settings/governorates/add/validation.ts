// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

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
  lat: {
    required: helpers.withMessage('Lat is required', required),
  },
  lon: {
    required: helpers.withMessage('Lon is required', required),
  },
}

export default rules
