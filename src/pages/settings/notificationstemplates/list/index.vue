<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
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
  addFilter,
  resetFilter,
} = tableHock('notification_templates')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TITLE', key: 'title' },
  { title: 'TYPE', key: 'type' },
  { title: 'CODE', key: 'code' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.select,
    title: 'Type',
    prop: 'type',
    cols: 4,
    items: [
      {
        key: 'doctor_app',
        value: $t('Doctor app'),
      },
      {
        key: 'patient_app',
        value: $t('Patient app'),
      },
      {
        key: 'mcp',
        value: $t('MCP'),
      },
      {
        key: 'hcp',
        value: $t('HCP'),
      },
    ],
  },
  {
    type: inputTypes.select,
    title: 'Code',
    prop: 'code',
    cols: 4,
    items: [
      {
        key: 'new_booking',
        value: $t('New booking'),
      },
      {
        key: 'booking_modify',
        value: $t('Modify booking'),
      },
      {
        key: 'booking_cancel',
        value: $t('Cancel booking'),
      },
      {
        key: 'booking_done',
        value: $t('Done booking'),
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
          title: $t('Notifications Templates'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Notifications Templates')"
      :text="$t('From here you can manage system notifications templates')"
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
            {{ item.code }}
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
                  <VListItem :to="`/settings/notificationstemplates/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
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
