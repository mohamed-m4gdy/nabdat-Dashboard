<script setup lang="ts">
import formHock from '@/helpers/formHock'

const prop = defineProps(['updateId'])
const emit = defineEmits(['close', 'updateForm'])
const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

const { loading, saveItem, serverErrors } = formHock<any>(`medical-history-tags/${prop.updateId}/approve`, 'add', false, false)

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
    <VCard :title="$t('Are you sure you want to approve ?')">
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
          {{ $t('Approve') }}
        </VBtn>
        <VBtn v-if="loading">
          {{ $t('Loading') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
