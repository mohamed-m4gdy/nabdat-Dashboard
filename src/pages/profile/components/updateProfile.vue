<script setup lang="ts">
import { email, helpers, maxLength, minLength, required } from '@vuelidate/validators'
import formHock from '@/helpers/formHock'
import FormModel from '@/components/form/index.vue'

interface Props {
  items: {
    firstname: string
    lastname: string
    email: string
    mobile: string
    phone: string
    dob: string
    default_language: {
      id: number
      name: string
    }
    gender: string
    country: {
      id: number
      name: string
    }
    city: {
      id: number
      name: string
    }
    government: {
      id: number
      name: string
    }
    active: boolean
    created_at: string
  }
}

const props = defineProps<Props>()

interface updateProfile {
  firstname: string
  lastname: string
  email: string
  mobile: string
  phone: string
  dob: string
  default_language_id: number | null
  gender: string
  country_id: number | null
  government_id: number | null
  city_id: number | null

  default_language: {
    name: string
  }
  country: {
      name: string
  }
  government: {
      name: string
  }
  city: {
    name: string
  }
}

// prepare item
const formSetup: updateProfile = {
  firstname: props.items.firstname,
  lastname: props.items.lastname,
  email: props.items.email,
  mobile: props.items.mobile,
  phone: props.items.phone,
  dob: props.items.dob,
  gender: props.items.gender,
  default_language_id: props.items.default_language.id,
  country_id: props.items.country.id,
  government_id: props.items.government.id,
  city_id: props.items.city.id,

  default_language: {
    name: props.items.default_language.name,
  },
  country: {
      name: props.items.country.name,
  },
  government: {
      name: props.items.government.name,
  },
  city: {
    name: props.items.city.name,
  },
}

// validation
const rules = {
  // doctor data
  firstname: {
    required: helpers.withMessage('First name is required', required),
    minLength: helpers.withMessage('First name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('First name must be smaller than or equal 15', maxLength(15)),
  },
  lastname: {
    required: helpers.withMessage('Last name is required', required),
    minLength: helpers.withMessage('Last name must be bigger than or equal 2', minLength(2)),
    maxLength: helpers.withMessage('Last name must be smaller than or equal 15', maxLength(15)),
  },
  email: {
    required: helpers.withMessage('Email is required', required),
    emial: helpers.withMessage('Email is invalid', email),
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
    required: helpers.withMessage('Governorate is required', required),
  },
  city_id: {
    required: helpers.withMessage('City is required', required),
  },
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<updateProfile>('admin/profile/update', 'add', formSetup, rules)

const router = useRouter()

const submitItem = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    router.go(-1)
  }
  else {
    // scroll to top screen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <VCard
    id="invoice-list"
    :title="$t('Update profile')"
  >
    <FormModel
      :loading="loading"
      :server-errors="serverErrors"
      @save-item="submitItem"
    >
      <VRow>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.firstname"
            :label="$t('First name')"
            :error-messages="getInputError('firstname')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.lastname"
            :label="$t('Last name')"
            :error-messages="getInputError('lastname')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.email"
            type="email"
            :label="$t('Email')"
            :error-messages="getInputError('email')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.phone"
            :label="$t('Phone')"
            :error-messages="getInputError('phone')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <VTextField
            v-model="item.mobile"
            :label="$t('Mobile')"
            :error-messages="getInputError('mobile')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <Search
            v-model="item.default_language.name"
            v-model:value="item.default_language_id"
            :label-string="$t('Default language')"
            paths="languages"
            :error-messages="getInputError('default_language_id')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <DateInput
            v-model:value="item.dob"
            :label="$t('Date of birth')"
            :error-messages="getInputError('dob')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <Search
            v-model="item.country.name"
            v-model:value="item.country_id"
            :label-string="$t('Country')"
            :fillter="{
              status: true,
            }"
            paths="country"
            :error-messages="getInputError('country_id')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <Search
            v-model="item.government.name"
            v-model:value="item.government_id"
            :label-string="$t('Governorate')"
            :disabled="!item.country_id"
            :fillter="{
              status: true,
              country_id: item.country_id,
            }"
            paths="government"
            :error-messages="getInputError('government_id')"
          />
        </VCol>
        <VCol
          md="6"
          cols="12"
        >
          <Search
            v-model="item.city.name"
            v-model:value="item.city_id"
            :label-string="$t('City')"
            :disabled="!item.government_id"
            :fillter="{
              status: true,
              government_id: item.government_id,
            }"
            paths="city"
            :error-messages="getInputError('city_id')"
          />
        </VCol>
        <VCol
            md="6"
            cols="12"
          >
            <div class="d-flex align-center gap-10">
              <h4>{{ $t('Gender') }}:</h4>
  
              <VRadioGroup
                v-model="item.gender"
                :error-messages="getInputError('gender')"
                inline
              >
                <VRadio
                  :label="$t('Male')"
                  value="male"
                />
                <VRadio
                  :label="$t('Female')"
                  value="female"
                />
              </VRadioGroup>
            </div>
          </VCol>
      </VRow>
    </FormModel>
  </VCard>
</template>
