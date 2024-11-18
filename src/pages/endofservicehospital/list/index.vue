<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// index table model
import Table from '@/components/table/index.vue'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

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
} = tableHock('hospitals/end-of-service/list')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'HOSPITAL', key: 'hospital.name' },
  { title: 'CREATED BY', key: 'created_by.name' },
  { title: 'COMMENT', key: 'comment' },
  { title: 'CREATED AT', key: 'created_at' },
]


const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'country_id',
    path: 'country',
    change: (value: any) => {
      options.value.filters.city_id = null
      options.value.filters.government_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Governorate',
    prop: 'government_id',
    path: 'government',
    dissabled: true,
    filterVal: '',
    filterName: 'country_id',
    change: (value: any) => {
      options.value.filters.city_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'City',
    prop: 'city_id',
    path: 'city',
    dissabled: true,
    filterVal: '',
    filterName: 'government_id'
  },
  {
    type: inputTypes.search,
    title: 'Organization',
    prop: 'organization_id',
    path: 'hospitals',
    change: (value: any) => {
      console.log(value.value)
      options.value.filters.branch_id = null
      options.value.filters.speciality_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Branch',
    prop: 'branch_id',
    path: 'branches',
    dissabled: true,
    filterVal: '',
    filterName: 'organization_id',
    change: (value: any) => {
      options.value.filters.speciality_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Speciality',
    prop: 'speciality_id',
    path: 'specialities',
    titleParam: 'title',
    dissabled: true,
    filterVal: '',
    filterName: 'branch_id'
  },

])

// countries, governorates, cities filters by select
watch(options.value, value => {
  // Enable governorate after choosing country and get the value of country
  if(value.filters.country_id) {
    fillters.value[1].filterVal = value.filters.country_id
    fillters.value[1].dissabled = false
  } else {
    fillters.value[1].dissabled = true
  }
  // Enable city after choosing governorates and get the value of governorates
  if(value.filters.government_id) {
    fillters.value[2].filterVal = value.filters.government_id
    fillters.value[2].dissabled = false
  } else {
    fillters.value[2].dissabled = true
  }
  if(value.filters.organization_id) {
    fillters.value[4].filterVal = value.filters.organization_id
    fillters.value[4].dissabled = false
  } else {
    fillters.value[4].dissabled = true
  }
  if(value.filters.branch_id) {
    fillters.value[5].filterVal = value.filters.branch_id
    fillters.value[5].dissabled = false
  } else {
    fillters.value[5].dissabled = true
  }
}, {deep: true})

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
          title: $t('Hospital End Of Service List')
        }
      ]"
    />
    <PageHeader
      :title="$t('Hospital End Of Service List')"
      :text="$t('From here you can manage system unassigned doctors')"
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
            {{ item.hospital.name }}
          </td>
          <td class="no-wrap">
            {{ item.created_by?.name }}
          </td>
          <td class="no-wrap">
            {{ item.comment }}
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
