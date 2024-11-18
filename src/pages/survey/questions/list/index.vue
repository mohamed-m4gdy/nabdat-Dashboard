<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

const {t : $t} = useI18n()

// index table model
import IndexTable from '@/components/table/index.vue'

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
} = tableHock('survey-questions', false, true, true, {'survey_type' : 'setting'})

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'QUESTION', key: 'question' },
  { title: 'TYPE', key: 'type' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'REQUIRED', key: 'required' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters: filterItem[] = [
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
  }
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
          title: $t('Questions'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Questions')"
      :text="$t('From here you can manage system questions')"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @addFilter="addFilter"
      @resetFilter="resetFilter"
    />
    <VCard>
      <!-- items table -->
      <IndexTable
        :headers="headers"
        add-path="survey-questions-add"
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
            {{ item.question }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VChip
              v-if="item.required"
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
                  <VListItem :to="`/survey/questions/edit/${item.id}`">
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
      </IndexTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
