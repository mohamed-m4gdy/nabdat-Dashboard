<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import UpdateForm from './components/UpdateForm.vue'
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
  fetchItems,
  addFilter,
  resetFilter,
} = tableHock('price-types')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TITLE', key: 'title' },
  { title: 'TYPE', key: 'type' },
  { title: 'VALUE', key: 'value' },
  { title: 'CODE', key: 'code' },
  { title: 'BOOKING TYPE', key: 'booking_type' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]



// approve item logic
const updateId = ref<number>(0)
const showUpdateForm = (id: number) => updateId.value = id

const closeForm = () => {
  updateId.value = 0
  fetchItems()
}

const close = () => {
  updateId.value = 0
}


// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'country_id',
    path: 'country',
    noKeyFilter: true
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
          title: $t('Commisions & Taxes')
        }
      ]"
    />
    <PageHeader
      :title="$t('Commisions & Taxes')"
      :text="$t('From hear you can manage system commisions & taxes')"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @addFilter="addFilter"
      @resetFilter="resetFilter"
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
            {{ item.title }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.value }}
          </td>
          <td>
            {{ item.code }}
          </td>
          <td>
            {{ item.booking_type }}
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
                    @click="showUpdateForm(item.id)"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-lock" />
                    </template>
                    <VListItemTitle>{{ $t('Update') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <UpdateForm
      v-if="updateId"
      :update-id="updateId"
      @close="close"
      @update-form="closeForm"
    />
  </div>
</template>
