<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'

const props = defineProps(['items'])

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  name: {
    ar: props.items.object.name.ar,
    en: props.items.object.name.en,
  },
  descriptions: {
    ar: props.items.object.descriptions.ar,
    en: props.items.object.descriptions.en,
  },
  photo: '',
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
  <div>
    <Form
      :loading="loading"
      :server-errors="serverErrors"
      :submit-text="$t('Update & approve')"
      @save-item="submitItem"
    >
      <VRow>
        <VCol cols="12">
          <h4>{{ $t('Edit Hospital information') }}:</h4>
        </VCol>
        <VCol cols="12">
          <FileInput
            v-model:value="item.photo"
            image-wrapper="imageWrapper"
          />
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
                          v-model="item.name.en"
                          :label="$t('Name english')"
                          :error-messages="getInputError('name.en')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextarea
                          v-model="item.descriptions.en"
                          :label="$t('English descriptions')"
                          :error-messages="getInputError('descriptions.en')"
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
                          v-model="item.name.ar"
                          :label="$t('Name arabic')"
                          :error-messages="getInputError('name.ar')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextarea
                          v-model="item.descriptions.ar"
                          :label="$t('Arabic descriptions')"
                          :error-messages="getInputError('descriptions.ar')"
                        />
                      </VCol>
                    </VRow>
                  </VWindowItem>
                </VWindow>
              </VCardText>
            </VCol>
          </VRow>
        </VCol>
        <VCol
          md="12"
          cols="12"
        >
          <VTextField
            v-model="item.descriptions.ar"
            :label="$t('Arabic descriptions')"
            :error-messages="getInputError('descriptions.ar')"
          />
        </VCol>
      </VRow>
    </Form>
  </div>
</template>
