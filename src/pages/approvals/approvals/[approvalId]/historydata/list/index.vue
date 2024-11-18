<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// index table model
import IndexTable from '@/components/table/index.vue'

// get route
const route = useRoute()

const {
  changePage,
  changeSearch,
  error,
  items,
  loading,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`approvals/history/${parseInt(route.params.approvalId as string)}/data`, false, true, true)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'COMMENT', key: 'comment' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'STATUS', key: 'status' },
]
</script>

<template>
  <div>
    <PageHeader :title="$t('Approvals history data')" :text="$t('From here you can manage system Approvals history data')" />
    <VCard>
      <!-- items table -->
      <IndexTable
        :headers="headers"
        :loading="loading"
        :items="items.logs"
        :options="options"
        :total-pages="totalPages"
        :total-items="totalItems"
        :error="error"
        @change-page="changePage"
        @change-search="changeSearch"
        @sort="sort"
      >
        <tr
          v-for="item in items.logs"
          :key="item.id"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.comment }}
          </td>

          <td>
            {{ item.created_at }}
          </td>
          <td>
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
          </td>
        </tr>
      </IndexTable>
    </VCard>
  </div>
</template>
