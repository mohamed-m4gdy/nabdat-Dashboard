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
  content: {
    ar: '',
    en: '',
  },
  slug: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('pages', 'edit', formSetup, validation, parseInt(route.params.id as string))

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
          title: $t('Pages'),
          link: '/settings/page/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit Page')"
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
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VTextField
                      v-model="item.title.en"
                      :label="$t('English title')"
                      :error-messages="getInputError('title.en')"
                    />
                  </VCol>
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VTextarea
                      v-model="item.content.en"
                      :label="$t('Content')"
                      :error-messages="getInputError('content.en')"
                    />
                  </VCol>
                </VWindowItem>
  
                <VWindowItem value="arabic">
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VTextField
                      v-model="item.title.ar"
                      :label="$t('Arabic title')"
                      :error-messages="getInputError('title.ar')"
                    />
                  </VCol>
                  <VCol
                    md="12"
                    cols="12"
                  >
                    <VTextarea
                      v-model="item.content.ar"
                      :label="$t('Content')"
                      :error-messages="getInputError('content.ar')"
                    />
                  </VCol>
                </VWindowItem>
              </VWindow>
            </VCardText>
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <VTextField
              v-model="item.slug"
              :label="$t('Slug')"
              :error-messages="getInputError('slug')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
