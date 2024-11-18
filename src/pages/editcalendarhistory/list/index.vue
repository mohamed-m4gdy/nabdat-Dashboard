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
} = tableHock('calendar-logs')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'DOCTOR', key: 'doctor' },
  { title: 'WORKSPACE', key: 'workspace' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Doctor',
    prop: 'doctor_id',
    path: 'doctors',
  },
  // {
  //   type: inputTypes.search,
  //   title: 'Workspace',
  //   prop: 'speciality_id',
  //   path: 'specialities',
  //   titleParam: 'title',
  // },
])
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
          title: $t('Calendar Edit history')
        }
      ]"
    />
    <PageHeader
      :title="$t('Edit calendar history')"
      :text="$t('From here you can manage system edit calendar history')"
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
            {{ item.doctor.name }}
          </td>
          <td>
            {{ item.workspace.title }}
          </td>
          <td>
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
                  <VListItem :to="`/editcalendarhistory/calendarHistoryId/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-gate-not" />
                    </template>
                    <VListItemTitle>{{ $t('Log') }}</VListItemTitle>
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
