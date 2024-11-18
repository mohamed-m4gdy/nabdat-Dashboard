<script setup lang="ts">
import { helpers, required, minLength } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['approveId'])
const emit = defineEmits(['close', 'updateForm'])

const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

interface approvalForm {
  comment: string
  action: string
}

const formSetup: approvalForm = {
  comment: '',
  action: '',
}

// validation
const rules = {
  comment: {
    required: helpers.withMessage('Comment is required', required),
    minLength: helpers.withMessage('Comment must be bigger than or equal 3', minLength(3)),
  },
  action: {
    required: helpers.withMessage('Action is required', required),
  }
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<approvalForm>(`home-visits/${prop.approveId}/update-status`, 'add', formSetup, rules)

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
    <VCard :title="$t('Update status')">
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
          <VCol cols="12">
            <VSelect
              v-model="item.action"
              :items="['booked', 'cancelled', 'pending']"
              :label="$t('Action')"
              :error-messages="getInputError('action')"
            />
          </VCol>
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
        </VRow>
      </FormModel>

      <VCardActions>
        <VSpacer />
        <VBtn
          v-if="!loading"
          @click="submit"
        >
          {{ $t('Update') }}
        </VBtn>
        <VBtn v-if="loading">
          {{ $t('Loading') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
