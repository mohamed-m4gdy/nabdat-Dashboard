<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import EndOfServices from './components/EndOfServices.vue'
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
  fetchItems,
  totalItems,
  totalPages,
  addFilter,
  resetFilter,
} = tableHock('doctors/list/end-of-service')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'WORKSPACE', key: 'workspace' },
  { title: 'BRANCH', key: 'workspace' },
  { title: 'HOSPITAL', key: 'workspace' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]


const serviceId = ref<number>(0)
const openService = ref<boolean>(false)
const { y } = useWindowScroll()
const currentPosition = ref<number>()

const closeForm = () => {
  serviceId.value = 0
  openService.value = false
  fetchItems()
  setTimeout(() => {
    window.scroll({top: currentPosition.value})
  }, 200)
}

const close = () => {
  serviceId.value = 0
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

const showEndOfServiceForm = (id: number) => {
  openForm()
  serviceId.value = id
}

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
  {
    type: inputTypes.search,
    title: 'Speciality',
    prop: 'speciality_id',
    path: 'specialities',
    titleParam: 'title',
  },
  {
    type: inputTypes.select,
    title: 'status',
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
    title: 'Approved',
    prop: 'status',
    cols: 4,
    items: [
      {
        key: 'approved',
        value: $t('Approved'),
      },
      {
        key: 'refused',
        value: $t('Refused'),
      },
      {
        key: 'pending',
        value: $t('Pending'),
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

  // Enable branch after choosing organization and get the value of organization
  if(value.filters.organization_id) {
    fillters.value[4].filterVal = value.filters.organization_id
    fillters.value[4].dissabled = false
  } else {
    fillters.value[4].dissabled = true
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
          title: $t('End of service')
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
      :title="$t('End of service')"
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
          id="scrollHear"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.name }}
          </td>
          <td class="no-wrap">
            {{ item.workspace }}
          </td>
          <td class="no-wrap">
            {{ item.branch?.name }}
          </td>
          <td class="no-wrap">
            {{ item.hospital?.name }}
          </td>
          <td class="no-wrap">
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
                  <VListItem
                    v-if="!item.approved"
                    @click="showEndOfServiceForm(item.id)"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-lock" />
                    </template>
                    <VListItemTitle>{{ $t('End of service') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <EndOfServices
      v-if="openService"
      :service-id="serviceId"
      @close="close"
      @update-form="closeForm"
    />
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
}
</style>
