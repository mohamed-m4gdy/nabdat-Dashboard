<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'

// get form helper
import formHock from '@/helpers/formHock'

// get route
const route = useRoute()

// prepare item
const formSetup: Iform = {
  content: {
    ar: '',
    en: '',
  },

  // Helpers
  title: {
    ar: '',
    en: '',
  },
  tags: ["{patient_name}", "{doctor_name}", "{hcp_name}"],
  type: '',
  code: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('notification_templates', 'edit', formSetup, validation, parseInt(route.params.id as string))

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

const appendTagToContent = (tag: string) => {
  if (tab.value === 'english') {
    item.value.content.en += ` ${tag}`
  } else if (tab.value === 'arabic') {
    item.value.content.ar += ` ${tag}`
  }
};
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
          title: $t('Notifications Templates'),
          link: '/settings/notificationstemplates/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit notifications')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol cols="12" class="my-3">
            <VRow>
              <VCol
                cols="2" 
                v-for="(tag, index) in item.tags" :key="index" @click="appendTagToContent(tag)"
                class="text-center"
              >
                <VChip
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ tag }}
                </VChip>
              </VCol>
            </VRow>
          </VCol>
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
                    v-model="item.content.en"
                    :label="$t('English content')"
                    :error-messages="getInputError('content.en')"
                  />
                </VWindowItem>
  
                <VWindowItem value="arabic">
                  <VTextField
                    v-model="item.content.ar"
                    :label="$t('Arabic content')"
                    :error-messages="getInputError('content.ar')"
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
