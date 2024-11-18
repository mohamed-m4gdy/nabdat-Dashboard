<script lang="ts" setup>
import type Ifrom from './Iform'
import validation from './validation'

// Vue tel input package
import { VueTelInput } from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// prepare item
const formSetup: Ifrom = {
  name: {
    ar: '',
    en: '',
  },
  code: '',
  lat: null,
  calling_code: '',
  lon: null,
  status: true,
  currency_id: null,
}

// Vue tel input options
const bindProps = {
  mode: 'international',
  disabledFetchingCountry: false,
  disabled: false,
  disabledFormatting: false,
  required: false,
  enabledCountryCode: true,
  enabledFlags: true,
  defaultCountry: 'EG',
  ignoredCountries: ['IL'],
  dropdownOptions: {
    disabledDialCode: false,
    showDialCodeInSelection: true,
    showDialCodeInList: true,
    showSearchBox: true,
    showFlags: true
  },
  inputOptions: {
    showDialCode: false,
    placeholder: 'Country code',
    readonly: true
  }
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Ifrom>('country', 'add', formSetup, validation)

// update calling code
const countrychanged = (country: any) => {
  item.value.calling_code = `+${country.dialCode}`
}

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

// translation tabs
const tab = ref(null)
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
          title: $t('Countries'),
          link: '/settings/countries/list'
        },
        {
          title: $t('Add')
        }
      ]"
    />
    <VCard
      id="invoice-list"
      :title="$t('Add country')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @saveItem="submitItem"
      >
        <VRow>
          <VCol
            md="12"
            cols="12"
            class="border mb-5"
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
                  <VTextField
                    v-model="item.name.en"
                    :label="$t('English name')"
                    :error-messages="getInputError('name.en')"
                  />
                </VWindowItem>
  
                <VWindowItem value="arabic">
                  <VTextField
                    v-model="item.name.ar"
                    :label="$t('Arabic name')"
                    :error-messages="getInputError('name.ar')"
                  />
                </VWindowItem>
              </VWindow>
            </VCardText>
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.code"
              :label="$t('Code')"
              :error-messages="getInputError('code')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.currency_id"
              v-model:value="item.currency_id"
              :label-string="$t('Add currency to country')"
              paths="currencies"
              :error-messages="getInputError('currency_id')"
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
          <VCol cols=12>
            <GoogleMap v-model:lat="item.lat" v-model:lon="item.lon" />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <vue-tel-input v-model="item.calling_code" v-bind="bindProps" @country-changed="countrychanged"></vue-tel-input>
          </VCol>
          <VCol cols="12">
            <VCheckbox
              v-model="item.status"
              :label="$t('Active')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
<style lang="scss">
html[dir=rtl] .vti__dropdown-list {
  right: 0;
}

html[dir=rtl]  .vti__dropdown-item {
  text-align: right;
  unicode-bidi: plaintext;
}
.vue-tel-input {
  border-radius: 3px;
  min-height: 50px;
}
.v-theme--dark .vue-tel-input {
  background: #3F3F3F;
  border: 1px solid #666;
  color: #fff;
  border-radius: 3px;
  min-height: 50px;
}

.v-theme--dark .vue-tel-input:focus-within {
  border-color: #1976D2FF;
}

.v-theme--dark .vti__dropdown {
  background-color: #414141;
}

.v-theme--dark .vti__dropdown:hover,
.v-theme--dark .vti__dropdown.open,
.v-theme--dark .vti__dropdown.disabled {
  background-color: #373737;
}

.v-theme--dark .vti__dropdown-list {
  background-color: #3F3F3F;
  border: 1px solid #4f4e4e;
}

.v-theme--dark .vti__dropdown-item {
  color: #fff;
}

.v-theme--dark .vti__dropdown-item.highlighted {
  background-color: #373737;
}

.v-theme--dark .vti__selection .vti__country-code {
  color: #fff;
}

.v-theme--dark .vti__input {
  background: #3F3F3F;
  color: #fff;
  border: none;
}

.v-theme--dark .vti__search_box {
  background: #3F3F3F;
  border: 1px solid #4f4e4e;
  color: #fff;
}

</style>
