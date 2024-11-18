<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// get route
const route = useRoute()

const {
  items,
} = tableHock(`survey-questions/${route.params.id}`)

const {
  items: item,
} = tableHock('surveys?filters[type]=after_login')
</script>

<template>
  <div class="d-flex justify-between gap-5">
    <VCard class="py-5 px-5 mb-5 d-flex w-50">
      <div>
        <div>
          <div class="mb-2 color-white">
            {{ $t('Survey details') }}
          </div>
          <div class="mb-2">
            {{ $t('Title') }}:
            {{ item[0]?.title }}
          </div>
          <div class="mb-2">
            {{ $t('Status') }}:
            <VChip
              v-if="item[0]?.status"
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
              v-if="item[0]?.required_to_reserve"
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
            {{ item[0]?.questions_count }}
          </div>
          <div class="mb-2">
            {{ $t('Created at') }}:
            {{ item[0]?.created_at }}
          </div>
        </div>
      </div>
    </VCard>
    <VCard class="py-5 px-5 mb-5 d-flex w-50">
      <div>
        <div>
          <div class="mb-2 color-white">
            {{ $t('Question details') }}
          </div>
          <div class="mb-2">
            {{ $t('Question') }}:
            {{ items.question }}
          </div>
          <div class="mb-2">
            {{ $t('Type') }}:
            {{ items.type }}
          </div>
          <div class="mb-2">
            {{ $t('Status') }}:
            <VChip
              v-if="items.status"
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
            {{ $t('Required') }}:
            <VChip
              v-if="items.required"
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
            {{ $t('Created at') }}:
            {{ items.created_at }}
          </div>
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
.v-theme--dark .color-white {
  color: #ffffffe3;
}
.v-theme--light .color-white {
  color: #000000f2;
}
</style>
