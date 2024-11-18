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
  address: {
    ar: {
      required: helpers.withMessage('Arabic address is required', required),
      minLength: helpers.withMessage('Arabic address must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('Arabic address must be smaller than or equal 121', maxLength(121)),
    },
    en: {
      required: helpers.withMessage('English address is required', required),
      minLength: helpers.withMessage('English address must be bigger than or equal 3', minLength(3)),
      maxLength: helpers.withMessage('English address must be smaller than or equal 121', maxLength(121)),
    },
  },
  country_id: {
    required: helpers.withMessage('Country is required', required),
  },
  facilities: {
    required: helpers.withMessage('facilities is required', required),
  },
  government_id: {
    required: helpers.withMessage('Government is required', required),
  },
  city_id: {
    required: helpers.withMessage('City is required', required),
  },
  speciality_id: {
    required: helpers.withMessage('Speciality is required', required),
  },
  mobile: {
    numeric: helpers.withMessage('Mobile must be number', numeric),
    minLength: helpers.withMessage('Mobile must be bigger than or equal 8', minLength(8)),
    maxLength: helpers.withMessage('Mobile must be smaller than or equal 14', maxLength(14)),
  },
  lat_lon: {
    required: helpers.withMessage('Lat & Lon is required', required),
  }
}

export default rules
