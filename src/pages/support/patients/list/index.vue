<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'
import ShowForm from './components/show.vue'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

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
  addFilter,
  resetFilter,
} = tableHock('support/patient/request')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'USERNAME', key: 'patient.firstname' },
  { title: 'COMMENTS', key: 'comments' },
  { title: 'DATE', key: 'date' },
]

const { item, loading: showLoading, show, close, showDialog } = showHock('support/patient/request/')

const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Patients',
    prop: 'patient_id',
    path: 'patients',
    titleNames: ['firstname', 'lastname']
  },
])
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
          title: $t('Support patients'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Support patients')"
      :text="$t('From here you can manage system support patients')"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @add-filter="addFilter"
      @reset-filter="resetFilter"
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
            <VListItem @click="show(item.id)">
              <VListItemTitle>{{ item.patient.firstname }} {{ item.patient.lastname }}</VListItemTitle>
            </VListItem>
          </td>
          <td>
            {{ item.comments }}
          </td>
          <td>
            {{ item.date }}
          </td>
        </tr>
      </Table>
    </VCard>

    
    <!-- Show Dialog -->
    <ShowForm v-model="showDialog" @close="close" :item="item" :loading="showLoading" />
  </div>
</template>
