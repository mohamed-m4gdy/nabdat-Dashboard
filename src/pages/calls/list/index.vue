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
} = tableHock('calls')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'DOCTOR', key: 'doctor_name' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'COST', key: 'cost' },
  { title: 'DISCOUNT CODE', key: 'accept_discount_code' },
  { title: 'VIDEO', key: 'allow_video' },
  { title: 'STATUS', key: 'active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.search,
    title: 'Doctors',
    prop: 'doctor_id',
    path: 'doctors',
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
    title: 'Discount code',
    prop: 'accept_discount_code',
    cols: 4,
    items: [
      {
        key: 'true',
        value: $t('Available'),
      },
      {
        key: 'false',
        value: $t('Not Available'),
      },
    ],
  },
  {
    type: inputTypes.select,
    title: 'Status',
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
            {{ item?.id }}
          </td>
          <td>
            {{ item?.doctor_name }}
          </td>
          <td>
            {{ item?.calling_code }}{{ item?.mobile }}
          </td>
          <td>
            {{ item?.cost }}
          </td>
          <td>
            <VChip
              v-if="item?.accept_discount_code"
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
            <VChip
              v-if="item?.allow_video"
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
            <VChip
              v-if="item?.active"
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
              {{ $t('Not Active') }}
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
                  <VList>
                  <VListItem :to="`/calls/calender/${item.doctor_workspace_id}`">
                    <template #prepend>
                      <VIcon icon="mdi-calendar" />
                    </template>
                    <VListItemTitle>{{ $t('Calendar') }}</VListItemTitle>
                  </VListItem>
                </VList>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
