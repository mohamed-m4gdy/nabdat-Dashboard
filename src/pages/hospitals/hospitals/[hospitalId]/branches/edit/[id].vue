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
  name: {
    ar: '',
    en: '',
  },
  address: {
    ar: '',
    en: '',
  },
  country_id: null,
  government_id: null,
  city_id: null,
  organization_id: null,
  calling_code: null,
  phone_calling_code: null,
  phone: '',
  mobile:'',
  lat: null,
  lon: null,
  specialities: [],

  // Objects
  country: {
    name: '',
  },
  government: {
    name: '',
  },
  city: {
    name: '',
  },
  organization: {
    name: '',
  },
  specialities_obj: [],
  files: [{ file: '', type: 'image' }],
  icon: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('branches', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

// remove item
const removeIndex = (index: any) => {
  item.value.files.splice(index, 1)
}

const specialitiesValue = ref<any>([])

watch(() => item.value.specialities_obj, (value) => specialitiesValue.value = value.map(item => {return {key: item.id, value: item.title}}))

function addFileInput() {
  item.value.files.push({ file: '', type: 'image' })
}
const tabs = ref(null)

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
          title: $t('Hospitals'),
            link: '/hospitals/hospitals/list'
        },
        {
          title: $t('Branches'),
            link: `/hospitals/hospitals/${parseInt(route.params.hospitalId as string)}/branches/list`
        },
        {
          title: $t('Edit'),
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit branch')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol cols="12">
            <VRow>
              <VCol
                md="12"
                cols="12"
                class="border mb-5"
              >
                <VTabs
                  v-model="tabs"
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
                    v-model="tabs"
                    class="pt-5"
                  >
                    <VWindowItem value="english">
                      <VRow>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.name.en"
                            :label="$t('Name english')"
                            :error-messages="getInputError('name.en')"
                          />
                        </VCol>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.address.en"
                            :label="$t('Address english')"
                            :error-messages="getInputError('address.en')"
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
                            v-model="item.name.ar"
                            :label="$t('Name arabic')"
                            :error-messages="getInputError('name.ar')"
                          />
                        </VCol>
                        <VCol
                          md="6"
                          cols="12"
                        >
                          <VTextField
                            v-model="item.address.ar"
                            :label="$t('Address arabic')"
                            :error-messages="getInputError('address.ar')"
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
                <multySearch
                  v-model="specialitiesValue"
                  v-model:value="item.specialities"
                  :label-string="$t('Specialization')"
                  paths="specialities"
                  title-param="title"
                  :fillter="{
                    status: true,
                    parent_id: -1
                  }"
                  multi="multi"
                  :error-messages="getInputError('specialities')"
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
                />
                </VCol>
                <VCol
                  class="ps-0"
                  cols="9"
                >
                  <VTextField
                    v-model="item.mobile"
                    :label="$t('Mobile')"
                  />
                </VCol>
              </VRow>
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
                    v-model="item.phone_calling_code"
                    v-model:value="item.phone_calling_code"
                    :error-messages="getInputError('phone_calling_code')"
                  />
                  </VCol>
                  <VCol
                    class="ps-0"
                    cols="9"
                  >
                  <VTextField
                    v-model="item.phone"
                    :label="$t('Phone')"
                    :suffix="$t('Optional')"
                    persistent-placeholder
                  />
                </VCol>
                </VRow>
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.phone"
                  :label="$t('Phone')"
                  :suffix="$t('Optional')"
                  persistent-placeholder
                />
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
            </VRow>
            <VCol cols=12>
              <GoogleMap v-model:lat="item.lat" v-model:lon="item.lon" />
            </VCol>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
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
                    image-wrapper="imageWrapper"
                    :items="file.file"
                    :index="index"
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
