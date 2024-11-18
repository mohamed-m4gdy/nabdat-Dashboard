<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

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
} = tableHock(`patient/${parseInt(route.params.patientId as string)}/home-visits/${parseInt(route.params.id as string)}/logs`, false, true, true)

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
          title: $t('Patients'),
          link: '/patients/patients/list'
        },
        {
          title: $t('Home visits'),
          link: `/patients/patients/${parseInt(route.params.patientId as string)}/visits/list`
        },
        {
          title: $t('Home visits logs'),
        }
      ]"
    />
    <PageHeader :title="$t('Home visits logs')" :text="$t('From here you can manage system home visits logs')" />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :items="items"
        :options="options"
        :total-pages="totalPages"
        :total-items="totalItems"
        :error="error"
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
            {{ item.action }}
          </td>
          <td>
            {{ item.comment }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
