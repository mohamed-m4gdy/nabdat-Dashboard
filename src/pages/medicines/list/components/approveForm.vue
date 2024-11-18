<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['approveId'])
const emit = defineEmits(['close'])

const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

// prepare item
const initialItem = { new_id: '' }

const rules = { new_id: { required: helpers.withMessage('Refrance medicien is required', required) } }

const { getInputError, item, loading, saveItem, serverErrors } = formHock<any>(`medicines/${prop.approveId}/approve`, 'add', initialItem, rules)

// approve method
const submit = async () => {
  await saveItem()
  if (!serverErrors.value.length)
    emit('close')
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    width="500"
  >
    <!-- Dialog Content -->
    <VCard title="Update Medicine">
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
        <Search
          v-model="item.new_id"
          v-model:value="item.new_id"
          :label-string="$t('Select Medicine')"
          :error-messages="getInputError('new_id')"
          title-param="tradename"
          paths="medicines"
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
