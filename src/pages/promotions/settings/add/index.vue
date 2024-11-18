<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// Prepare item
const formSetup: Iform = {
  title: {
    ar: '',
    en: '',
  },
  price: null,
  units: '',
  durations: '',
  country_id: null,
  country: {
    name: '',
  },
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('promotion-settings', 'add', formSetup, validation)

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

// Duration types
const items = ['day', 'week', 'month']

// Translation tabs
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
          title: $t('Promotions settings'),
          link: '/promotions/settings/list'
        },
        {
          title: $t('Add'),
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add promotions settings')"
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
                  <VTextField
                    v-model="item.title.en"
                    :label="$t('English title')"
                    :error-messages="getInputError('title.en')"
                  />
                </VWindowItem>
  
                <VWindowItem value="arabic">
                  <VTextField
                    v-model="item.title.ar"
                    :label="$t('Arabic title')"
                    :error-messages="getInputError('title.ar')"
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
              v-model="item.price"
              :label="$t('Price')"
              :error-messages="getInputError('price')"
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
              paths="country"
              :error-messages="getInputError('country_id')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.units"
              :label="$t('Units')"
              :error-messages="getInputError('units')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VSelect
              v-model="item.durations"
              :items="items"
              :label="$t('Durations')"
              :error-messages="getInputError('durations')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
