<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  title: {
    ar: '',
    en: '',
  },
  icon: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('tag/doctor', 'add', formSetup, validation)

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
            title: $t('Doctor Tags'),
            link: '/doctors/tags/doctors/list'
          },
          {
            title: $t('Add')
          }
        ]"
      />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add doctor tag')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol cols="9">
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
          </VCol>
          <VCol cols="3">
            <FileInput
              v-model:value="item.icon"
              image-wrapper="imageWrapper"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
