<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  name: {
    ar: '',
    en: '',
  },
  code: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('currencies', 'add', formSetup, validation)

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
          title: $t('Currencies'),
          link: '/settings/currencies/list'
        },
        {
          title: $t('Add')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add currency')"
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
            <VTextField
              v-model="item.code"
              :label="$t('Code')"
              :error-messages="getInputError('code')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
