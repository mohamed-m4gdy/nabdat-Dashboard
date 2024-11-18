<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import formHock from '@/helpers/formHock'

const {
  items,
} = tableHock('surveys?filters[type]=after_login')

const updateMainBranch = async (id: number, status: boolean) => {
  const initialItem = { required_to_reserve: status }
  const rules = {}
  const { saveItem } = formHock<any>(`survey/${id}/required-to-reserve/update`, 'add', initialItem, rules)
  await saveItem()
}
</script>

<template>
  <div>
    <VCard class="py-5 px-5 mb-5 d-flex">
      <div
        v-for="item in items"
        :key="item.id"
      >
        <div class="mb-2">
          {{ $t('Title') }}:
          {{ item.title }}
        </div>
        <div class="mb-2">
          {{ $t('Status') }}:
          <VChip
            v-if="item.status"
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
          {{ item.questions_count }}
        </div>
        <div class="d-flex align-center gap-3 mb-2">
          {{ $t('Required to reserve') }}:
          <VSwitch
            v-model="item.required_to_reserve"
            @click="updateMainBranch(item.id, !item.required_to_reserve)"
            inset
          />
        </div>
        <div class="mb-2">
          {{ $t('Created at') }}:
          {{ item.created_at }}
        </div>
      </div>
      <VSpacer />
        <div>
          <VBtn :to="`/survey/afterlogin/list/answers/${items[0]?.id}`">
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
