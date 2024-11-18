<script setup lang="ts">
import { helpers, required, minValue, numeric, maxValue } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['updateId'])
const emit = defineEmits(['close', 'updateForm'])

const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

// prepare item
const initialItem = {
  value: '',
}

const rules = { 
  value: {
    required: helpers.withMessage('Value is required', required),
    numeric: helpers.withMessage('Value must be number', numeric),
    minValue: helpers.withMessage('Value must be bigger than or equal 0', minValue(0)),
    maxValue: helpers.withMessage('Value must be smaller than or equal 100', maxValue(100)),
  }
}

const { getInputError, item, loading, saveItem, serverErrors } = formHock<any>(`price-types/${prop.updateId}`, 'editPath', initialItem, rules)

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
    <VCard title="Update value">
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
          v-model="item.value"
          :label="$t('Value')"
          :error-messages="getInputError('value')"
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
