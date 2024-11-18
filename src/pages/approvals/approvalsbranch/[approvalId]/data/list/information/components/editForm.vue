<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'

const props = defineProps(['items'])

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// prepare item
const formSetup: Iform = {
  name: {
    ar: props.items.object.name.ar,
    en: props.items.object.name.en,
  },
  address: {
    ar: props.items.object.address.ar,
    en: props.items.object.address.en,
  },
  lat: props.items.object.lat,
  lon: props.items.object.lon,
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
          <h4>{{ $t('Edit branch information') }}:</h4>
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
                          :label="$t('English name')"
                          :error-messages="getInputError('name.en')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextField
                          v-model="item.address.en"
                          :label="$t('English address')"
                          :error-messages="getInputError('address.en')"
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
                          :label="$t('Arabic name')"
                          :error-messages="getInputError('name.ar')"
                        />
                      </VCol>
                      <VCol
                        md="12"
                        cols="12"
                      >
                        <VTextField
                          v-model="item.address.ar"
                          :label="$t('Arabic address')"
                          :error-messages="getInputError('address.ar')"
                        />
                      </VCol>
                    </VRow>
                  </VWindowItem>
                </VWindow>
              </VCardText>
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="item.lat"
                :label="$t('Lat')"
                :error-messages="getInputError('lat')"
              />
            </VCol>
            <VCol cols="12">
              <VTextField
                v-model="item.lon"
                :label="$t('Lon')"
                :error-messages="getInputError('lon')"
              />
            </VCol>
            <VCol cols=12>
              <GoogleMap v-model:lat="item.lat" v-model:lon="item.lon" />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </Form>
  </div>
</template>
