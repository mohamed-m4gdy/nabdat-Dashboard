<script setup lang="ts">
import formHock from '@/helpers/formHock'

const prop = defineProps(['approveId'])
const emit = defineEmits(['close'])

const showFrom = ref<boolean>(true)

interface approvalForm {
  status: boolean
}

const formSetup: approvalForm = {
  status: true,
}

const rules = {}

const { loading, saveItem, serverErrors } = formHock<approvalForm>(`approvals/${prop.approveId}/approve`, 'add', formSetup, rules)

const router = useRouter()

// approve method
const submit = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    emit('close')
    router.go(-1)
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
    <VCard :title="$t('Are u sure?')">
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
      </FormModel>
      <VCardActions>
        <VSpacer />
        <VBtn
          v-if="!loading"
          @click="$emit('close')"
          color="error"
        >
          {{ $t('Cancel') }}
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
