<script setup lang="ts">
import { helpers, required, minLength } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['approveId'])
const emit = defineEmits(['close', 'updateForm'])

const showFrom = ref<boolean>(true)

interface approvalForm {
  comment: string
  status: boolean
}

const formSetup: approvalForm = {
  comment: '',
  status: true,
}

// validation
const rules = {
  comment: {
    required: helpers.withMessage('Comment is required', required),
    minLength: helpers.withMessage('Comment must be bigger than or equal 3', minLength(3)),
  },

}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<approvalForm>(`approvals/${prop.approveId}/approve`, 'add', formSetup, rules)

// approve method
const submit = async () => {
  const response = await saveItem()
  if (response.status) emit('updateForm')
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    width="500"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('Approve')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />

      <FormModel
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submit"
      >
        <VRow class="my-3 mx-3">
          <VCol
            md="12"
            cols="12"
          >
            <VTextarea
              v-model="item.comment"
              :label="$t('Comment')"
              :error-messages="getInputError('comment')"
            />
          </VCol>
          <VCol cols="6">
            <VCheckbox
              v-model="item.status"
              :label="$t('Active')"
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
          {{ $t('Approve') }}
        </VBtn>
        <VBtn v-if="loading">
          {{ $t('Loading') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
