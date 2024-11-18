<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
const props = defineProps(['items'])

// get route
const route = useRoute()

const {
  changePage,
  changeSearch,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  items,
  loading,
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`specialities`, false, true, true, {'id': route.params.specialityId})
</script>

<template>
  <div>
    <VCard class="py-5 px-5 mb-5">
      <div class="d-flex">
        <div
          v-for="item in items"
          :key="item.id"
        >
          <div class="mb-2 d-flex gap-1">
            <h4>{{ $t('Speciality title') }}:</h4>
            <div>{{ item.title }}</div>
          </div>
          <div class="mb-2 d-flex gap-1">
            <h4>{{ $t('Speciality status') }}:</h4>
            <div>
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
</style>
