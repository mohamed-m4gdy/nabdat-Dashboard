<script lang="ts" setup>
import tableHock from '@/helpers/tableHock'

const route = useRoute()

const {t : $t} = useI18n()

const {
  changePage,
  changeSearch,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  items,
  loading,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`home-visits/${parseInt(route.params.id as string)}/logs`)


// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ACTION', key: 'action' },
  { title: 'COMMENT', key: 'comment' },
  { title: 'CREATED AT', key: 'created_at' },
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
          title: $t('Home visits assistants'),
          link: '/homevisits/assistants'
        },
        {
          title: $t('Logs'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Logs')"
      :text="$t('From here you can manage system logs')"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :delete-id="deleteId"
        :items="items"
        :options="options"
        :total-pages="totalPages"
        :total-items="totalItems"
        :error="error"
        @colse-delete="colseDelete"
        @delete-item="deleteItem"
        @change-page="changePage"
        @change-search="changeSearch"
        @sort="sort"
      >
        <tr
          v-for="item in items"
          :key="item.id"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item?.action }}
          </td>
          <td>
            {{ item?.comment }}
          </td>
          <td>
            {{ item?.created_at }}
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
