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
          {{ $t('Booking details') }}
        </h6>
        <VDivider class="my-4" />
        <VList class="card-list">
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Booking date') }}:
              <span class="text-capitalize text-body-2">{{ item.booking_date }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Attendance') }}:

              <span class="text-capitalize text-body-2">
                <span v-if="item.first_come">
                  {{ $t('First come first served') }}
                </span>
                <span v-else>
                  {{ $t('On a specific time') }}
                </span>
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Status') }}:
              <span class="text-capitalize text-body-2">{{ item.status?.title }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Type') }}:
              <span class="text-capitalize text-body-2">{{ item.type }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Speciality') }}:
              <span class="text-capitalize text-body-2">{{ item.speciality?.title }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-2">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Workspace') }}:
              <span class="text-capitalize text-body-2">{{ item.workspace?.title }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-2">
            <h6 class="text-sm font-weight-medium d-flex align-center gap-1">
              {{ $t('Workspace rating') }}:
              <span class="text-capitalize text-body-2">
                <VRating
                  readonly
                  :size="19"
                  :model-value="item.workspace_rating"
                />
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Location') }}:
              <span class="text-capitalize text-body-2">
                {{ item.country?.name }},
                {{ item.government?.name }},
                {{ item.city?.name }}
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Address') }}:
              <span class="text-capitalize text-body-2">{{ item.address }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Created date') }}:
              <span class="text-capitalize text-body-2">{{ item.created_at }}</span>
            </h6>
          </VListItemTitle>
        </VList>
      </VCardText>
    </VCard>
  </div>
</template>
