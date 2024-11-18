// validation
import { email, helpers, maxLength, minLength, required, numeric, maxValue, minValue } from '@vuelidate/validators'
import { strongPassword } from '@/helpers/passwordValidation'
import { optionalValidation } from '@/helpers/optionalValidation'

const rules = {
  // doctor data
  firstname: {
    required: helpers.withMessage('First name is required', required),
    minLength: helpers.withMessage('First name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('First name must be smaller than or equal 150', maxLength(150)),
  },
  lastname: {
    required: helpers.withMessage('Last name is required', required),
    minLength: helpers.withMessage('Last name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Last name must be smaller than or equal 150', maxLength(150)),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    emial: helpers.withMessage('Email is invalid', email),
  },
  password: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage('Password must be bigger than or equal 8', minLength(8)),
    strong: helpers.withMessage('Password must contain capital and special characters', strongPassword)
  },
  mobile: {
    required: helpers.withMessage('Mobile is required', required),
    minLength: helpers.withMessage('Mobile must be bigger than or equal 8', minLength(8)),
    maxLength: helpers.withMessage('Mobile must be smaller than or equal 14', maxLength(14)),
  },
  phone: {
    required: helpers.withMessage('Phone is required', required),
    minLength: helpers.withMessage('Phone must be bigger than or equal 8', minLength(8)),
    maxLength: helpers.withMessage('Phone must be smaller than or equal 14', maxLength(14)),
  },
  calling_code: {
    required: helpers.withMessage('', required),
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
  ratio: {
    visit: {
      price_type: {
        required: helpers.withMessage('Visit type is required', required),
      },
      value: {
        required: helpers.withMessage('Visit type is required', optionalValidation),
        numeric: helpers.withMessage('Visit ratio must be number', numeric),
        minValue: helpers.withMessage('Visit ratio must be bigger than or equal 1', minValue(1)),
        maxValue: helpers.withMessage('Visit ratio must be smaller than or equal 100', maxValue(100)),
      },
    },
  },
  // Hospital Details
  name: {
    ar: {
      required: helpers.withMessage('Arabic branch name is required', required),
      minLength: helpers.withMessage('Arabic branch name must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Arabic branch name must be smaller than or equal 255', maxLength(255)),
    },
    en: {
      required: helpers.withMessage('English branch name is required', required),
      minLength: helpers.withMessage('English branch name must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('English branch name must be smaller than or equal 255', maxLength(255)),
    },
  },
  descriptions: {
    ar: {
      required: helpers.withMessage('Arabic description is required', required),
      minLength: helpers.withMessage('Arabic description must be bigger than or equal 2', minLength(2)),
    },
    en: {
      required: helpers.withMessage('English description is required', required),
      minLength: helpers.withMessage('English description must be bigger than or equal 2', minLength(2)),
    },
  },

  // Branch Details
  category_id: {
    required: helpers.withMessage('Workspace category is required', required),
  },
  specialities: {
    required: helpers.withMessage('Speciality is required', required),
  },
  branch_country_id: {
    required: helpers.withMessage('Country is required', required),
  },
  branch_government_id: {
    required: helpers.withMessage('Government is required', required),
  },
  branch_city_id: {
    required: helpers.withMessage('City is required', required),
  },
  branch_address: {
    ar: {
      required: helpers.withMessage('Arabic adress is required', required),
      minLength: helpers.withMessage('Arabic adress must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Arabic adress must be smaller than or equal 255', maxLength(255)),
    },
    en: {
      required: helpers.withMessage('English adress is required', required),
      minLength: helpers.withMessage('English adress must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('English adress must be smaller than or equal 255', maxLength(255)),
    },
  },
  lat: {
    required: helpers.withMessage('Lat is required', required),
  },
  lon: {
    required: helpers.withMessage('Lon is required', required),
  },
}

export default rules
