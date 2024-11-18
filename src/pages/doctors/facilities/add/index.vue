<script lang="ts" setup>
import type Ifrom from './Iform'
import validation from './validation'
// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Ifrom = {
  title: {
    ar: '',
    en: '',
  },
  status: true,
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Ifrom>('facilities', 'add', formSetup, validation)

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
          title: $t('Facilities'),
          link: '/doctors/facilities/list'
        },
        {
          title: $t('Add')
        }
      ]"
    />
    <VCard
      id="invoice-list"
      :title="$t('Add facilitie')"
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
