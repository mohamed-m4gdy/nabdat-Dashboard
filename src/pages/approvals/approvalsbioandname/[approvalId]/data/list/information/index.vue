<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
import EditForm from './components/editForm.vue'
import RejectForm from './components/rejectForm.vue'

defineProps(['items'])

// Prepare approve and reject forms
const approveId = ref<number>(0)
const rejectId = ref<number>(0)
const showApproveForm = (id: number) => approveId.value = id
const showRejectForm = (id: number) => rejectId.value = id
const close = () => {
  approveId.value = 0
  rejectId.value = 0
}
</script>

<template>
  <div class="mt-5 mb-5">
    <VRow class="mb-3">
      <VCol cols="12" :md="items.status !== 'approved' ? 6 : 12">
        <VCard class="py-5 px-5 mb-5 d-flex h-100">
          <div class="w-100">
            <h4 class="mb-5">{{ $t('Doctor information') }}</h4>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('English Name') }}:</h4>
              <div>{{ items?.object?.first_name?.en }} {{ items?.object?.last_name?.en }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Arabic name') }}:</h4>
              <div>{{ items?.object?.first_name?.ar }} {{ items?.object?.last_name?.ar }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('English bio') }}:</h4>
              <div>{{ items?.object?.bio?.en }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Arabic bio') }}:</h4>
              <div>{{ items?.object?.bio?.ar }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Action') }}:</h4>
              <div>{{ items?.action }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Type') }}:</h4>
              <div>{{ items?.type }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Created at') }}:</h4>
              <div>{{ items?.created_at }}</div>
            </div>
            <VDivider class="mt-5" />
            <div class="mt-5 d-flex gap-5" v-if="items.status !== 'approved'">
              <VBtn color="error" @click="showRejectForm(items.id)">
              {{ $t('Reject') }}
            </VBtn>
              <VBtn color="primary" @click="showApproveForm(items.id)">
              {{ $t('Approve') }}
            </VBtn>
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="6" v-if="items.status !== 'approved'">
        <EditForm :items="items" />
      </VCol>
    </VRow>
    <ApproveForm
      v-if="approveId"
      :approve-id="approveId"
      @close="close"
    />
    <RejectForm
      v-if="rejectId"
      :reject-id="rejectId"
      @close="close"
    />
  </div>
</template>
