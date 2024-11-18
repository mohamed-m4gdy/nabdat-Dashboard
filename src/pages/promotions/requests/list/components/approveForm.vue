<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

const prop = defineProps(['approveId'])
const emit = defineEmits(['close', 'updateForm'])
const showFrom = ref<boolean>(true)

// prepare item
const initialItem = {
  reply: '',
  approved: false,
}

const rules = { reply: { required: helpers.withMessage('Replay is required', required) } }

const { getInputError, item, loading, saveItem, serverErrors } = formHock<any>(`promotion/requests/${prop.approveId}/reply`, 'add', initialItem, rules)

// approve method
const submit = async () => {
  await saveItem()
  if (!serverErrors.value.length)
    emit('updateForm')
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    width="500"
  >
    <!-- Dialog Content -->
    <VCard title="Approve & Reply">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />

      <VCol cols="12">
        <div>
          <VAlert
            v-for="error in serverErrors"
            :key="error"
            class="mb-4"
            border="start"
            border-color="error"
          >
            {{ error }}
          </VAlert>
        </div>
      </VCol>

      <VCol cols="12">
        <VTextarea
          v-model="item.reply"
          :label="$t('Replay')"
          :error-messages="getInputError('reply')"
        />
      </VCol>
      <VCol cols="12">
        <VCheckbox
          v-model="item.approved"
          :label="$t('Approved')"
        />
      </VCol>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          @click="$emit('close')"
        >
          {{ $t('Cancel') }}
        </VBtn>
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
