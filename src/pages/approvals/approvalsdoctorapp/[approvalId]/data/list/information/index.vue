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

const {t : $t} = useI18n()
</script>

<template>
  <div class="mt-5">
    <VRow>
      <VCol cols="12" md="12">
        <VCard class="py-5 px-5 mb-5 d-flex">
          <div class="w-100">
            <h4>{{ $t('Doctor information') }}</h4>
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

              <!-- 👉 title chip -->
              <h3>
                <VChip
                  label
                  density="comfortable"
                  class="text-capitalize mt-7 text-subtitle-1"
                >
                {{ items.object?.first_name }}
                </VChip>
              </h3>
            </VCardText>
            <VRow>
              <VCol>
                <VCard class="py-3 px-4 h-100">
                  <div class="d-flex flex-column gap-2">
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Title') }}:</h4>
                      <div>{{ items.object?.title?.title }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Name') }}:</h4>
                      <div>{{ items.object?.first_name }} {{ items.object?.last_name }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Email') }}:</h4>
                      <div>{{ items.object?.email }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Mobile') }}:</h4>
                      <div>{{ items.object?.mobile }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Language') }}:</h4>
                      <div>{{ items.object?.default_language?.name }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Origin country') }}:</h4>
                      <div>{{ items.object?.origin_country?.name }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Governorate') }}:</h4>
                      <div>{{ items.object?.government?.name }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Gender') }}:</h4>
                      <div>{{ items.object?.gender }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Created at') }}:</h4>
                      <div>{{ items.created_at }}</div>
                    </div>

                  </div>
                </VCard>
              </VCol>
              <VCol>
                <VCard class="py-3 px-4 h-100">
                  <div class="d-flex flex-column gap-2">
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Speciality') }}:</h4>
                      <div>{{ items.object?.speciality?.title }}</div>
                    </div>
                    <div>
                      <span class="d-flex gap-1" v-if="items.object?.sub_speciality?.title">
                        <h4>{{ $t('Sub speciality') }}:</h4>
                        <div>{{ items.object?.sub_speciality?.title }}</div>
                      </span>
                      <span v-else>.</span>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('National number') }}:</h4>
                      <div>{{ items.object?.national_number }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Calling code') }}:</h4>
                      <div>{{ items.object?.calling_code }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Birthday') }}:</h4>
                      <div>{{ items.object?.dob }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Country') }}:</h4>
                      <div>{{ items.object?.country?.name }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('City') }}:</h4>
                      <div>{{ items.object?.city?.name }}</div>
                    </div>
                    <div class="d-flex gap-1">
                      <h4>{{ $t('Action') }}:</h4>
                      <div>{{ items.action }}</div>
                    </div>
                  </div>
                </VCard>
              </VCol>
            </VRow>
            <VCard class="mt-3 px-4 py-3">
              <div class="d-flex gap-3 mt-3">
                <h4 class="mt-1">
                  {{ $t('Files') }}:
                </h4>
                <div class="d-flex flex-wrap gap-4">
                  <div v-for="(item, index) in items.object.files" :key="index">
                    <VCard class="py-3 px-3">
                      <div class="d-flex align-center justify-center flex-column">
                        <div>
                          <span>{{ $t('Tag') }}:</span>
                          {{ item.tag }}
                        </div>
                        <div>
                          <VBtn
                            :href="item.original_url"
                            target="_blank"
                            variant="plain"
                          >
                            {{ item.name }}
                          </VBtn>
                        </div>
                      </div>
                    </VCard>
                    </div>
                </div>
              </div>
            </VCard>
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
    </VRow>
    
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
