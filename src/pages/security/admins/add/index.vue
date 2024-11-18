<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// Prepare item
const formSetup: Iform = {
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  phone: '',
  dob: '',
  default_language_id: null,
  gender: '',
  password: '',
  country_id: null,
  city_id: null,
  role_id: null,
  active: false,
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('admins', 'add', formSetup, validation)

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

// Generate random password
const generatePassword = () => item.value.password = `#${Math.random().toString(36).slice(2)}${Math.random().toString(36).toUpperCase().slice(2)}`

watch(() => item.value.country_id, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    item.value.city_id = null
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
          title: $t('Admins'),
          link: '/security/admins/list'
        },
        {
          title: $t('Add'),
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add admin')"
    >
      <Form
        :loading="loading"
        :errors="[]"
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
              v-model="item.password"
              :label="$t('password')"
              :error-messages="getInputError('password')"
              append-inner-icon="mdi-plus-circle"
              @click:append-inner="generatePassword"
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
              v-model="item.default_language_id"
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
              v-model="item.role_id"
              v-model:value="item.role_id"
              :label-string="$t('Role')"
              paths="roles"
              :error-messages="getInputError('role_id')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.country_id"
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
              v-model="item.city_id"
              v-model:value="item.city_id"
              :label-string="$t('City')"
              :disabled="!item.country_id"
              :fillter="{
                status: true,
                government_id: item.country_id,
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
          <VCol cols="6">
            <VCheckbox
              v-model="item.active"
              :label="$t('Active')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
