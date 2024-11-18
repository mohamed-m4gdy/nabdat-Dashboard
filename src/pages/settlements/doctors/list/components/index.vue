<script setup lang="ts">
import rejected from './rejected/rejected.vue'
import approved from './approved/approved.vue'

defineProps(['takeActionId'])
const emit = defineEmits(['close', 'updateForm'])

const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

const items = ['approved', 'rejected']
const status = ref()
const updateForm = () => {
  emit('updateForm')
}
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    max-width="900"
    min-height="600"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('Approve')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <VRow class="my-3 mx-3">
        <VCol
          cols="12"
        >
          <VSelect
            v-model="status"
            :items="items"
            :label="$t('Select Status')"
          />
        </VCol>
      </VRow>
      <rejected
        v-if="status === 'rejected'"
        :takeActionId="takeActionId"
        @updateForm="updateForm"
      />
      <approved
        v-if="status === 'approved'"
        :takeActionId="takeActionId"
        @updateForm="updateForm"
      />
    </VCard>
  </VDialog>
</template>
