<script setup lang="ts">
import DoctorInformation from './information/index.vue'
import HistoryInformation from './history/index.vue'
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
  { title: 'CREATED BY', key: 'created_by' },
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
          title: $t('App register approvals'),
          link: '/approvals/approvalsDoctorApp/list'
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
    <DoctorInformation
      v-if="items.id && !loading"
      :items="items"
      @fetch-items="fetchItems"
    />
    <VCard>
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
            {{ item.created_by?.name }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VChip
              :color="item.status === 'approved' ? 'success' : item.status === 'refused' ? 'error' : ''"
              class="font-weight-medium"
              size="small"
            >
              {{ item.status }}
            </VChip>
          </td>
        </tr>
      </Table>
    </VCard>
    <VCard class="mt-5 py-5 px-5">
      <h4 class="mb-3 text-center">{{ $t('History data') }}</h4>
      <HistoryInformation
        v-if="items.id && !loading"
        :items="items"
        @fetch-items="fetchItems"
      />
    </VCard>
  </div>
</template>
