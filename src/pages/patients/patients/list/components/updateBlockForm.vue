<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['updateId'])
const emit = defineEmits(['close', 'updateForm'])

const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

// prepare item
const initialItem = {
  type: '',
  expire_at: '',
}

const rules = {
  type: {
    required: helpers.withMessage('type is required', required),
  },
  expire_at: {
    required: helpers.withMessage('Expire date is required', required),
  },
}

const { getInputError, item, loading, saveItem, serverErrors } = formHock<any>(`patient/${prop.updateId}/updateBlock`, 'add', initialItem, rules)

// approve method
const submit = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    emit('updateForm')
  }
  else {
    // scroll to top screen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    width="500"
  >
    <!-- Dialog Content -->
    <VCard title="Update block">
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
        <VSelect
          v-model="item.type"
          :label="$t('Type')"
          item-title="key"
          item-value="value"
          :items="[
            {
              key: $t('Permenant'),
              value: 'permenant',
            },
            {
              key: $t('To date'),
              value: 'fake_bookings',
            },
          ]"
          :error-messages="getInputError('type')"
        />
      </VCol>
      <VCol cols="12">
        <DateInput
          v-model:value="item.expire_at"
          :label="$t('Expire date')"
          :error-messages="getInputError('expire_at')"
        />
      </VCol>

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
