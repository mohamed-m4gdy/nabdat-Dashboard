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
  doctor_id: {
    required: helpers.withMessage('Doctor is required', required),
  },
  facilities: {
    required: helpers.withMessage('facilities is required', required),
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
  speciality_id: {
    required: helpers.withMessage('Speciality is required', required),
  },
  mobile: {
    numeric: helpers.withMessage('Mobile must be number', numeric),
  },
  lat_lon: {
    required: helpers.withMessage('Lat & Lon is required', required),
  }
}

export default rules
