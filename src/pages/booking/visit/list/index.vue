<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

const {t : $t} = useI18n()


interface booking {
  id: number
  patient_name: string
  patient_id: number
  doctor_name: string
  is_booking: string
  doctor_id: number
  speciality: {
    id: number
    title: string
  }
  city: {
    id: number
    name: string
  }
  type: string
  booking_date: string
  status: {
    id: number
    title: string
  }
  created_at: string
}



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
} = tableHock<booking>('bookings?filters[calendar_type]=visit')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Patient name', key: 'patient_id' },
  { title: 'Doctor name', key: 'doctor_id' },
  { title: 'TYPE', key: 'is_booking' },
  { title: 'Speciality', key: 'speciality_id' },
  { title: 'City', key: 'city_id' },
  { title: 'Booking date', key: 'booking_date' },
  { title: 'Status'},
  { title: 'ACTIONS', sortable: false },
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
    title: 'Doctor',
    prop: 'doctor_id',
    path: 'doctors'
  },
  {
    type: inputTypes.search,
    title: 'Patient',
    prop: 'patient_id',
    path: 'patients',
    titleParam: 'firstname',
  },
  {
    type: inputTypes.search,
    title: 'Booking status',
    prop: 'booking_status_id',
    path: 'booking-status',
    titleParam: 'title',
  }
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
          title: $t('Bookings visit')
        }
      ]"
    />
    <PageHeader
      :title="$t('Bookings visit')"
      :text="$t('From here you can manage Bookings visit')"
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
            {{ item.patient_name }}
          </td>
          <td>
            {{ item.doctor_name }} 
          </td>
          <td>
            <div v-if="item.is_booking !== 'booking'">
              <VCardText class="py-3 px-4">
                <VIcon
                  size="30"
                  icon="mdi-account-convert-outline"
                />
              </VCardText>
  
              <!-- tooltips -->
              <VTooltip
                location="top"
                activator="parent"
              >
                {{ item.is_booking }}
              </VTooltip>
            </div>
            <div v-if="item.is_booking === 'booking'">
              <VCardText class="py-3 px-4">
                <VIcon
                  size="30"
                  icon="ri-bookmark-line"
                />
              </VCardText>
  
              <!-- tooltips -->
              <VTooltip
                location="top"
                activator="parent"
              >
                {{ item.is_booking }}
              </VTooltip>
            </div>
          </td>
          <td>
            {{ item.speciality?.title }}
          </td>
          <td>
            {{ item.city?.name }}
          </td>
          <td>
            {{ item.booking_date }}
          </td>
          <td>
            {{ item.status?.title }}
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
                  <VListItem :to="`/booking/visit/show/${item.id}`" >
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
  </div>
</template>
