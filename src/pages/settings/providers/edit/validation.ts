// validation
import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

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
  code: {
    required: helpers.withMessage('Slug is required', required),
    minLength: helpers.withMessage('Slug must be bigger than or equal 3', minLength(1)),
    maxLength: helpers.withMessage('Slug must be smaller than or equal 255', maxLength(255)),
  },
  app_name: {
    required: helpers.withMessage('App name is required', required),
    minLength: helpers.withMessage('App name must be bigger than or equal 3', minLength(3)),
  },
  app_id: {
    required: helpers.withMessage('App id is required', required),
    minLength: helpers.withMessage('App id must be bigger than or equal 3', minLength(3)),
  },
}

export default rules
