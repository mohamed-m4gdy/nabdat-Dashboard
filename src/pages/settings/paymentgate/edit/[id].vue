<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'

// get form helper
import formHock from '@/helpers/formHock'

// get route
const route = useRoute()

// prepare item
const formSetup: Iform = {
  title: {
    ar: '',
    en: '',
  },
  is_active: true,
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('paymentGate', 'edit', formSetup, validation, parseInt(route.params.id as string))

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
          title: $t('Payment gate'),
          link: '/settings/paymentgate/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit payment gate')"
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
          <VCol cols="6">
            <VCheckbox
              v-model="item.is_active"
              :label="$t('Active')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
