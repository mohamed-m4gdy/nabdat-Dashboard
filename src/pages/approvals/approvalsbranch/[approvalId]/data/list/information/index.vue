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

const {t : $t} = useI18n()
</script>

<template>
  <div class="mt-5">
    <VRow>
      <VCol cols="12" md="12">
        <div class="w-100">
          <VRow class="mb-2">
            <VCol cols="12" :md="items.status !== 'approved' ? 6 : 12">
              <VCard class="py-3 px-5 h-100">
                <h4 class="mb-5">{{ $t('Branch information') }}</h4>
                <div class="d-flex flex-column gap-2">
                  <div class="d-flex gap-1">
                    <h4>{{ $t('English name') }}:</h4>
                    <div>{{ items.object?.name?.en }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Arabic name') }}:</h4>
                    <div>{{ items.object?.name?.ar }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('English address') }}:</h4>
                    <div>{{ items.object?.address?.en }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Arabic address') }}:</h4>
                    <div>{{ items.object?.address?.ar }}</div>
                  </div>
                  <div class="d-flex gap-2 align-center">
                    <h4>{{ $t('Specialities') }}:</h4>
                    <div>
                      <div v-for="(speciality, index) in items.object.specialities_obj" :key="index">
                        <div>{{ speciality.title }}</div>
                      </div>
                    </div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Organization') }}:</h4>
                    <div>{{ items.object?.organization?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Main branch') }}:</h4>
                    <div>
                      <VChip
                        v-if="items.object.main_branch"
                        color="success"
                        class="font-weight-medium"
                        size="small"
                      >
                        {{ $t('Active') }}
                      </VChip>
                      <VChip
                        v-else
                        color="error"
                        class="font-weight-medium"
                        size="small"
                      >
                        {{ $t('Not active') }}
                      </VChip>
                    </div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('City') }}:</h4>
                    <div>{{ items.object?.city?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Lat') }}:</h4>
                    <div>{{ items.object?.lat }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Lon') }}:</h4>
                    <div>{{ items.object?.lon }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Action') }}:</h4>
                    <div>{{ items.action }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Created at') }}:</h4>
                    <div>{{ items.created_at }}</div>
                  </div>
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
            <VCol cols="12" md="6" v-if="items.status !== 'approved'">
              <EditForm :items="items" />
            </VCol>
          </VRow>
          <div class="mb-5">
            <VCard class="d-flex gap-3 py-3 px-5">
              <h4>{{ $t('images') }}:</h4>
              <h4 v-if="items.media.length !== 0">{{ $t('Old images') }}:</h4>
              <div class="d-flex gap-5 flex-wrap">
                <div  v-for="(image, index) in items.object.files" :key="index">
                  <VImg
                    :width="150"
                    :height="150"
                    aspect-ratio="1/1"
                    cover
                    v-if="image.file"
                    :src="image.file"
                  />
                </div>
              </div>
            </VCard>
          </div>
          <div class="mb-5" v-if="items.media.length !== 0">
            <VCard class="d-flex gap-3 py-3 px-5">
              <h4>{{ $t('New images') }}:</h4>
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
