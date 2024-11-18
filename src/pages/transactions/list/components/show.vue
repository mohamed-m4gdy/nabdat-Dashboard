<script setup lang="ts">
defineProps(['id', 'item', 'loading'])

const emit = defineEmits(['close'])

const {t : $t} = useI18n()
</script>

<template>
  <VDialog max-width="600px">
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <!-- 👉 Transaction Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Transaction details') }}
        </h6>
        <VRow class="mt-3">
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Amount') }}:
              <span class="text-capitalize text-body-2">{{ item.amount }} {{ item.currency?.name }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Total') }}:
              <span class="text-capitalize text-body-2">{{ item.total }} {{ item.currency?.name }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Type') }}:
              <span class="text-capitalize text-body-2" v-if="item.module == 'booking'">{{ $t('Booking') }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.status != 'pending'"
                    color="primary"
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Approved') }}
                  </VChip>
                  <VChip
                    v-else
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Pending') }}
                  </VChip>
                </span>
            </h6>
          </VCol>
          

          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Created at') }}:
              <span class="text-capitalize text-body-2">{{ item.created_at }}</span>
            </h6>
          </VCol>

          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Payment Type') }}:
              <span class="text-capitalize text-body-2">{{ item.payment?.title }} </span>
            </h6>
          </VCol>

          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Use points') }}:
              <span class="text-capitalize text-body-2">
                <VChip
                  v-if="item.use_points"
                  color="primary"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('True') }}
                </VChip>
                <VChip
                  v-else
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('False') }}
                </VChip>
              </span>
            </h6>
          </VCol>

          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Amount in points') }}:
              <span class="text-capitalize text-body-2">{{ item.amount_in_points }} </span>
            </h6>
          </VCol>

          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Paid in points') }}:
              <span class="text-capitalize text-body-2">{{ item.paid_in_points }} </span>
            </h6>
          </VCol>

        </VRow>
      </VCardText>
      <VDivider />
      <!-- 👉 Patient Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Patient details') }}
        </h6>

        <VRow class="mt-3">
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Name') }}:
              <span class="text-capitalize text-body-2">{{ item.created_by?.firstname }} {{ item.created_by?.lastname }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Email') }}:
              <span class="text-capitalize text-body-2">{{ item.created_by?.email }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Mobile') }}:
              <span class="text-capitalize text-body-2">{{ item.created_by?.calling_code }} {{ item.created_by?.mobile }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Gender') }}:
              <span class="text-capitalize text-body-2" v-if=" item.created_by?.gender == 'male'">{{ $t('Male') }}</span>
              <span class="text-capitalize text-body-2" v-if=" item.created_by?.gender == 'female'">{{ $t('Female') }}</span>
            </h6>
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />

      <!-- 👉 Doctor Details -->
      <VCardText v-if="item.module == 'booking'">
        <h6 class="text-h6">
          {{ $t('Doctor details') }}
        </h6>
        <VRow class="mt-3">
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Name') }}:
              <span class="text-capitalize text-body-2">{{item.module_data[0]?.doctor_name }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Speciality') }}:
              <span class="text-capitalize text-body-2">{{item.module_data[0]?.speciality?.title }}</span>
            </h6>
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />
      <!-- 👉 Doctor Details -->
      <VCardText v-if="item.module == 'booking'">
        <h6 class="text-h6">
          {{ $t('Booking details') }}
        </h6>
        <VRow class="mt-3">
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Booking date') }}:
              <span class="text-capitalize text-body-2">{{item.module_data[0]?.booking_date }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Booking status') }}:
              <span class="text-capitalize text-body-2">{{item.module_data[0]?.status?.title }}</span>
            </h6>
          </VCol>
          <VCol sm="6">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Created date') }}:
              <span class="text-capitalize text-body-2">{{item.module_data[0]?.created_at }}</span>
            </h6>
          </VCol>
        </VRow>
      </VCardText>
      <VDivider />

      <VDivider class="mb-5" />
      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="$emit('close')"
        >
          {{ $t('Close') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.display-flex {
  .v-list-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
