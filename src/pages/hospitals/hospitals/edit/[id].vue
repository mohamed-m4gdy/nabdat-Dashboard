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
  // doctor data
  firstname: '',
  lastname: '',
  email: '',
  mobile: '',
  phone: '',
  photo: '',
  dob: '',
  default_language_id: null,
  gender: '',
  country_id: null,
  government_id: null,
  city_id: null,
  category_id: null,
  calling_code: null,
  active: 1,

  // Hospital Details
  name: {
    ar: '',
    en: '',
  },
  descriptions: {
    ar: '',
    en: '',
  },
  branch_status: 1,
  hospital_logo: '',
  ratio: {
    visit: {
      price_type: 'general',
      value: null,
    },
  },
  
  // Ojbects
  default_language: {
    name: '',
  },
  country: {
    name: '',
  },
  city: {
    name: '',
  },
  government: {
    name: '',
  },
  category: {
    title: '',
  },
  icon: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('hospitals', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

// Translation tabs
const hospitalTabs = ref(null)

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

// Set ratios to null if type is general 
watchEffect(() => {
  if (item.value.ratio.visit.price_type === 'general') {
    item.value.ratio.visit.value = null
  }
})
</script>

<template>
  <div>
    <div>
      <div>
      <Breadcrubs
        :links="[
          {
            title: $t('Home'),
            link: '/'
          },
          {
            title: $t('Hospitals'),
            link: '/hospitals/hospitals/list'
          },
          {
            title: $t('Edit'),
          }
        ]"
      />
    </div>
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit hospital')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol cols="12">
            <h4>{{ $t('Account information') }}:</h4>
          </VCol>
          <VCol cols="9">
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
              <VCol cols="6">
                <VCheckbox
                  v-model="item.active"
                  :label="$t('Active')"
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="3">
            <FileInput
              :items="item.photo"
              v-model:value="item.photo"
              image-wrapper="imageWrapper"
            />
          </VCol>
        </VRow>
        <VRow>
          <VCol
            cols="12"
            class="border-top"
          >
            <h4 class="pt-5 mb-3">
              {{ $t('Hospital details') }}:
            </h4>
          </VCol>
          <VCol cols="9">
            <VRow>
              <VCol
                md="12"
                cols="12"
                class="border mb-5"
              >
                <VTabs
                  v-model="hospitalTabs"
                  align-tabs="center"
                >
                  <VTab value="english">
                    {{ $t('English Translation') }}
                  </VTab>
                  <VTab value="arabic">
                    {{ $t('Arabic Translation') }}
                  </VTab>
                </VTabs>
                <VCardText class="py-0 px-0">
                  <VWindow
                    v-model="hospitalTabs"
                    class="pt-5"
                  >
                    <VWindowItem value="english">
                      <VRow>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.name.en"
                            :label="$t('Hospital name english')"
                          />
                        </VCol>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextarea
                            v-model="item.descriptions.en"
                            :label="$t('Description english')"
                            :error-messages="getInputError('descriptions.en')"
                          />
                        </VCol>
                      </VRow>
                    </VWindowItem>
  
                    <VWindowItem value="arabic">
                      <VRow>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.name.ar"
                            :label="$t('Hospital name arabic')"
                          />
                        </VCol>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextarea
                            v-model="item.descriptions.ar"
                            :label="$t('Description arabic')"
                            :error-messages="getInputError('descriptions.ar')"
                          />
                        </VCol>
                      </VRow>
                    </VWindowItem>
                  </VWindow>
                </VCardText>
              </VCol>
              <VCol
                md="12"
                cols="12"
              >
                <Search
                  v-model="item.category.title"
                  v-model:value="item.category_id"
                  :label-string="$t('Workspace category')"
                  title-param="title"
                  paths="category/without-clinic"
                  :error-messages="getInputError('category_id')"
                />
              </VCol>
              <VCol
                md="12"
                cols="12"
                class="mt-5"
              >
                <VRow class="mx-1 rounded-lg border">
                  <VCol
                    cols="12"
                    class="ms-4"
                  >
                    {{ $t('Visit ratio') }}:
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VRadioGroup
                      v-model="item.ratio.visit.price_type"
                      inline
                      class="mx-5"
                      :error-messages="getInputError('ratio.visit.price_type')"
                    >
                      <VRadio
                        :label="$t('General')"
                        value="general"
                        @click="item.ratio.visit.value = null"
                      />
                      <VRadio
                        :label="$t('Custom')"
                        value="custom"
                        @click="item.ratio.visit.value = 0"
                      />
                    </VRadioGroup>
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="item.ratio.visit.value"
                      type="number"
                      :disabled="item.ratio.visit.price_type === 'general'"
                      :error-messages="getInputError('ratio.visit.value')"
                      persistent-placeholder
                      :suffix="$t('%')"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol cols="6">
                <VCheckbox
                  v-model="item.branch_status"
                  :label="$t('Active')"
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="3">
            <FileInput
              :items="item.hospital_logo"
              v-model:value="item.hospital_logo"
              image-wrapper="imageWrapper"
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
