<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type Iform from './Iform'
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

const tab = ref<number>(1)
const translate = ref(null)

const {
  items,
  loading,
  fetchItems,
} = tableHock('settings/splash_screen')

// prepare item
const formSetup: Iform = {
  data: [
    {
      value: {
        ar: '',
        en: '',
      }
    },
    {
      value: {
        ar: '',
        en: '',
      }
    },
    {
      value: {
        ar: '',
        en: '',
      }
    }
  ]
}



const { item, saveItem } = formHock<Iform>('settings/splash_screen', 'editPath', formSetup, false)


watchEffect(() => {
  fetchItems()
})


watchEffect(() => {
  if (Array.isArray(items.value)) {
    items.value.map((e: any, index: number) => {
        item.value.data[index].value.en = e.value.en
        item.value.data[index].value.ar = e.value.ar
    })
  }
})



const submitItem = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    fetchItems()
  }
  else {
    // scroll to top screen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
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
          title: $t('Splash screens')
        }
      ]"
    />
    <PageHeader
      :title="$t('Splash screens')"
      :text="$t('From here you can manage system splash screens')"
    />
    <VCard class="py-5 px-5">
      <VRow>
        <VCol
          md="12"
          cols="12"
          class="border mb-5"
        >
          <VTabs
            v-model="tab"
            align-tabs="center"
            centered
          >
            <VTab
              v-for="splash in items"
              :key="splash.id"
              :value="splash.id"
            >
              {{ `${$t('Tab')} ${splash.id}` }}
            </VTab>
          </VTabs>
          <Loader v-if="loading" />
          <VCardText class="py-0 px-0">
            <VWindow
              v-model="tab"
              class="pt-5"
            >
              <VWindowItem
                v-for="(splash, index) in items"
                :key="splash.id"
                :value="splash.id"
              >
                <VForm @submit.prevent>
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                      class="border mb-5"
                    >
                      <VTabs
                        v-model="translate"
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
                          v-model="translate"
                          class="pt-5"
                        >
                          <VWindowItem value="english">
                            <Ckeditor
                              v-model="item.data[index].value.en"
                              v-model:value="item.data[index].value.en"
                            />
                          </VWindowItem>

                          <VWindowItem value="arabic">
                            <Ckeditor
                              v-model="item.data[index].value.ar"
                              v-model:value="item.data[index].value.ar"
                            />
                          </VWindowItem>
                        </VWindow>
                      </VCardText>
                    </VCol>
                  </VRow>
                  <VBtn
                    class="mt-2"
                    @click="submitItem"
                  >
                    {{ $t('Submit') }}
                  </VBtn>
                </VForm>
              </VWindowItem>
            </VWindow>
          </VCardText>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>
