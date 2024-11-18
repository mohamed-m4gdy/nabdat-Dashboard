<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

const {
  changePage,
  changeSearch,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  fetchItems,
  items,
  loading,
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
  addFilter,
  resetFilter,
} = tableHock('promotion-settings')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'PRICE', key: 'price' },
  { title: 'UNITS', key: 'units' },
  { title: 'DURATIONS', key: 'durations' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'COUNTRY', key: 'country.name' },
  { title: 'CURRENCY', key: 'currency.name' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fetch items on mount
watchEffect(() => {
  fetchItems()
})

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'country_id',
    path: 'country',
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
          title: $t('Promotions settings'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Promotions settings')"
      :text="$t('From here you can manage promotions settings')"
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
        add-path="promotions-settings-add"
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
            {{ item.price }}
          </td>
          <td>
            {{ item.units }}
          </td>
          <td>
            {{ item.durations }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            {{ item.country.name }}
          </td>
          <td>
            {{ item.currency.name }}
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
                  <VListItem :to="`/promotions/settings/edit/${item.id}`">
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
