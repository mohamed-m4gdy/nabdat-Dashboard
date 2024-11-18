import { helpers, maxLength, minLength, required } from '@vuelidate/validators'

type options = {
  option: {
    en: string;
    ar: string;
  }
}

const allOptionsHaveValue = (options: options[]) => options.every(option => !!option.option.en && !!option.option.ar)

const rules = {
  question: {
    ar: {
      required: helpers.withMessage('Question in arabic is required', required),
      minLength: helpers.withMessage('Question in arabic must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Question in arabic must be smaller than or equal 1000', maxLength(1000)),
    },
    en: {
      required: helpers.withMessage('Question in english is required', required),
      minLength: helpers.withMessage('Question in english must be bigger than or equal 2', minLength(2)),
      maxLength: helpers.withMessage('Question in english must be smaller than or equal 1000', maxLength(1000)),
    },
  },
  type: {
    required: helpers.withMessage('Type is required', required),
  },
  options: {
    required: helpers.withMessage('Arabic and english option is required', (value, parentVm) => {
      const type = parentVm.type;
      return type === 'multi' || type === 'multi-checkbox' ? allOptionsHaveValue(value as options[]) : true;
    }),
  },
}

export default rules
