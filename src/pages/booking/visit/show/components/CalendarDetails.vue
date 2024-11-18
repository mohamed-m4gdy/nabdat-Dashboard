<script lang="ts" setup>
defineProps(['item', 'loading'])
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <!-- 👉 Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Calendar details') }}
        </h6>
        <VDivider class="my-4" />
        <VList class="card-list">
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Date') }}:
              <span class="text-capitalize text-body-2">{{ item.calendar?.day }} {{ item.calendar?.from_date }} {{ item.calendar?.from_time }} - {{ item.calendar?.to_time }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Type') }}:
              <span class="text-capitalize text-body-2">{{ item.calendar?.type }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Slot bookings') }}:
              <span class="text-capitalize text-body-2">{{ item.calendar?.slot_bookings }}</span>
            </h6>
          </VListItemTitle>
        </VList>
      </VCardText>
    </VCard>
  </div>
</template>
