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
            <h4 class="mb-5">{{ $t('Hospital information') }}</h4>
            <VCardText class="text-center">
              <!-- 👉 photo -->
              <VAvatar
                rounded="sm"
                :size="150"
                :color="!items.object.photo ? 'primary' : undefined"
                :variant="!items.object.photo ? 'tonal' : undefined"
              >
                <VImg
                  v-if="items.object.photo"
                  :src="items.object.photo"
                />
              </VAvatar>
            </VCardText>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('English Name') }}:</h4>
              <div>{{ items.object?.name.en }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Arabic name') }}:</h4>
              <div>{{ items.object?.name.ar }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('English descriptions') }}:</h4>
              <div>{{ items.object?.descriptions.en }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Arabic descriptions') }}:</h4>
              <div>{{ items.object?.descriptions.ar }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Action') }}:</h4>
              <div>{{ items.action }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
              <h4>{{ $t('Type') }}:</h4>
              <div>{{ items.type }}</div>
            </div>
            <div class="mb-2 d-flex gap-1">
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
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="6" v-if="items.status !== 'approved'">
        <EditForm :items="items" />
      </VCol>
      
    </VRow>
    <div class="mb-5" v-if="items.media.length !== 0">
      <VCard class="d-flex gap-3 py-3 px-5">
        <h4>{{ $t('Images') }}:</h4>
        <div class="d-flex gap-5 flex-wrap">
          <div  v-for="(image, index) in items.media" :key="index">
            <VImg
              :width="150"
              :height="150"
              aspect-ratio="1/1"
              cover
              v-if="image"
              :src="image"
            />
          </div>
        </div>
      </VCard>
    </div>
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
