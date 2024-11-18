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
  items,
  loading,
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
  addFilter,
  resetFilter,
} = tableHock('city')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'GOVERNORATE', key: 'government.name', sortable: false },
  { title: 'LAT', key: 'lat' },
  { title: 'LON', key: 'lon' },
  { title: 'STATUS', key: 'status' },
  { title: 'HOME VISIT', key: 'home_visit_allowed' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.search,
    title: 'Governorates',
    prop: 'government_id',
    path: 'government',
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
          title: $t('Cities'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Cities')"
      :text="$t('From here you can manage system cities')"
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
        add-path="settings-cities-add"
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
            {{ item.name }}
          </td>
          <td>
            {{ item.government?.name }}
          </td>
          <td>
            {{ item.lat }}
          </td>
          <td>
            {{ item.lon }}
          </td>
          <td>
            <VChip
              v-if="item.status"
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
            <VChip
              v-if="item.home_visit_allowed"
              color="success"
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Available') }}
            </VChip>
            <VChip
              v-else
              color="error"
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Not Available') }}
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
                  <VListItem :to="`/settings/cities/edit/${item.id}`">
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
