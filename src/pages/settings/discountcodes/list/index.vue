<script setup lang="ts">
import ShowForm from './components/show.vue'
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'
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
} = tableHock('discount/codes')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'COUNTRY', key: 'country.name', sortable: false },
  { title: 'CODE', key: 'code' },
  { title: 'value', key: 'value' },
  { title: 'LIMIT', key: 'limit' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const { item, loading: showLoading, show, close, showDialog } = showHock('discount/codes/')

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
          title: $t('Discount codes')
        }
      ]"
    />
    <PageHeader
      :title="$t('Discount codes')"
      :text="$t('From here you can manage system Discount codes')"
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
        add-path="settings-discountcodes-add"
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
          v-for="i in items"
          :key="i.id"
        >
          <td>
            {{ i.id }}
          </td>
          <td>
            {{ i.name }}
          </td>
          <td>
            {{ i.country?.name }}
          </td>
          <td>
            {{ i.code }}
          </td>
          <td>
            {{ i.value }}<span v-if="i.type === 'perc'">%</span>
          </td>
          <td>
            {{ i.limit }}
          </td>
          <td>
            <VChip
              v-if="i.status"
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
                  <VListItem :to="`/settings/discountcodes/edit/${i.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>

                  <VListItem @click="openDelete(i.id)">
                    <template #prepend>
                      <VIcon icon="mdi-delete-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Delete') }}</VListItemTitle>
                  </VListItem>

                  <VListItem @click="show(i.id)">
                    <template #prepend>
                      <VIcon icon="mdi-show-outline" />
                    </template>
                    <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <!-- Show Dialog -->
    <ShowForm
      v-model="showDialog"
      :item="item"
      :loading="showLoading"
      @close="close"
    />
  </div>
</template>
