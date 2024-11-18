<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

// index table model
import Table from '@/components/table/index.vue'

const {t : $t} = useI18n()

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
  addFilter,
  resetFilter,
} = tableHock('doctor/ratings')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'DOCTOR', key: 'doctor' },
  { title: 'USER', key: 'user' },
  { title: 'WORKSPACE', key: 'workspace' },
  { title: 'RATE', key: 'rating' },
  { title: 'CREATED AT', key: 'created_at' },
]


const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Doctors',
    prop: 'doctor_id',
    path: 'doctors',
  },
  {
    type: inputTypes.search,
    title: 'Workspace',
    prop: 'workspace_id',
    path: 'workspace',
    titleParam: 'title',
  },
  {
    type: inputTypes.search,
    title: 'User',
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
          title: $t('Doctor Rating')
        }
      ]"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @add-filter="addFilter"
      @reset-filter="resetFilter"
    />
    <PageHeader
      :title="$t('Doctor Rating')"
      :text="$t('From here you can manage system unassigned doctors')"
    />
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
            {{ item.doctor?.name }}
          </td>
          <td class="no-wrap">
            {{ item.user?.name }}
          </td>
          <td class="no-wrap">
            {{ item.workspace?.title }}
          </td>
          <td>
            <VRating
              readonly
              :model-value="item.rating"
              hover
              :size="19"
            />
          </td>
          <td class="no-wrap">
            {{ item.created_at }}
          </td>
        </tr>
      </Table>
    </VCard>
    <!-- <EndOfServices
      v-if="serviceId"
      :service-id="serviceId"
      @close="close"
      @update-form="closeForm"
    /> -->
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
}
</style>
