<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import CostForm from './components/index.vue'
import Details from './components/Details.vue'
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
  options,
  sort,
  totalItems,
  totalPages,
  addFilter,
  resetFilter,
} = tableHock('settlements?type=clinic', false, true, true)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ORGANIZATION NAME', key: 'organization_name' },
  { title: 'AMOUNT', key: 'amount' },
  { title: 'DATE', key: 'date' },
  { title: 'TYPE', key: 'type' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const takeActionId = ref<number>(0)
const openService = ref<boolean>(false)
const { y } = useWindowScroll()
const currentPosition = ref<number>()

const DetailsId = ref<number>(0)
const detailsItem = ref()

const detailsForm = (id: number, item: any) => {
  DetailsId.value = id
  detailsItem.value = item
}

const close = () => DetailsId.value = 0

const closeTakeAction = () => {
  takeActionId.value = 0
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

const takeAction = (id: number) => {
  openForm()
  takeActionId.value = id
}

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.date,
    title: 'Date',
    prop: 'date',
    noKeyFilter: true
  },
  {
    type: inputTypes.select,
    title: 'Status',
    prop: 'status',
    noKeyFilter: true,
    cols: 4,
    items: [
      {
        key: 'approved',
        value: $t('Approved'),
      },
      {
        key: 'pending',
        value: $t('Pending'),
      },
      {
        key: 'refused',
        value: $t('Refused'),
      },
    ],
  },
]
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
          title: $t('Doctors settlement')
        }
      ]"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @addFilter="addFilter"
      @resetFilter="resetFilter"
    />
    <PageHeader
      :title="$t('Doctors settlement')"
      :text="$t('From here you can manage system doctors settlement')"
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
          <td class="no-wrap">
            {{ item.organization_name }}
          </td>
          <td class="no-wrap">
            {{ item.amount }}
          </td>
          <td class="no-wrap">
            {{ item.date }}
          </td>
          <td class="no-wrap">
            {{ item.type }}
          </td>
          <td>
            <VChip
              :color="item.status === 'approved' ? 'success' : item.status === 'refused' ? 'error' : ''"
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
                  <VListItem @click="detailsForm(item.id, item)" v-if="item.type === 'withdrawal' && (item.status === 'approved' || item.status === 'refused')">
                    <template #prepend>
                      <VIcon icon="mdi-eye-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Details') }}</VListItemTitle>
                  </VListItem>
                  <VListItem @click="takeAction(item.id)" v-if="item.status === 'pending'">
                    <template #prepend>
                      <VIcon icon="mdi-check-decagram-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Approve') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <!-- approve dialog -->
    <CostForm
      v-if="openService"
      :takeActionId="takeActionId"
      @update-form="closeTakeAction"
      @close="closeTakeAction"
    />
    
    <Details
      v-if="DetailsId"
      :service-id="DetailsId"
      :item="detailsItem"
      @close="close"
    />
  </div>
</template>
