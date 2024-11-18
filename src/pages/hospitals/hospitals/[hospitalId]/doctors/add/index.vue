<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// prepare item
const formSetup: Iform = {
  // doctor data
  firstname: '',
  email: '',
  password: '',
  mobile: '',
  dob: '',
  photo: '',
  default_language_id: null,
  gender: '',
  city_id: null,
  country_id: null,
  government_id: null,
  calling_code: null,
  national_number: null,
  active: 1,

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
  bio: {
    ar: '',
    en: '',
  },

  attachments: {
    practice_cert: [],
    national_id: []
  },

  // clinic data
  workspaces: []
}

// get route
const route = useRoute()

const routeId = route.params.hospitalId

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>(`hospital/${routeId}/doctor`, 'add', formSetup, validation)

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
const generatePassword = () => item.value.password = `#${Math.random().toString(36).slice(2)}${Math.random().toString(36).toUpperCase().slice(2)}`

const tabBio = ref(null)

// Watching the country_id property
watch(() => item.value.country_id, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    item.value.government_id = null
    item.value.city_id = null
  }
})

// Watching the government_id property
watch(() => item.value.government_id, (newValue, oldValue) => {
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
          title: $t('Hospitals'),
            link: '/hospitals/hospitals/list'
        },
        {
          title: $t('Doctors'),
          link: `/hospitals/hospitals/${routeId}/doctors/list`
        },
        {
          title: $t('Add'),
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add doctor')"
    >
      <Form
        :loading="loading"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
      <VRow>
        <VCol cols="9">
          <VRow>
            <VCol cols="12">
              <h4>{{ $t('Account information') }}:</h4>
            </VCol>
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
                v-model="item.government_id"
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
                v-model="item.city_id"
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
            <VCol
              md="6"
              cols="12"
            >
              <VCheckbox
                v-model="item.active"
                :label="$t('Active')"
              />
            </VCol>
          </VRow>
        </VCol>
        <VCol cols="3" class="mt-14">
          <FileInput
            v-model:value="item.photo"
            image-wrapper="imageWrapper"
          />
        </VCol>
      </VRow>
        <!-- account informations -->
  
        <!-- Doctor profile -->
        <VRow>
          <VCol
            cols="12"
            class="border-top"
          >
            <h4 class="pt-3">
              {{ $t('Doctor profile') }}:
            </h4>
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
            md="6"
            cols="12"
          >
            <Search
              v-model="item.title_id"
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
              v-model:value="item.main_speciality"
              :label-string="$t('Specialization')"
              :fillter="{
                status: true,
                parent_id: -1,
              }"
              :disabled="item.workspaces.length > 0"
              paths="specialities"
              title-param="title"
              :error-messages="getInputError('main_speciality')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.sub_speciality"
              v-model:value="item.sub_speciality"
              :label-string="$t('Sub specialty')"
              :disabled="item.workspaces.length > 0 || !item.main_speciality"
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
  
        <!-- Clinic details -->
        
        <VRow>
          <VCol
            cols="12"
            class="border-top"
          >
            <h4 class="pt-3">
              {{ $t('Clinic details') }}:
            </h4>

            <workspacesItems :specialtyId="item.main_speciality" v-model:value="item.workspaces" />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
