<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
// import EndOfServices from './components/EndOfServices.vue'
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
} = tableHock('end-of-service/doctors/hospital', false, true, true)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'HOSPITAL', key: 'workspace' },
  { title: 'WORKSPACE', key: 'workspace' },
  { title: 'CREATED BY', key: 'created_by' },
  { title: 'CREATED AT', key: 'created_at' },
]


const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Organization',
    prop: 'organization_id',
    path: 'hospitals',
    change: (value: any) => {
      options.value.filters.branch_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Branch',
    prop: 'branch_id',
    path: 'branches',
    dissabled: true,
    filterVal: '',
    filterName: 'organization_id'
  },
])

// countries, governorates, cities filters by select
watch(options.value, value => {
  // Enable governorate after choosing country and get the value of country
  if(value.filters.organization_id) {
    fillters.value[1].filterVal = value.filters.organization_id
    fillters.value[1].dissabled = false
  } else {
    fillters.value[1].dissabled = true
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
          title: $t('DH End Of Services')
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
      :title="$t('DH End Of Services')"
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
            {{ item?.id }}
          </td>
          <td>
            {{ item?.name }}
          </td>
          <td class="no-wrap">
            {{ item.workspace?.hospital?.name }}
          </td>
          <td class="no-wrap">
            {{ item.workspace?.title }}
          </td>
          <td class="no-wrap">
            {{ item?.created_by?.name }}
          </td>
          <td class="no-wrap">
            {{ item?.created_at }}
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
}
</style>
