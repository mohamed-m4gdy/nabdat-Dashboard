<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
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
  <div class="mt-5">
    <VRow>
      <VCol cols="12" md="12">
        <div class="w-100">
          <VRow class="mb-2">
            <VCol cols="12" md="12">
              <VCard class="py-3 px-5 h-100">
                <h4 class="mb-5">{{ $t('Doctor photo') }}</h4>
                <VCardText class="text-center">
                  <!-- 👉 photo -->
                  <VAvatar
                    rounded="sm"
                    :size="200"
                    :color="!items?.object?.photo?.url ? 'primary' : undefined"
                    :variant="!items?.object?.photo?.url ? 'tonal' : undefined"
                  >
                    <VImg
                      v-if="items?.object?.photo?.url"
                      :src="items?.object?.photo?.url"
                    />
                  </VAvatar>
                </VCardText>
                <div class="d-flex gap-1">
                  <h4>{{ $t('Type') }}:</h4>
                  <div>{{ items.type }}</div>
                </div>
                <div class="d-flex gap-1">
                  <h4>{{ $t('Action') }}:</h4>
                  <div>
                    <span v-if="items.action === 'edit_doctor_photo'">
                      {{ $t('Update') }}
                    </span>  
                  </div>
                </div>
                <div class="d-flex gap-1">
                  <h4>{{ $t('Created at') }}:</h4>
                  <div>{{ items.created_at }}</div>
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
              </VCard>
            </VCol>
          </VRow>
        </div>
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
