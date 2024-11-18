<script setup lang="ts">

// get form helper
import formHock from '@/helpers/formHock'

const prop = defineProps(['updateId'])
const emit = defineEmits(['close', 'updateForm'])

const showFrom = ref<boolean>(true)
const {t : $t} = useI18n()

// prepare item
const initialItem = {}


const { loading, saveItem } = formHock<any>(`doctor/${prop.updateId}/end-of-service`, 'add', initialItem, false)

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
    <VCard :title="$t('End Of Serivce')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />

      <VCol cols="12">
        <div class="ms-2">
          {{ $t('Are you sure u want to end service for this doctor') }}?
        </div>
      </VCol>

      <VCardActions>
        <VSpacer />
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
