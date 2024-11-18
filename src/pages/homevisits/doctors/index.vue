<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'
import ShowDetails from './components/showDetails.vue'
import ApproveForm from './components/approveForm.vue'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

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
  fetchItems,
  addFilter,
  resetFilter,
} = tableHock('home-visits/doctors')

const {t : $t} = useI18n()

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'PATIENT', key: 'patient_name' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'CITY', key: 'city' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const { item, loading: ShowLoading, show: Show, close: closePatient, showDialog: ShowDialog } = showHock('home-visits/')

const approveId = ref<number>(0)
const openService = ref<boolean>(false)
const { y } = useWindowScroll()
const currentPosition = ref<number>()

const closeApproveForm = () => {
  approveId.value = 0
  fetchItems()
  openService.value = false
  fetchItems()
  setTimeout(() => {
    window.scroll({top: currentPosition.value})
  }, 200)
}

const close = () => {
  approveId.value = 0
  openService.value = false
  setTimeout(() => {
    window.scroll({top: currentPosition.value})
  }, 200)
}

const openForm = () =>  {
  currentPosition.value = y.value
  window.scrollTo({ top: 0})
  openService.value = true
}

const showApproveForm = (id: number) => {
  openForm()
  approveId.value = id
}

const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'country_id',
    path: 'country?filters[home_visit_allowed]=1',
    change: (value: any) => {
      options.value.filters.city_id = null
      options.value.filters.government_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Governorate',
    prop: 'government_id',
    path: 'government?filters[home_visit_allowed]=1',
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
    path: 'city?filters[home_visit_allowed]=1',
    dissabled: true,
    filterVal: '',
    filterName: 'government_id'
  },
  {
    type: inputTypes.search,
    title: 'Speciality',
    prop: 'speciality_id',
    path: 'specialities',
    titleParam: 'title',
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
          title: $t('Home visits doctors'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Home visits doctors')"
      :text="$t('From here you can manage system home visits doctors')"
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
            {{ item?.patient_name }}
          </td>
          <td>
            {{ item?.speciality?.title }}
          </td>
          <td>
            {{ item?.address }}
          </td>
          <td>
            {{ item?.city }}
          </td>
          <td>
            {{ item?.mobile }}
          </td>
          <td>
            {{ item?.created_at }}
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
                  <VListItem :to="`/homevisits/doctors/log/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-math-log" />
                    </template>
                    <VListItemTitle>{{ $t('Logs') }}</VListItemTitle>
                  </VListItem>
                  <VListItem @click="showApproveForm(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-check-decagram-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Update status') }}</VListItemTitle>
                  </VListItem>
                  <VListItem @click="Show(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-eye" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <ShowDetails v-model="ShowDialog" @close="closePatient" :item="item" :loading="ShowLoading" />
    <ApproveForm
      v-if="openService"
      :approve-id="approveId"
      @update-form="closeApproveForm"
      @close="close"
    />
  </div>
</template>
