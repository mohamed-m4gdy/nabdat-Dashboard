<script setup lang="ts">

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['approveId'])
const emit = defineEmits(['updateForm', 'closeForm'])
const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

const { loading, saveItem, serverErrors } = formHock<any>(`doctor/reviews/${prop.approveId}/approve`, 'add')

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
    <VCard title="Approve review">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('closeForm')"
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
