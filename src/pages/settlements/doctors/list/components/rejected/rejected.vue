<script setup lang="ts">
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['takeActionId'])
const emit = defineEmits(['updateForm'])

const formSetup: Iform = {
  settlement_id: prop.takeActionId,
  status: 'refused',
  note: ''
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('settlements', 'add', formSetup, validation)

// approve method
const submit = async () => {
  const response = await saveItem()
  if (response.status) emit('updateForm')
}

</script>

<template>
  <div>
    <FormModel
      :loading="loading"
      :errors="[]"
      :server-errors="serverErrors"
      @save-item="submit"
    >
      <VRow class="my-3 mx-3">
        <VCol
          cols="12"
        >
          <VTextarea
            v-model="item.note"
            :label="$t('Note')"
            :error-messages="getInputError('note')"
          />
        </VCol>
      </VRow>
    </FormModel>

    <VCardActions>
      <VSpacer />
      <VBtn
        v-if="!loading"
        @click="submit"
      >
        {{ $t('Save') }}
      </VBtn>
      <VBtn v-if="loading">
        {{ $t('Loading') }}
      </VBtn>
    </VCardActions>
  </div>
</template>
