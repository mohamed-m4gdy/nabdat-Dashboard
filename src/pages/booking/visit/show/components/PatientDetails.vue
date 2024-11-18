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
          {{ $t('Patient details') }}
        </h6>
        <VDivider class="my-4" />
        <VList class="card-list">
          <div class="text-center mb-3">
            <VAvatar
              rounded="sm"
              :size="120"
              :color="!item.patient.photo ? 'primary' : undefined"
              :variant="!item.patient.photo ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.patient.photo"
                :src="item.patient.photo"
              />
            </VAvatar>
          </div>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Patient') }}:
              <span class="text-capitalize text-body-2">
                {{ item.patient?.firstname }} {{ item.patient?.lastname }}
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Email') }}:
              <span class="text-capitalize text-body-2">
                {{ item.patient?.email }}
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Gender') }}:
              <span class="text-capitalize text-body-2">
                {{ item.patient?.gender }}
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Mobile') }}:
              <span class="text-capitalize text-body-2">
                {{ item.patient?.calling_code }}{{ item.patient?.mobile }}
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Status') }}:
              <VChip
                v-if="item.patient?.active"
                color="success"
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Approved') }}
              </VChip>
              <VChip
                v-else
                color="error"
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Not approved') }}
              </VChip>
            </h6>
          </VListItemTitle>
        </VList>
      </VCardText>
    </VCard>
  </div>
</template>
