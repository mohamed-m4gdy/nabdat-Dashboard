<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

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
}

const {t : $t} = useI18n()

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('assist/services', 'edit', formSetup, validation, parseInt(route.params.id as string))

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
          title: $t('Assistant Services settings'),
          link: '/settings/homevisitassistant/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit assistant Service setting')"
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
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
