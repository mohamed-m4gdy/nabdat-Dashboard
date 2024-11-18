<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
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
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
  addFilter,
  resetFilter,
} = tableHock('workspace', false, true, true, { organization_type: 'hospital' })

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'ORGANIZATION', key: 'organization' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'CITY', key: 'city.name' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
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
  },
  {
    type: inputTypes.search,
    title: 'Doctor',
    prop: 'doctor_id',
    path: 'doctors',
  },
  {
    type: inputTypes.search,
    title: 'Speciality',
    prop: 'speciality_id',
    path: 'specialities',
    titleParam: 'title',
  },
  {
    type: inputTypes.select,
    title: 'Status',
    prop: 'status',
    cols: 4,
    items: [
      {
        key: 'true',
        value: $t('Active'),
      },
      {
        key: 'false',
        value: $t('Not active'),
      },
    ],
  },
  {
    type: inputTypes.select,
    title: 'Accept discount code',
    prop: 'accept_discount_code',
    cols: 4,
    items: [
      {
        key: 'true',
        value: $t('Active'),
      },
      {
        key: 'false',
        value: $t('Not active'),
      },
    ],
  },
  {
    type: inputTypes.select,
    title: 'Entry type',
    prop: 'first_come',
    cols: 4,
    items: [
      {
        key: 'true',
        value: $t('First come first served'),
      },
      {
        key: 'false',
        value: $t('On a specific date'),
      },
    ],
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
          title: $t('Hospitals workspace'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Hospitals workspace')"
      :text="$t('From here you can manage system hospitals workspace')"
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
        add-path="hospitals-workspace-add"
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
            {{ item.title }}
          </td>
          <td>
            {{ item?.organization?.name }}
          </td>
          <td>
            {{ item.speciality.title }}
          </td>
          <td>
            {{ item.city.name }}
          </td>
          <td>
            {{ item.address }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VChip
              :color="item.approved === 'approved' ? 'success' : item.approved === 'refused' ? 'error' : ''"
              class="font-weight-medium"
              size="small"
            >
              {{ item.approved }}
            </VChip>
          </td>
          <td>
            <VChip
              v-if="item.active"
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
                  <VListItem :to="`/hospitals/workspace/workspaceDoctors/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-doctor" />
                    </template>
                    <VListItemTitle>{{ $t('Doctors') }}</VListItemTitle>
                  </VListItem>

                  <VListItem :to="`/hospitals/workspace/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>

                  <VListItem @click="openDelete(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-delete-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Delete') }}</VListItemTitle>
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
