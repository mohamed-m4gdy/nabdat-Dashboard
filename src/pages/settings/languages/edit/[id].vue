<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'

// get form helper
import formHock from '@/helpers/formHock'

// get route
const route = useRoute()

// prepare item
const formSetup: Iform = {
  name: {
    ar: '',
    en: '',
  },
  code: '',
  direction: '',
  default: true,
  active: true,
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('languages', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

// Directions
const direction = ['rtl', 'ltr']

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
          title: $t('Languages'),
          link: '/settings/languages/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit language')"
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
              v-model="item.direction"
              :label="$t('direction')"
              :items="direction"
            />
          </VCol>
          <VCol cols="6">
            <VCheckbox
              v-model="item.active"
              :label="$t('Active')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VCheckbox
              v-model="item.default"
              :label="$t('default')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
