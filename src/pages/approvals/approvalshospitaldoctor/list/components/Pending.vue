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
} = tableHock(`approvals?filters[model_type]=App\\Models\\Doctor&filters[action]=create_hospital_doctor`, false, true, true)

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
    prop: 'doctor_country_id',
    path: 'country',
    change: (value: any) => {
      options.value.filters.doctor_city_id = null
      options.value.filters.doctor_government_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Governorate',
    prop: 'doctor_government_id',
    path: 'government',
    dissabled: true,
    filterVal: '',
    filterName: 'country_id',
    change: (value: any) => {
      options.value.filters.doctor_city_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'City',
    prop: 'doctor_city_id',
    path: 'city',
    dissabled: true,
    filterVal: '',
    filterName: 'government_id'
  },
  {
    type: inputTypes.search,
    title: 'Doctor',
    prop: 'doctor_id',
    path: 'doctors',
  },
  {
    type: inputTypes.search,
    title: 'Organization',
    prop: 'doctor_organization_id',
    path: 'hospitals',
  },
  {
    type: inputTypes.search,
    title: 'Specialities',
    titleParam: 'title',
    prop: 'doctor_speciality_id',
    path: 'specialities',
  },
])

// countries, governorates, cities filters by select
watch(options.value, value => {
  // Enable governorate after choosing country and get the value of country
  if(value.filters.doctor_country_id) {
    fillters.value[1].filterVal = value.filters.doctor_country_id
    fillters.value[1].dissabled = false
  } else {
    fillters.value[1].dissabled = true
  }
  // Enable city after choosing governorates and get the value of governorates
  if(value.filters.doctor_government_id) {
    fillters.value[2].filterVal = value.filters.doctor_government_id
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
            <VListItem :to="`/approvals/approvalshospitaldoctor/${item.id}/data/list`">
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
            <span v-if="item.action === 'create_hospital_doctor'">
              {{ $t('New') }}
            </span>
            <span v-if="item.action === 'update_hospital_doctor'">
              {{ $t('Update') }}
            </span>
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.created_at }}
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
                  <VListItem :to="`/approvals/approvalshospitaldoctor/${item.id}/data/list`">
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
