<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// get route
const route = useRoute()

// prepare item
const formSetup: Iform = {
  name: {
    ar: '',
    en: '',
  },
  country_id: null,
  lat: null,
  lon: null,
  status: true,

  country: {
    name: '',
  },
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('government', 'edit', formSetup, validation, parseInt(route.params.id as string))

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
    <div>
      <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Governorates'),
          link: '/settings/governorates/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit governorate')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
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
            md="12"
            cols="12"
          >
            <Search
              v-model="item.country.name"
              v-model:value="item.country_id"
              :label-string="$t('Add country to this governorate')"
              paths="country"
              :error-messages="getInputError('country_id')"
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
