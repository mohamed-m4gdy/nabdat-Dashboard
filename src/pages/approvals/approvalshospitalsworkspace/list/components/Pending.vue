<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
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
} = tableHock(`approvals?filters[action][]=create_hospital_workspace&filters[action][]=update_hospital_workspace&filters[model_type]=App\\Models\\Workspace`, false, true, true)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'HOSPITAL', key: 'model_data.hospital.name' },
  { title: 'BRANCH', key: 'model_data.branch.name' },
  { title: 'ACTION', key: 'action' },
  { title: 'TYPE', key: 'type' },
  { title: 'STATUS', key: 'status' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'hospital_workspace_country_id',
    path: 'country',
    change: (value: any) => {
      options.value.filters.hospital_workspace_city_id = null
      options.value.filters.hospital_workspace_government_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Governorate',
    prop: 'hospital_workspace_government_id',
    path: 'government',
    dissabled: true,
    filterVal: '',
    filterName: 'country_id',
    change: (value: any) => {
      options.value.filters.hospital_workspace_city_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'City',
    prop: 'hospital_workspace_city_id',
    path: 'city',
    dissabled: true,
    filterVal: '',
    filterName: 'government_id'
  },
  {
    type: inputTypes.select,
    title: 'Action',
    prop: 'action',
    cols: 4,
    items: [
      {
        key: 'create_hospital_workspace',
        value: $t('New'),
      },
      {
        key: 'update_hospital_workspace',
        value: $t('Update'),
      },
    ],
  },
  {
    type: inputTypes.search,
    title: 'Organization',
    prop: 'hospital_workspace_organization_id',
    path: 'hospitals',
  },
  {
    type: inputTypes.search,
    title: 'Specialities',
    titleParam: 'title',
    prop: 'hospital_workspace_speciality_id',
    path: 'specialities',
  },
  {
    type: inputTypes.search,
    title: 'Workspace',
    prop: 'workspace_id',
    path: 'workspace',
    titleParam: 'title',
  },
])

// countries, governorates, cities filters by select
watch(options.value, value => {
  // Enable governorate after choosing country and get the value of country
  if(value.filters.hospital_workspace_country_id) {
    fillters.value[1].filterVal = value.filters.hospital_workspace_country_id
    fillters.value[1].dissabled = false
  } else {
    fillters.value[1].dissabled = true
  }
  // Enable city after choosing governorates and get the value of governorates
  if(value.filters.hospital_workspace_government_id) {
    fillters.value[2].filterVal = value.filters.hospital_workspace_government_id
    fillters.value[2].dissabled = false
  } else {
    fillters.value[2].dissabled = true
  }
}, {deep: true})
</script>

<template>
  <div>
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
            <VListItem :to="`/approvals/approvalshospitalsworkspace/${item.id}/data/list`">
              <VListItemTitle>{{ item.name }}</VListItemTitle>
            </VListItem>
          </td>
          <td>
            {{ item.model_data.hospital.name }}
          </td>
          <td>
            {{ item.model_data.branch.name }}
          </td>
          <td>
            <span v-if="item.action === 'create_hospital_workspace'">
              {{ $t('New') }}
            </span>
            <span v-if="item.action === 'update_hospital_workspace'">
              {{ $t('Update') }}
            </span>
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            <VChip
              :color="item.status === 'approved' ? 'success' : item.status === 'canceled' ? 'error' : ''"
              class="font-weight-medium"
              size="small"
            >
              {{ item.status }}
            </VChip>
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VBtn
              icon
              variant="text"
              size="small"
              color="medium-emphasis"
            >
              <VIcon
                size="24"
                icon="mdi-dots-vertical"
              />
              <VMenu activator="parent">
                <VList>
                  <VListItem :to="`/approvals/approvalshospitalsworkspace/${item.id}/data/list`">
                    <template #prepend>
                      <VIcon icon="mdi-chart-donut" />
                    </template>
                    <VListItemTitle>{{ $t('Data & approve') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
