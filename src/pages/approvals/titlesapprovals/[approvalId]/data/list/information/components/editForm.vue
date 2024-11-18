<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'

const props = defineProps(['items'])

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  title_id: null,
  title: {
    title: props.items.object.title.title
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
          <h4>{{ $t('Edit doctor information') }}:</h4>
        </VCol>
        <VCol cols="12">
          <VRow>
            <VCol
              md="12"
              cols="12"
              class="border mb-5 mt-3"
            >
              <Search
                v-model="item.title.title"
                v-model:value="item.title_id"
                :label-string="$t('Doctor title')"
                paths="doctor_titles"
                title-param="title"
                :error-messages="getInputError('title_id')"
              />
            </VCol>
          </VRow>
        </VCol>
      </VRow>
    </Form>
  </div>
</template>
