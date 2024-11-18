<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'

const props = defineProps(['items'])

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  first_name: {
    ar: props.items.object.first_name.ar,
    en: props.items.object.first_name.en,
  },
  last_name: {
    ar: props.items.object.last_name.ar,
    en: props.items.object.last_name.en,
  },
  bio: {
    ar: props.items.object.bio.ar,
    en: props.items.object.bio.en,
  },
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>(`approvals/edit/${props.items.id}/approve`, 'add', formSetup, validation)

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

const tabBio = ref(null)
</script>

<template>
  <div class="h-100">
    <Form
      :loading="loading"
      :server-errors="serverErrors"
      :submit-text="$t('Update & approve')"
      @save-item="submitItem"
      class="h-100"
    >
      <VRow>
        <VCol cols="12">
          <h4>{{ $t('Edit workspace information') }}:</h4>
        </VCol>
        <VCol cols="12">
          <VRow>
            <VCol
              md="12"
              cols="12"
              class="border mb-5 mt-3"
            >
              <VTabs
                v-model="tabBio"
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
                  v-model="tabBio"
                  class="pt-5"
                >
                  <VWindowItem value="english">
                    <VRow>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextField
                          v-model="item.first_name.en"
                          :label="$t('English first name')"
                          :error-messages="getInputError('first_name.en')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextField
                          v-model="item.last_name.en"
                          :label="$t('English last name')"
                          :error-messages="getInputError('last_name.en')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextarea
                          v-model="item.bio.en"
                          :label="$t('English bio')"
                          :error-messages="getInputError('bio.en')"
                        />
                      </VCol>
                    </VRow>
                  </VWindowItem>

                  <VWindowItem value="arabic">
                    <VRow>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextField
                          v-model="item.first_name.ar"
                          :label="$t('Arabic first name')"
                          :error-messages="getInputError('first_name.ar')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextField
                          v-model="item.last_name.ar"
                          :label="$t('Arabic last name')"
                          :error-messages="getInputError('last_name.ar')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextarea
                          v-model="item.bio.ar"
                          :label="$t('Arabic bio')"
                          :error-messages="getInputError('bio.ar')"
                        />
                      </VCol>
                    </VRow>
                  </VWindowItem>
                </VWindow>
              </VCardText>
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </Form>
  </div>
</template>
