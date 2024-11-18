<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const {
  items,
} = tableHock('surveys?filters[type]=default')

</script>

<template>
  <div>
    <VCard class="py-5 px-5 mb-5 d-flex">
      <div>
        <div class="mb-2">
          {{ $t('Title') }}:
          {{ items[0]?.title }}
        </div>
        <div class="mb-2">
          {{ $t('Status') }}:
          <VChip
            v-if="items[0]?.status"
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
        <div class="mb-2">
          {{ $t('Required to reserve') }}:
          <VChip
            v-if="items[0]?.required_to_reserve"
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
        <div class="mb-2">
          {{ $t('Questions count') }}:
          {{ items[0]?.questions_count }}
        </div>
        <div class="mb-2">
          {{ $t('Created at') }}:
          {{ items[0]?.created_at }}
        </div>
      </div>
      <VSpacer />
        <div>
          <VBtn :to="`/survey/default/list/answers/${items[0]?.id}`">
            {{ $t('answers') }}
        </VBtn>
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
