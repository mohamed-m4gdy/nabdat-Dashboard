import { email, helpers, maxLength, maxValue, minLength, minValue, numeric, required } from '@vuelidate/validators'
import { strongPassword } from '@/helpers/passwordValidation'
import {optionalValidation} from '@/helpers/optionalValidation'

const rules = {
  // doctor data
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
      maxLength: helpers.withMessage('Last name in arabic must be smaller than or equal 121', maxLength(15)),
    },
    en: {
      required: helpers.withMessage('Last name in english is required', required),
      minLength: helpers.withMessage('Last name in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Last name in english must be smaller than or equal 121', maxLength(15)),
    },
  },
  firstname: {
    required: helpers.withMessage('Name by identity is required', required),
    minLength: helpers.withMessage('Name by identity must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Name by identity must be smaller than or equal 121', maxLength(121)),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    emial: helpers.withMessage('Email is invalid', email),
  },
  password: {
    minLength: helpers.withMessage('Password must be bigger than or equal 8', minLength(8)),
    strong: helpers.withMessage('Password must contain capital and special characters', strongPassword)
  },
  mobile: {
    required: helpers.withMessage('Mobile is required', required),
    numeric: helpers.withMessage('Mobile must be number', numeric),
    minLength: helpers.withMessage('Mobile must be bigger than or equal 8', minLength(8)),
    maxLength: helpers.withMessage('Mobile must be smaller than or equal 14', maxLength(14)),
  },
  calling_code: {
    required: helpers.withMessage('', required),
  },
  national_number: {
    required: helpers.withMessage('National id is required', required),
    numeric: helpers.withMessage('National id must be number', numeric),
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
  government_id: {
    required: helpers.withMessage('Government is required', required),
  },
  city_id: {
    required: helpers.withMessage('City is required', required),
  },

  // doctor profile
  title_id: {
    required: helpers.withMessage('Title is required', required),
  },
  main_speciality: {
    required: helpers.withMessage('Speciality is required', required),
  },
  ratio: {
    voice_call: {
      price_type: {
        required: helpers.withMessage('Voice call type is required', required),
      },
      value: {
        optionalValidation: helpers.withMessage('Voice call ratio is required', optionalValidation),
        numeric: helpers.withMessage('Voice call ratio must be number', numeric),
        minValue: helpers.withMessage('Voice call ratio must be bigger than or equal 1', minValue(1)),
        maxValue: helpers.withMessage('Voice call ratio must be smaller than or equal 100', maxValue(100)),
      },
    },
    video_call: {
      price_type: {
        required: helpers.withMessage('Video call type is required', required),
      },
      value: {
        optionalValidation: helpers.withMessage('Video call ratio is required', optionalValidation),
        numeric: helpers.withMessage('Video call ratio must be number', numeric),
        minValue: helpers.withMessage('Video call ratio must be bigger than or equal 1', minValue(1)),
        maxValue: helpers.withMessage('Video call ratio must be smaller than or equal 100', maxValue(100)),
      },
    },
    visit: {
      price_type: {
        required: helpers.withMessage('Visit type is required', required),
      },
      value: {
        optionalValidation: helpers.withMessage('Visit ratio is required', optionalValidation),
        numeric: helpers.withMessage('Visit ratio must be number', numeric),
        minValue: helpers.withMessage('Visit ratio must be bigger than or equal 1', minValue(1)),
        maxValue: helpers.withMessage('Visit ratio must be smaller than or equal 100', maxValue(100)),
      },
    },
  },
  bio: {
    ar: {
      required: helpers.withMessage('Bio is required', required),
      minLength: helpers.withMessage('Bio must be bigger than or equal 3', minLength(3)),
    },
    en: {
      required: helpers.withMessage('Bio is required', required),
      minLength: helpers.withMessage('Bio must be bigger than or equal 3', minLength(3)),
    },
  },
}

export default rules
