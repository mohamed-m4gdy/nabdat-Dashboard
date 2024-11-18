<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const props = defineProps(['doctorId', 'specialityId'])
const emit = defineEmits(['onSuccess'])

const {t : $t} = useI18n()

// prepare item
const formSetup: Iform = {
  title: {
    ar: '',
    en: '',
  },
  address: {
    ar: '',
    en: '',
  },
  doctor_id: props.doctorId,
  country_id: null,
  government_id: null,
  city_id: null,
  facilities: [],
  mobile: '',
  calling_code: null,
  accept_discount_code: false,
  lat: null,
  lon: null,
  speciality_id: props.specialityId,
  status: false,
  files: [{ media_path: '', type: 'image', status: true }],
}

const { item, loading, getInputError, serverErrors, saveItem } = formHock<Iform>('workspace', 'add', formSetup, validation)

const submitItem = async () => {
  const response = await saveItem()
  if (response.status) 
    emit('onSuccess', response.data.data.doctor_workspace_id)
  else 
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// To add new File inpput
const addFileInput = () => item.value.files.push({ media_path: '', type: 'image', status: true })

// To remove new File inpput
const removeIndex = (index: any) => item.value.files.splice(index, 1)

const tab = ref(null)

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
      <VAlert class="mb-4" border="start" border-color="error" v-for="error in serverErrors" :key="error">
          {{ error }}
      </VAlert>
  </div>
  <VRow>
    <VCol cols="12">
      <h6 class="text-sm font-weight-medium">
        {{$t('Clinic details')}}
      </h6>
      <p class="text-xs mb-0">
        {{$t('Enter clinic details')}}
      </p>
    </VCol>
    <VCol
      md="12"
      cols="12"
      class="border mb-5 mt-3"
    >
      <VTabs
        v-model="tab"
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
          v-model="tab"
          class="pt-5"
        >
          <VWindowItem value="english">
            <VRow>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.title.en"
                  :label="$t('Name in English')"
                  :error-messages="getInputError('title.en')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.address.en"
                  :label="$t('Adress in English')"
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
                  v-model="item.title.ar"
                  :label="$t('Name in arabic')"
                  :error-messages="getInputError('title.ar')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.address.ar"
                  :label="$t('Adress in arabic')"
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
      <MultySearch
        v-model:value="item.facilities"
        :label-string="$t('Facilities')"
        paths="facilities"
        title-param="title"
        multi="multi"
        :error-messages="getInputError('facilities')"
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
    />
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
      md="6"
      cols="12"
    >
      <VCheckbox
        v-model="item.accept_discount_code"
        :label="$t('Accept discount code')"
      />
    </VCol>
    <VCol
      md="6"
      cols="12"
    >
      <VCheckbox
        v-model="item.status"
        :label="$t('Status')"
      />
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
              v-model:value="file.media_path"
              image-wrapper="imageWrapper"
              :index="index"
              minus="true"
              @remove-index="removeIndex"
            />
          </div>
        </VCol>
      </VRow>
    </VCol>
    <VCol cols="12">
      <div class="d-flex justify-end flex-wrap gap-4">
        <VBtn v-if="!loading" @click="submitItem">
          {{ $t('Next') }}
          <VIcon
            icon="mdi-arrow-right"
            end
            class="flip-in-rtl"
          />
        </VBtn>
        <VBtn v-else>
          {{ $t('Loading') }}
        </VBtn>
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
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
