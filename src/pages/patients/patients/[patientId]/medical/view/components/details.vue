<script setup lang="ts">
defineProps(['items'])

const { locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <div>
    <VRow class="h-100">
      <VCol cols="12" md="6">
        <VCard class="py-5 px-5 mb-5">
          <div>
            <div class="mb-2 color-white">
              {{ $t('Doctor details') }}:
            </div>
            <div class="mb-2">
              {{ $t('Doctor') }}:
              {{ items?.doctor?.name }}
            </div>
            <div class="mb-2">
              {{ $t('Bio') }}:
              {{ items?.doctor?.bio }}
            </div>
            <div class="mb-2">
              {{ $t('Title') }}:
              {{ items?.doctor?.title }}
            </div>
            <div class="mb-2" v-if="items?.doctor?.phone">
              {{ $t('Phone') }}:
              {{ items?.doctor?.phone }}
            </div>
            <div class="mb-2">
              {{ $t('Speciality') }}:
              {{ items?.doctor?.specialities[0]?.title }}
            </div>
            <div class="mb-2 d-flex gap-2">
              <span>{{ $t('Tags') }}:</span>
              <span>
                <span v-for="tag in items?.doctor?.tags">
                  <div>{{ tag.title }}</div>
                </span>
              </span>
            </div>
            <div class="mb-2">
              {{ $t('Average rating') }}:
              <span class="text-capitalize text-body-2">
                <VRating
                  readonly
                  :size="19"
                  :model-value="items?.doctor?.avg_rating"
                />
              </span>
            </div>
            <div class="mb-2">
              {{ $t('Profile visit count') }}:
              {{ items?.doctor?.profile_visit_count }}
            </div>
            <div class="mb-2">
              {{ $t('Is promoted') }}:
              <VChip
                v-if="items?.doctor?.is_promoted"
                color="success"
                class="font-weight-medium"
                size="small"
              >
              {{ $t('Active') }}
              </VChip>
              <VChip
                v-else
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Not active') }}
              </VChip>
            </div>
            <div class="mb-2">
              {{ $t('Is favorite') }}:
              <VChip
                v-if="items?.doctor?.is_favorite"
                color="success"
                class="font-weight-medium"
                size="small"
              >
              {{ $t('Active') }}
              </VChip>
              <VChip
                v-else
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Not active') }}
              </VChip>
            </div>
          </div>
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard class="py-5 px-5 mb-5">
          <div>
            <div class="mb-2 color-white">
              {{ $t('Booking details') }}:
            </div>
            <div class="mb-2">
              {{ $t('Created by') }}:
              {{ items?.created_by }}
            </div>
            <div class="mb-2">
              {{ $t('Investigations') }}:
              {{ items?.investigations }}
            </div>
            <div class="mb-2">
              {{ $t('Investigation date') }}:
              {{ items?.investigation_date }}
            </div>
            <div class="mb-2">
              {{ $t('Edit') }}:
              {{ items?.edit }}
            </div>
            <div class="mb-2">
              {{ $t('Booking') }}:
              {{ locale === 'en' ? items?.booking?.status?.title.en : items?.booking?.status?.title.ar }}
            </div>
            <div class="mb-2">
              {{ $t('Booking type') }}:
              {{ items?.booking_type }}
            </div>
            <div class="mb-2">
              {{ $t('Booking date') }}:
              {{ items?.booking_date }}
            </div>
            <div class="mb-2">
              {{ $t('Status') }}:
              <VChip
                v-if="items?.status"
                color="success"
                class="font-weight-medium"
                size="small"
              >
                {{ items?.status }}
              </VChip>
            </div>
            <div class="mb-2">
              {{ $t('Created at') }}:
              {{ items?.created_at }}
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
.v-theme--dark .color-white {
  color: #ffffffe3;
}
.v-theme--light .color-white {
  color: #000000f2;
}
</style>
