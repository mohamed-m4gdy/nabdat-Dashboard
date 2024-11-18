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
} = tableHock('hospital/invitations')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'HOSPITAL NAME', key: 'organization.name' },
  { title: 'DOCTOR', key: 'doctor_name' },
  { title: 'INVITED AT', key: 'created_at' },
  { title: 'STATUS', key: 'accepted' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Organization',
    prop: 'organization_id',
    path: 'hospitals',
  },
  {
    type: inputTypes.search,
    title: 'Doctors',
    prop: 'doctor_id',
    path: 'doctors',
  },
  {
    type: inputTypes.search,
    title: 'Workspace',
    prop: 'workspace_id',
    path: 'workspace',
    titleParam: 'title',
  },
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
          title: $t('Invitations'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Hospitals invitations')"
      :text="$t('From here you can manage system hospitals invitations')"
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
          v-for="i in items"
          :key="i.id"
        >
          <td>
            {{ i.id }}
          </td>
          <td class="mt-1">
            <div class="d-flex">
              <VAvatar
                size="34"
                class="me-3"
              >
                <VImg :src="i.logo" />
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-sm">
                  <div class="font-weight-medium user-list-name no-wrap">
                    {{ i.organization.name }}
                  </div>
                </h6>
              </div>
            </div>
          </td>
          <td>
            {{ i.doctor_name }}
          </td>
          <td>
            {{ i.created_at }}
          </td>
          <td>
            <VChip
              :color="i.accepted === 'approved' ? 'success' : i.accepted === 'refused' ? 'error' : ''"
              class="font-weight-medium"
              size="small"
            >
              {{ i.accepted }}
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
                  <VListItem :to="`/hospitals/hospitalinvitations/view/${i.id}`">
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
  </div>
</template>
