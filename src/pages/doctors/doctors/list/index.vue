<script setup lang="ts">
import EndOfSerice from './components/EndOfService.vue'
import tableHock from '@/helpers/tableHock'
import avatar1 from '@images/avatars/avatar-1.png'
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
  fetchItems,
  addFilter,
  resetFilter,
} = tableHock('doctors')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'CREATED BY', key: 'created_by' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'CLINICS', key: 'clinics' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
// const disableCategory = ref(true)
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
    title: 'Title',
    prop: 'title_id',
    path: 'doctor_titles',
    titleParam: 'title',
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
    title: 'Organization',
    prop: 'organization_type',
    cols: 4,
    items: [
      {
        key: 'hospital',
        value: $t('Organization'),
      },
      {
        key: 'clinic',
        value: $t('Clinic'),
      },
    ],
  },
  {
    type: inputTypes.search,
    title: 'Category',
    prop: 'category_id',
    path: 'category/without-clinic',
    titleParam: 'title',
    dissabled: false
  },
  {
    type: inputTypes.select,
    title: 'Status',
    prop: 'active',
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
])

// dissable organisation 
watch(() => options.value , (value) => {fillters.value[6]['dissabled'] = value.filters.organization_type == 'clinic'}, {deep: true})

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


const endOfServiceId = ref<number>(0)
const showEndOfServiceIdForm = (id: number) => endOfServiceId.value = id

const closeForm = () => {
  endOfServiceId.value = 0
  fetchItems()
}

const close = () => {
  endOfServiceId.value = 0
}
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
          title: $t('Doctors')
        }
      ]"
    />
    <PageHeader
      :title="$t('Doctors')"
      :text="$t('From here you can manage system doctors')"
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
        add-path="doctors-doctors-add"
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
          <td class="mt-1">
            <RouterLink :to="`/doctors/doctors/view/${item.id}`">
              <div class="d-flex">
                <VAvatar
                  size="34"
                  class="me-3"
                >
                  <VImg :src="avatar1" />
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-sm">
                    <div class="font-weight-medium user-list-name no-wrap">
                      {{ item.name }}
                    </div>
                  </h6>

                  <span class="text-xs text-medium-emphasis">{{ item.email }}</span>
                </div>
              </div>
            </RouterLink>
          </td>
          <td class="no-wrap">
            {{ item.created_by }}
          </td>
          <td class="no-wrap">
            {{ item.mobile }}
          </td>
          <td class="no-wrap">
            <VListItem :to="`/doctors/doctors/list/workspaces/${item.id}`">
              <VListItemTitle> {{ item.clinics }}</VListItemTitle>
            </VListItem>
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
              v-if="item.status === 'active'"
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
                  <VListItem :to="`/doctors/doctors/view/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-eye-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/calender/list?doctor_id=${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-calendar-blank" />
                    </template>
                    <VListItemTitle>{{ $t('Calendar') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/doctors/doctors/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>

                  <VListItem @click="showEndOfServiceIdForm(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-lock" />
                    </template>
                    <VListItemTitle>{{ $t('End of serivce') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <EndOfSerice
      v-if="endOfServiceId"
      :update-id="endOfServiceId"
      @close="close"
      @update-form="closeForm"
    />
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
