<script setup lang="ts">
import ApprovalLog from './components/index.vue'
import tableHock from '@/helpers/tableHock'

// get route
const route = useRoute()

const {
  changePage,
  changeSearch,
  error,
  items,
  loading,
  fetchItems,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`approvals/${parseInt(route.params.approvalId as string)}/data`, false, true, true)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'COMMENT', key: 'comment' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'STATUS', key: 'status' },
]
</script>

<template>
  <div>
    <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Approvals'),
          link: '/approvals/approvals/list'
        },
        {
          title: $t('Approvals data & logs'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Approvals data & logs')"
      :text="$t('From here you can manage system Approvals data & logs')"
    />
    <Loader v-if="loading" />
    <ApprovalLog
      v-if="items.id && !loading"
      :items="items"
      @fetch-items="fetchItems"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :items="items.logs"
        :options="options"
        :total-pages="totalPages"
        :total-items="totalItems"
        :error="error"
        :table-title="$t('Logs')"
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
      </Table>
    </VCard>
  </div>
</template>
