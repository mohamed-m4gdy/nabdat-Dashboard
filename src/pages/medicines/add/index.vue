<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// prepare item
const formSetup: Iform = {
  tradename: '',
  activeingredient: '',
  company: '',
  group: '',
  info: '',
  form: '',
  price: '',
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('medicines', 'add', formSetup, validation)

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
          title: $t('Medicines'),
          link: '/medicines/list'
        },
        {
          title: $t('Add'),
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add Medicine')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol
            md="6"
            cols="12"
          >
            <AutoCompleteInput
              v-model="item.tradename"
              v-model:value="item.tradename"
              :error-messages="getInputError('tradename')"
              path="medicines/tradename"
              limit="15"
              :label="$t('Trade name')"
              @auto-complete="autoComplete"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <AutoCompleteInput
              v-model="item.activeingredient"
              v-model:value="item.activeingredient"
              :error-messages="getInputError('activeingredient')"
              path="medicines/activeingredient"
              limit="15"
              :label="$t('Active ingredient')"
              @auto-complete="autoComplete"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <AutoCompleteInput
              v-model="item.company"
              v-model:value="item.company"
              :error-messages="getInputError('company')"
              path="medicines/company"
              limit="15"
              :label="$t('Company')"
              @auto-complete="autoComplete"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <AutoCompleteInput
              v-model="item.group"
              v-model:value="item.group"
              :error-messages="getInputError('group')"
              path="medicines/group"
              limit="15"
              :label="$t('Group')"
              @auto-complete="autoComplete"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <AutoCompleteInput
              v-model="item.form"
              v-model:value="item.form"
              :error-messages="getInputError('form')"
              path="medicines/form"
              limit="15"
              :label="$t('Form')"
              @auto-complete="autoComplete"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.price"
              :label="$t('Price')"
              :error-messages="getInputError('price')"
            />
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <VTextarea
              v-model="item.info"
              :error-messages="getInputError('info')"
              :label="$t('Info')"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
