<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

// get route
const route = useRoute()

const {t : $t} = useI18n()

// prepare item
const formSetup: Iform = {
  // doctor data
  firstname: '',
  email: '',
  password: '',
  mobile: '',
  photo: '',
  dob: '',
  default_language_id: null,
  gender: '',
  city_id: null,
  government_id: null,
  country_id: null,
  national_number: null,
  calling_code: null,
  active: true,


  // doctor profile
  first_name: {
    ar: '',
    en: '',
  },
  last_name: {
    ar: '',
    en: '',
  },
  title_id: null,
  main_speciality: null,
  sub_speciality: null,
  ratio: {
    voice_call: {
      price_type: 'general',
      value: null,
    },
    video_call: {
      price_type: 'general',
      value: null,
    },
    visit: {
      price_type: 'general',
      value: null,
    },
  },
  bio: {
    ar: '',
    en: '',
  },
  attachments: {
    practice_cert: [],
    national_id: []
  },

  
 
  // helper objects  
  country: {
    name: '',
  },
  government: {
    name: ''
  },
  city: {
    name: '',
  },
  speciality: {
    title: '',
  },
  title: {
    title: '',
  },
  main_speciality_obj: {
    title: '',
  },
  sub_speciality_obj: {
    title: '',
  },
  default_language: {
    name: '',
  },
  icon: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('doctors', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

// generate random password
const generatePassword = () => item.value.password = '#' +  Math.random().toString(36).slice(2) + Math.random().toString(36).toUpperCase().slice(2)


// Set ratios to null if type is general 
watchEffect(() => {
  if (item.value.ratio.video_call.price_type === 'general') {
    item.value.ratio.video_call.value = null
  }
  if (item.value.ratio.visit.price_type === 'general') {
    item.value.ratio.visit.value = null
  }
  if (item.value.ratio.voice_call.price_type === 'general') {
    item.value.ratio.voice_call.value = null
  }
})

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

// Translation tabs
const tabBio = ref(null)
</script>

<template>
  <div>
    <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Doctors'),
          link: '/doctors/doctors/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    <VCard
      id="invoice-list"
      :title="$t('Edit doctor')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol cols="9">
            <VRow>
              <VCol
                md="12"
                cols="12"
              >
                <VTextField
                  v-model="item.firstname"
                  :label="$t('Name by identity')"
                  :error-messages="getInputError('firstname')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.email"
                  :label="$t('Email')"
                  :error-messages="getInputError('email')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.national_number"
                  :label="$t('National id')"
                  :error-messages="getInputError('national_number')"
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
              <VRow class="align-center">
                <VCol
                  class="pe-0"
                  cols="3"
                >
                <CallingNumber 
                  v-model="item.calling_code"
                  :icon="item.icon"
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
                  :errorMessages="getInputError('dob')"
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
                    government_id: item.government_id
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
              <VCol
                cols="12"
                class="border-top"
              >
                <h4 class="pt-3">
                  {{ $t('Doctor profile') }}:
                </h4>
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <Search
                  v-model="item.title.title"
                  v-model:value="item.title_id"
                  :label-string="$t('Doctor title')"
                  paths="doctor_titles"
                  title-param="title"
                  :error-messages="getInputError('title_id')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <Search
                  v-model="item.main_speciality_obj.title"
                  v-model:value="item.main_speciality"
                  :label-string="$t('Specialization')"
                  paths="specialities"
                  :fillter="{
                    status: true,
                    parent_id: -1,
                  }"
                  title-param="title"
                  :error-messages="getInputError('main_speciality')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <Search
                  v-if="item.sub_speciality_obj"
                  v-model="item.sub_speciality_obj.title"
                  v-model:value="item.sub_speciality"
                  :label-string="$t('Sub specialty')"
                  :disabled="!item.main_speciality"
                  :fillter="{
                    status: true,
                    parent_id: item.main_speciality,
                  }"
                  paths="specialities"
                  title-param="title"
                  :error-messages="getInputError('sub_speciality')"
                />
                <Search
                  v-if="!item.sub_speciality_obj"
                  v-model="item.sub_speciality"
                  v-model:value="item.sub_speciality"
                  :label-string="$t('Sub specialty')"
                  :disabled="!item.main_speciality"
                  :fillter="{
                    status: true,
                    parent_id: item.main_speciality,
                  }"
                  paths="specialities"
                  title-param="title"
                  :error-messages="getInputError('sub_speciality')"
                />
              </VCol>
              <VCol
                md="12"
                cols="12"
              >
                <VRow class="mx-1 rounded-lg border">
                  <VCol
                    cols="12"
                    class="ms-4"
                  >
                    {{ $t('Voice call ratio') }}:
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VRadioGroup
                      v-model="item.ratio.voice_call.price_type"
                      inline
                      class="mx-5"
                      :error-messages="getInputError('ratio.voice_call.price_type')"
                    >
                      <VRadio
                        :label="$t('General')"
                        value="general"
                        @click="item.ratio.voice_call.value = null"
                      />
                      <VRadio
                        :label="$t('Custom')"
                        value="custom"
                        @click="item.ratio.voice_call.value = 0"
                      />
                    </VRadioGroup>
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="item.ratio.voice_call.value"
                      type="number"
                      persistent-placeholder
                      :error-messages="getInputError('ratio.voice_call.value')"
                      :disabled="item.ratio.voice_call.price_type === 'general'"
                      :suffix="$t('%')"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol
                md="12"
                cols="12"
              >
                <VRow class="mx-1 rounded-lg border">
                  <VCol
                    cols="12"
                    class="ms-4"
                  >
                    {{ $t('Video call ratio') }}:
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VRadioGroup
                      v-model="item.ratio.video_call.price_type"
                      inline
                      class="mx-5"
                      :error-messages="getInputError('ratio.video_call.price_type')"
                    >
                      <VRadio
                        :label="$t('General')"
                        value="general"
                        @click="item.ratio.video_call.value = null"
                      />
                      <VRadio
                        :label="$t('Custom')"
                        value="custom"
                        @click="item.ratio.video_call.value = 0"
                      />
                    </VRadioGroup>
                  </VCol>
                  <VCol
                    md="6"
                    cols="12"
                  >
                    <VTextField
                      v-model="item.ratio.video_call.value"
                      type="number"
                      persistent-placeholder
                      :error-messages="getInputError('ratio.video_call.value')"
                      :disabled="item.ratio.video_call.price_type === 'general'"
                      :suffix="$t('%')"
                    />
                  </VCol>
                </VRow>
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
                      persistent-placeholder
                      :error-messages="getInputError('ratio.visit.value')"
                      :suffix="$t('%')"
                    />
                  </VCol>
                </VRow>
              </VCol>
              <VCol
                md="12"
                cols="12"
                class="border mb-5 mt-3"
              >
                <VTabs
                  v-model="tabBio"
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
                    v-model="tabBio"
                    class="pt-5"
                  >
                    <VWindowItem value="english">
                      <VRow>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.first_name.en"
                            :label="$t('First name english')"
                            :error-messages="getInputError('first_name.en')"
                          />
                        </VCol>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.last_name.en"
                            :label="$t('Last name english')"
                            :error-messages="getInputError('last_name.en')"
                          />
                        </VCol>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextarea
                            v-model="item.bio.en"
                            :label="$t('English bio')"
                            :error-messages="getInputError('bio.en')"
                          />
                        </VCol>
                      </VRow>
                    </VWindowItem>

                    <VWindowItem value="arabic">
                      <VRow>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.first_name.ar"
                            :label="$t('First name arabic')"
                            :error-messages="getInputError('first_name.ar')"
                          />
                        </VCol>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.last_name.ar"
                            :label="$t('Last name arabic')"
                            :error-messages="getInputError('last_name.ar')"
                          />
                        </VCol>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextarea
                            v-model="item.bio.ar"
                            :label="$t('Arabic bio')"
                            :error-messages="getInputError('bio.ar')"
                          />
                        </VCol>
                      </VRow>
                    </VWindowItem>
                  </VWindow>
                </VCardText>
              </VCol>
              <VCol
                cols="12"
                class="border-top"
              >
                <h4 class="pt-3">
                  {{ $t('Required attachments') }}:
                </h4>
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <multyFileInput
                  :label="$t('National id images')"
                  v-model:value="item.attachments.national_id"
                  :error-messages="getInputError('attachments.national_id')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <multyFileInput
                  :label="$t('Practice certificate')"
                  v-model:value="item.attachments.practice_cert"
                  :error-messages="getInputError('attachments.practice_cert')"
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
