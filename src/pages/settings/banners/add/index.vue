<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  image: {
    ar: '',
    en: '',
  },
  description: {
    ar: '',
    en: '',
  },
  url: '',
  name: [
    {
      ar: '',
      en: ''
    }
  ],
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('banners', 'add', formSetup, validation)

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

// Add new name in array
function addNewName() {
  item.value.name.push({ ar: '', en: '' })
}

// remove name from array
const removeName = (index: number) => {
  item.value.name.splice(index, 1)
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
          title: $t('Banners'),
          link: '/settings/banners/list'
        },
        {
          title: $t('Add')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add banner')"
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
                <VWindowItem
                  value="english"
                  class="mt-5"
                >
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                      class="relative"
                    >
                      <FileInput
                        v-model:value="item.image.en"
                        image-wrapper="imageWrapper"
                      />
                      <div class="plusIcon">
                        <VIcon
                          icon="mdi-plus-box"
                          size="50"
                          @click="addNewName"
                        />
                      </div>
                    </VCol>
                    <VCol
                      v-for="(na, index) in item.name"
                      :key="index"
                      md="12"
                      cols="12"
                    >
                      <VRow>
                        <VCol
                          md="1"
                          cols="12"
                        />
                        <VCol
                          md="10"
                          cols="12"
                        >
                          <VTextField
                            v-model="na.en"
                            :label="$t('English name')"
                          />
                        </VCol>
                        <VCol
                          md="1"
                          cols="12"
                        >
                          <div class="minusIcon">
                            <VIcon
                              v-if="index !== 0"
                              icon="mdi-minus-box"
                              size="50"
                              @click="removeName(index)"
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VTextarea
                        v-model="item.description.en"
                        :label="$t('English description')"
                        :error-messages="getInputError('description.en')"
                      />
                    </VCol>
                  </VRow>
                </VWindowItem>
  
                <VWindowItem
                  value="arabic"
                  class="mt-5"
                >
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                      class="relative"
                    >
                      <FileInput
                        v-model:value="item.image.ar"
                        image-wrapper="imageWrapper"
                      />
                      <div class="plusIcon">
                        <VIcon
                          icon="mdi-plus-box"
                          size="50"
                          @click="addNewName"
                        />
                      </div>
                    </VCol>
                    <VCol
                      v-for="(na, index) in item.name"
                      :key="index"
                      md="12"
                      cols="12"
                    >
                      <VRow>
                        <VCol
                          md="1"
                          cols="12"
                        />
                        <VCol
                          md="10"
                          cols="12"
                        >
                          <VTextField
                            v-model="na.ar"
                            :label="$t('Arabic name')"
                          />
                        </VCol>
                        <VCol
                          md="1"
                          cols="12"
                        >
                          <div class="minusIcon">
                            <VIcon
                              v-if="index !== 0"
                              icon="mdi-minus-box"
                              size="50"
                              @click="removeName(index)"
                            />
                          </div>
                        </VCol>
                      </VRow>
                    </VCol>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VTextarea
                        v-model="item.description.ar"
                        :label="$t('Arabic description')"
                        :error-messages="getInputError('description.ar')"
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
            <VTextField
              v-model="item.url"
              :label="$t('URL')"
              :error-messages="getInputError('url')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>

<style lang="scss">
  .relative {
    position: relative;
  }
  .plusIcon {
    position: absolute;
    z-index: 99;
    bottom: -65px;
    left: 20px;
  }
  .v-theme--light .plusIcon {
    border: 1px dashed rgb(5 2 2 / 33%);
  }
  .minusIcon {
    position: absolute;
    z-index: 99;
  }
</style>
