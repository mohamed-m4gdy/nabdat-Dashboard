<script setup lang="ts">
import { helpers, minLength, required } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['changeId'])
const emit = defineEmits(['close', 'updateForm'])
const showFrom = ref<boolean>(true)

const {t : $t} = useI18n()

// prepare item
const initialItem = {
  password: '',
}

const rules = {
  password: {
    required: helpers.withMessage('Password is required', required),
    minLength: helpers.withMessage('Password must be bigger than or equal 8', minLength(8)),
  },
}

const { getInputError, item, loading, saveItem, serverErrors } = formHock<any>(`admin/${prop.changeId}/reset-password`, 'add', initialItem, rules)

// Generate random password
const generatePassword = () => item.value.password = `#${Math.random().toString(36).slice(2)}${Math.random().toString(36).toUpperCase().slice(2)}`

// approve method
const submit = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    emit('updateForm')
  }
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    width="500"
    persistent
  >
    <!-- Dialog Content -->
    <VCard title="Update Password">
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
        <VTextField
          v-model="item.password"
          :label="$t('password')"
          :error-messages="getInputError('password')"
          append-inner-icon="mdi-plus-circle"
          @click:append-inner="generatePassword"
        />
      </VCol>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          @click="$emit('close')"
        >
          {{ $t('Close') }}
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
