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
  lastname: '',
  email: '',
  password: '',
  mobile: '',
  phone: '',
  photo: '',
  dob: '',
  default_language_id: null,
  gender: '',
  branch_country_id: null,
  branch_government_id: null,
  category_id: null,
  calling_code: null,
  country_id: null,
  government_id: null,
  city_id: null,
  active: 1,

  // Hospital Details
  name: {
    ar: '',
    en: '',
  },
  branch_name: {
    ar: 'الفرع الرئيسي',
    en: 'Main branch',
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

  // Branch Details
  specialities: [],
  branch_city_id: null,
  branch_address: {
    ar: '',
    en: '',
  },
  lat: null,
  lon: null,
  files:  null,
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('hospitals', 'add', formSetup, validation)

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

// To add new File inpput
const addFileInput = () => {
  if (item.value.files !== null) {
    item.value.files.push({ file: '', type: 'image', link: '' })
  } else {
    item.value.files = [{ file: '', type: 'image', link: '' }]
  }
}

// To remove new File inpput
const removeIndex = (index: any) => {
 if (item.value.files !== null) {
    item.value.files.splice(index, 1)
 }
}

// generate random password
const generatePassword = () => item.value.password = `#${Math.random().toString(36).slice(2)}${Math.random().toString(36).toUpperCase().slice(2)}`

// Translation tabs
const hospitalTabs = ref(null)
const branchTabs = ref(null)

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

watch(() => item.value.branch_country_id, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    item.value.branch_government_id = null
    item.value.branch_city_id = null
  }
})

watch(() => item.value.branch_government_id, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    item.value.branch_city_id = null
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
            title: $t('Add'),
          }
        ]"
      />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add hospital')"
    >
      <Form
        :loading="loading"
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
                            :error-messages="getInputError('name.en')"
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
                            :error-messages="getInputError('name.ar')"
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
                  v-model="item.category_id"
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
              v-model:value="item.hospital_logo"
              image-wrapper="imageWrapper"
            />
          </VCol>
          <VCol
            cols="12"
            class="border-top"
          >
            <h4 class="pt-5 mb-3">
              {{ $t('Main branch') }}:
            </h4>
          </VCol>
          <VCol cols="9">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <MultySearch
                  v-model:value="item.specialities"
                  :label-string="$t('Specialization')"
                  paths="specialities"
                  title-param="title"
                  :fillter="{
                    status: true,
                    parent_id: -1,
                  }"
                  multi="multi"
                  :error-messages="getInputError('specialities')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <Search
                  v-model="item.branch_country_id"
                  v-model:value="item.branch_country_id"
                  :label-string="$t('Country')"
                  :fillter="{
                    status: true,
                  }"
                  paths="country"
                  :error-messages="getInputError('branch_country_id')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <Search
                  v-model="item.branch_government_id"
                  v-model:value="item.branch_government_id"
                  :label-string="$t('Governorate')"
                  :disabled="!item.branch_country_id"
                  :fillter="{
                    status: true,
                    country_id: item.branch_country_id,
                  }"
                  paths="government"
                  :error-messages="getInputError('branch_government_id')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <Search
                  v-model="item.branch_city_id"
                  v-model:value="item.branch_city_id"
                  :label-string="$t('City')"
                  :disabled="!item.branch_government_id"
                  :fillter="{
                    status: true,
                    government_id: item.branch_government_id,
                  }"
                  paths="city"
                  :error-messages="getInputError('branch_city_id')"
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
                    v-model="item.phone"
                    :label="$t('Phone')"
                    :error-messages="getInputError('phone')"
                  />
                </VCol>
              </VRow>
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.lat"
                  :label="$t('Lat')"
                  :error-messages="getInputError('lat')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.lon"
                  :label="$t('Lon')"
                  :error-messages="getInputError('lon')"
                />
              </VCol>
              <VCol cols=12>
                <GoogleMap v-model:lat="item.lat" v-model:lon="item.lon" />
              </VCol>
              <VCol
                md="12"
                cols="12"
                class="border mb-5"
              >
                <VTabs
                  v-model="branchTabs"
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
                    v-model="branchTabs"
                    class="pt-5"
                  >
                    <VWindowItem value="english">
                      <VRow>
                        <VCol
                          md="12"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.branch_address.en"
                            :label="$t('Address english')"
                            :error-messages="getInputError('branch_address.en')"
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
                            v-model="item.branch_address.ar"
                            :label="$t('Address arabic')"
                            :error-messages="getInputError('branch_address.ar')"
                          />
                        </VCol>
                      </VRow>
                    </VWindowItem>
                  </VWindow>
                </VCardText>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <h4 class="mb-3">
              {{ $t('Images') }}:
            </h4>
            <Loader v-if="loading" />
            <VRow
              v-if="!loading"
              class="mt-5"
            >
              <VCol
                cols="6"
                md="3"
                class="plusContainer"
              >
                <div class="plusIcon">
                  <VIcon
                    icon="mdi-plus-box"
                    size="50"
                    @click="addFileInput"
                  />
                </div>
              </VCol>
              <VCol
                v-for="(file, index) in item.files"
                :key="index"
                cols="6"
                md="3"
              >
                <div class="relative">
                  <FileInput
                    v-model:value="file.file"
                    v-model:link="file.link"
                    image-wrapper="imageWrapper"
                    :index="index"
                    :items="file.link"
                    minus="true"
                    @remove-index="removeIndex"
                  />
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
<style lang="scss">
  .plusIcon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ffffff54;
    min-height: 190px;
  }
  .v-theme--light .plusIcon {
    border: 1px dashed rgb(5 2 2 / 33%);
  }
  .relative {
    position: relative;
  }
  .plusContainer {
    margin: 0;
    padding-top: 0;
    margin-bottom: 12px;
  }
</style>
