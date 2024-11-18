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
  <div class="mt-5">
    <VRow>
      <VCol cols="12" md="12">
        <div class="w-100">
          <VRow class="mb-2">
            <VCol cols="12" :md="items.status !== 'approved' ? 6 : 12">
              <VCard class="py-3 px-5 h-100">
                <h4 class="mb-5">{{ $t('Hospital doctor information') }}</h4>
                <div class="d-flex flex-column gap-2">
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
                  <div class="d-flex gap-1">
                    <h4>{{ $t('English first name') }}:</h4>
                    <div>{{ items.object?.first_name?.en }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Arabic first name') }}:</h4>
                    <div>{{ items.object?.first_name?.ar }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('English last name') }}:</h4>
                    <div>{{ items.object?.last_name?.en }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Arabic last name') }}:</h4>
                    <div>{{ items.object?.last_name?.ar }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('English bio') }}:</h4>
                    <div>{{ items.object?.bio?.en }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Arabic bio') }}:</h4>
                    <div>{{ items.object?.bio?.ar }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Hospital') }}:</h4>
                    <div>{{ items.object?.hospital?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Branch') }}:</h4>
                    <div>{{ items.object?.branch?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Title ') }}:</h4>
                    <div>{{ items.object?.title?.title }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Speciality') }}:</h4>
                    <div>{{ items.object?.speciality?.title }}</div>
                  </div>
                  <div class="d-flex gap-1" v-if="items.object?.sub_speciality?.title">
                    <h4>{{ $t('Sub speciality') }}:</h4>
                    <div>{{ items.object?.sub_speciality?.title }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('National number') }}:</h4>
                    <div>{{ items.object?.national_number }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Email') }}:</h4>
                    <div>{{ items.object?.email }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Mobile') }}:</h4>
                    <div>{{ items.object?.calling_code }}{{ items.object?.mobile }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Phone') }}:</h4>
                    <div>{{ items.object?.phone }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Gender') }}:</h4>
                    <div>{{ items.object?.gender }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Birthday') }}:</h4>
                    <div>{{ items.object?.dob }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Default language') }}:</h4>
                    <div>{{ items.object?.default_language.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Country') }}:</h4>
                    <div>{{ items.object?.country?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Governorate') }}:</h4>
                    <div>{{ items.object?.government?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('City') }}:</h4>
                    <div>{{ items.object?.city?.name }}</div>
                  </div>
                  <div class="d-flex gap-1">
                    <h4>{{ $t('Origin city') }}:</h4>
                    <div>{{ items.object?.origin_country?.name }}</div>
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
              <h4 class="mt-2">{{ $t('National id') }}:</h4>
              <div class="d-flex gap-5 flex-wrap">
                <div  v-for="(item, index) in items.object.attachments.national_id" :key="index">
                  <VCard class="py-3 px-3">
                    <div class="d-flex align-center justify-center flex-column ">
                      <div>
                        <VBtn
                          :href="item"
                          target="_blank"
                          variant="plain"
                        >
                          {{ $t('National id') }}
                        </VBtn>
                      </div>
                    </div>
                  </VCard>
                </div>
              </div>
            </VCard>
          </div>
          <div class="mb-5">
            <VCard>
              <div class="d-flex gap-3 py-3 px-5">
                <h4 class="mt-2">{{ $t('Practice certificate') }}:</h4>
                <div class="d-flex gap-5 flex-wrap">
                  <div  v-for="(item, index) in items.object.attachments.practice_cert" :key="index">
                    <VCard class="py-3 px-3">
                      <div class="d-flex align-center justify-center flex-column ">
                        <div>
                          <VBtn
                            :href="item"
                            target="_blank"
                            variant="plain"
                          >
                            {{ $t('Certificate') }}
                          </VBtn>
                        </div>
                      </div>
                    </VCard>
                  </div>
                </div>
              </div>
              <!-- <div class="d-flex gap-3 py-3 px-5">
                <h4 class="mt-2">{{ $t('National id') }}:</h4>
                <div class="d-flex gap-5 flex-wrap">
                  <div  v-for="(item, index) in items.object.attachments.national_id" :key="index">
                    <VCard class="py-3 px-3">
                      <div class="d-flex align-center justify-center flex-column ">
                        <div>
                          <VBtn
                            :href="item"
                            target="_blank"
                            variant="plain"
                          >
                            {{ $t('National id') }}
                          </VBtn>
                        </div>
                      </div>
                    </VCard>
                  </div>
                </div>
              </div> -->
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
