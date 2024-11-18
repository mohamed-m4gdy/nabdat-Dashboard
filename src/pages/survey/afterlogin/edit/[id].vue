<script lang="ts" setup>
import Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

// get route
const route = useRoute()

const {t : $t} = useI18n()

// prepare item
const formSetup: Iform = {
  question: {
    ar: '',
    en: '',
  },
  type: '',
  status: false,
  required: false,
  survey_id: 1,
  options: [
    {
      option: {
        ar: '',
        en: '',
      },
      status: true
    }
  ]
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('survey-questions', 'edit', formSetup, validation, parseInt(route.params.id as string))

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


// remove option
const removeOption = (index: number) => item.value.options.splice(index, 1)

// Add new option
const addNewOption = () => item.value.options.push({ option: { ar: '', en: '' }, status: true })

// Complete form from auto complete
const completeObjectEn = ref<Iform | null | string>(null)
const completeObjectAr = ref<Iform | null | string>(null)

// select logic
const selectItem = (type: string, fullObject: Iform | null | string) => {
  if (fullObject) {
    if (typeof fullObject == 'string') {
      if (type === 'en') {
        item.value.question.en = fullObject
      } else {
        item.value.question.ar = fullObject
      }
    } else {
        item.value = {...fullObject,   survey_id: 1}
    }
  }
}

onMounted(() => {
  watch(item, (newVal, oldVal) => {
    completeObjectEn.value = newVal.question.en
    completeObjectAr.value = newVal.question.ar
  })
})

// Translation tabs
const tabs = ref(null)
const typeTabs = ref(null)
</script>

<template>
  <div>
    <div>
      <div>
      <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('After login'),
          link: '/survey/afterlogin/list'
        },
        {
          title: $t('Edit'),
        }
      ]"
    />
    </div>
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Edit question')"
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
              v-model="tabs"
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
                v-model="tabs"
                class="pt-5"
              >
                <VWindowItem value="english">
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <FormComplete
                        v-model="completeObjectEn"
                        v-model:value="completeObjectEn"
                        :error-messages="getInputError('question.en')"
                        title="question.en"
                        path="survey-question/auto-complete"
                        limit="15"
                        :label="$t('Question english')"
                        @onSelect="selectItem('en' ,completeObjectEn)"
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
                      <FormComplete
                        v-model="completeObjectAr"
                        v-model:value="completeObjectAr"
                        :error-messages="getInputError('question.ar')"
                        title="question.ar"
                        path="survey-question/auto-complete"
                        limit="15"
                        :label="$t('Question arabic')"
                        @onSelect="selectItem('ar' ,completeObjectAr)"
                      />
                    </VCol>
                  </VRow>
                </VWindowItem>
              </VWindow>
            </VCardText>
          </VCol>
          <VCol cols="12">
            <VSelect
              v-model="item.type"
              :label="$t('Type')"
              item-title="key"
              item-value="value"
              :items="[
                {
                  key: $t('Text question'),
                  value: 'text',
                },
                {
                  key: $t('Yes Or No question'),
                  value: 'yesorno',
                },
                {
                  key: $t('Select question'),
                  value: 'multi',
                },
                {
                  key: $t('Select multi questions'),
                  value: 'multi-checkbox',
                },
              ]"
              :error-messages="getInputError('type')"
            />
          </VCol>
          <VCol cols="6">
            <VCheckbox
              v-model="item.status"
              :label="$t('Status')"
            />
          </VCol>
          <VCol cols="6">
            <VCheckbox
              v-model="item.required"
              :label="$t('Required')"
            />
          </VCol>
        </VRow>
        <VRow
          v-if="item.type === 'multi' || item.type === 'multi-checkbox'"
          class="relative"
        >
          <VCol
            md="12"
            cols="12"
            class="border mb-5"
          >
            <VTabs
              v-model="typeTabs"
              align-tabs="center"
            >
              <VTab value="english">
                {{ $t('English Translation') }}
              </VTab>
              <VTab value="arabic">
                {{ $t('Arabic Translation') }}
              </VTab>
            </VTabs>
  
            <div class="plusIcon">
              <VIcon
                icon="mdi-plus-box"
                size="50"
                @click="addNewOption"
              />
            </div>
            <VCardText
              v-for="(option, index) in item.options"
              :key="index"
              class="py-0 px-0"
            >
              <VWindow
                v-model="typeTabs"
                class="pt-5"
              >
                <VWindowItem value="english">
                  <VRow>
                    <VCol
                      md="1"
                      cols="12"
                    />
                    <VCol
                      md="7"
                      cols="12"
                    >
                      <VTextField
                        v-model="option.option.en"
                        :label="$t('Options english')"
                        :error-messages="getInputError('options')"
                      />
                    </VCol>
                    <VCol
                      md="3"
                      cols="6"
                    >
                      <VCheckbox
                        v-model="option.status"
                        :label="$t('Status')"
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
                          @click="removeOption(index)"
                        />
                      </div>
                    </VCol>
                  </VRow>
                </VWindowItem>
  
                <VWindowItem value="arabic">
                  <VRow>
                    <VCol
                      md="1"
                      cols="12"
                    />
                    <VCol
                      md="7"
                      cols="12"
                    >
                      <VTextField
                        v-model="option.option.ar"
                        :label="$t('Options arabic')"
                        :error-messages="getInputError('options')"
                      />
                    </VCol>
                    <VCol
                      md="3"
                      cols="6"
                    >
                      <VCheckbox
                        v-model="option.status"
                        :label="$t('Status')"
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
                          @click="removeOption(index)"
                        />
                      </div>
                    </VCol>
                  </VRow>
                </VWindowItem>
              </VWindow>
            </VCardText>
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>

<style lang="scss">
  .border-top {
    h4 {
      border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity)) !important;
    }
  }
</style>
