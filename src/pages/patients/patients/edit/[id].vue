<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// get route
const route = useRoute()

// prepare item
const formSetup: Iform = {
  firstname: '',
  lastname: '',
  email: '',
  mobile: null,
  phone: null,
  calling_code: null,
  dob: '',
  default_language_id: '',
  gender: '',
  city_id: null,
  country_id: null,
  active: false,
  main_survey_answered: false,

  // Objects
  country: {
    name: '',
  },
  city: {
    name: '',
  },
  default_language: {
    name: '',
  },
  icon: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('patients', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

// Watching the country_id property
watch(() => item.value.country_id, (newValue, oldValue) => {
  if (oldValue !== null && newValue !== oldValue) {
    item.value.government_id = null
    item.value.government.name = ''
    item.value.city_id = null
    item.value.city.name = ''
  }
})

// Watching the government_id property
watch(() => item.value.government_id, (newValue, oldValue) => {
  if (oldValue !== null && newValue !== oldValue) {
    item.value.city_id = null
    item.value.city.name = ''
  }
})
</script>

<template>
  <div>
    <div>
      <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Patients'),
          link: '/patients/patients/list'
        },
        {
          title: $t('Edit'),
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit patient')"
    >
      <Form
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
              :suffix="$t('Optional')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
          <VRow class="align-center">
              <VCol
                class="pe-0"
                cols="3"
              >
              <CallingNumber 
                :icon="item.icon"
                v-model="item.calling_code"
                v-model:value="item.calling_code"
                :error-messages="getInputError('calling_code')"
              />
              </VCol>
              <VCol
                class="ps-0"
                cols="9"
              >
                <VTextField
                  v-model="item.mobile"
                  :label="$t('Mobile')"
                  :error-messages="getInputError('mobile')"
                />
              </VCol>
            </VRow>
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
              v-if="item.city"
              v-model="item.city.name"
              v-model:value="item.city_id"
              :label-string="$t('City')"
              :disabled="!item.country_id"
              :fillter="{
                status: true,
                country_id: item.country_id,
              }"
              paths="city"
              :error-messages="getInputError('city_id')"
            />
            <Search
              v-else
              v-model="item.city_id"
              v-model:value="item.city_id"
              :label-string="$t('City')"
              :disabled="!item.country_id"
              :fillter="{
                status: true,
                country_id: item.country_id,
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
          <VCol cols="3">
            <VCheckbox
              v-model="item.active"
              :label="$t('Active')"
            />
          </VCol>
          <VCol cols="3">
            <VCheckbox
              v-model="item.main_survey_answered"
              :label="$t('Main survey')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>

<style lang="scss">
  .border-top {
    h4 {
      border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
    }
  }
</style>
