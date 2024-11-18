<script setup lang="ts">
import { helpers, required } from '@vuelidate/validators'

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['serviceId'])
const emit = defineEmits(['close', 'updateForm'])
const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

// prepare item
const initialItem = {
  doctor_id: prop.serviceId,
  workspaces: [],
}

const rules = {
  workspaces: {
    required: helpers.withMessage('Workspaces is required', required),
  },
}

const { getInputError, item, loading, saveItem } = formHock<any>(`hospital/doctors/end-of-service`, 'add', initialItem, rules)

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
    <VCard title="End Of Service">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <VCol cols="12">
        <h5 class="text-subtitle-2">{{ $t('Select a workspace to remove doctor from this workspace you can select multi workspaces') }}</h5>
      </VCol>
      <VCol
        cols="12"
      >
        <MultySearch
          v-model:value="item.workspaces"
          :label-string="$t('Workspace')"
          paths="workspace"
          title-param="title"
          :fillter="{
            doctor_id: serviceId,
            organization_type: 'hospital',
          }"
          multi="multi"
          :error-messages="getInputError('workspaces')"
        />
      </VCol>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          v-if="!loading"
          @click="$emit('close')"
        >
          {{ $t('Close') }}
        </VBtn>
        <VBtn
          v-if="!loading"
          @click="submit"
        >
          {{ $t('Submit') }}
        </VBtn>
        <VBtn v-if="loading">
          {{ $t('Loading') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
