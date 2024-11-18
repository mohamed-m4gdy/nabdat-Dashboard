<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// get route
const route = useRoute()

const formSetup: Iform = {
  name: {
    ar: '',
    en: '',
  },
  country_id: null,
  status: true,
  code: '',
  limit: null,
  user_limit: null,
  value: null,
  type: '',
  start_date: '',
  expires_at: '',
  country: {
    name: '',
  },
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('discount/codes', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

// types
const types = ['net', 'perc']

// Translation tabs
const tab = ref(null)
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
          title: $t('Discount codes'),
          link: '/settings/discountcodes/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit discount code')"
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
            md="6"
            cols="12"
          >
            <Search
              v-model="item.country.name"
              v-model:value="item.country_id"
              :label-string="$t('Country')"
              order-by="name"
              paths="country"
              :error-messages="getInputError('country_id')"
            />
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
            <VSelect
              v-model="item.type"
              :label="$t('Type')"
              :items="types"
              :error-messages="getInputError('type')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.value"
              :label="$t('Value')"
              persistent-placeholder
              :suffix="item.type === 'perc' ? $t('%') : ''"
              :error-messages="getInputError('value')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.limit"
              :label="$t('Limit')"
              :error-messages="getInputError('limit')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.user_limit"
              :label="$t('User limit')"
              :error-messages="getInputError('user_limit')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <DateInput
              v-model:value="item.start_date"
              :label="$t('Start date')"
              :error-messages="getInputError('start_date')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <DateInput
              v-model:value="item.expires_at"
              :label="$t('End date')"
              :error-messages="getInputError('expires_at')"
            />
          </VCol>
          <VCol cols="6">
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
