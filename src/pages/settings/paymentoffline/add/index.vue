<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  title: {
    ar: '',
    en: '',
  },
  details: {
    ar: '',
    en: '',
  },
  logo: '',
  refernce_number: '',
  fees: null,
  payment_id: null,
  is_active: true,
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('payGateOffline', 'add', formSetup, validation)

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
          title: $t('Payment offline'),
          link: '/settings/paymentoffline/list'
        },
        {
          title: $t('Edit')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add payment offline')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol md="9">
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
                      <VRow>
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
                            v-model="item.details.en"
                            :label="$t('English details')"
                            :error-messages="getInputError('details.en')"
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
                            v-model="item.details.ar"
                            :label="$t('Arabic details')"
                            :error-messages="getInputError('details.ar')"
                          />
                        </VCol>
                      </VRow>
                    </VWindowItem>
                  </VWindow>
                </VCardText>
              </VCol>
              <VCol
                md="12"
                cols="12"
              >
                <Search
                  v-model="item.payment_id"
                  v-model:value="item.payment_id"
                  :label-string="$t('Payment gate')"
                  title-param="title"
                  order-by="name"
                  paths="paymentGate"
                  :error-messages="getInputError('payment_id')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.refernce_number"
                  :label="$t('Refernce number')"
                  :error-messages="getInputError('refernce_number')"
                />
              </VCol>
              <VCol
                md="6"
                cols="12"
              >
                <VTextField
                  v-model="item.fees"
                  :label="$t('Fees')"
                  :error-messages="getInputError('fees')"
                />
              </VCol>
              <VCol cols="6">
                <VCheckbox
                  v-model="item.is_active"
                  :label="$t('Active')"
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol cols="3">
            <FileInput
              v-model:value="item.logo"
              image-wrapper="imageWrapper"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
