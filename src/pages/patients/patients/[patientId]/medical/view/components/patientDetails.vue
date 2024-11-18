<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <div>
    <VCard class="py-5 px-5 mb-5">
      <div>
        <div class="mb-2">
          {{ $t('Doctor') }}:
          {{ items?.doctor_name }}
        </div>
        <div class="mb-2">
          {{ $t('Speciality') }}:
          {{ items?.speciality?.title }}
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
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
