<script setup lang="ts">
import ShowForm from './components/show.vue'
import ChangePassword from './components/changePassword.vue'
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'
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
  openDelete,
  options,
  fetchItems,
  sort,
  totalItems,
  totalPages,
  addFilter,
  resetFilter,
} = tableHock('admins')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'ROLE', key: 'role' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const { item, loading: showLoading, show, close, showDialog } = showHock('admins/')

const changeId = ref<number>(0)
const showChangePassword = (id: number) => changeId.value = id

const closeChangePassword = () => {
  changeId.value = 0
}

const updateForm = () => {
  changeId.value = 0
  fetchItems()
}

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'country_id',
    path: 'country',
  },
  {
    type: inputTypes.search,
    title: 'City',
    prop: 'city_id',
    path: 'city',
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
          title: $t('Admins'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Admins')"
      :text="$t('From here you can manage system admins')"
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
        add-path="security-admins-add"
        :title-header="$t('Admin')"
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
            {{ i.email }}
          </td>
          <td>
            {{ i.mobile }}
          </td>
          <td>
            {{ i.role?.name }}
          </td>
          <td>
            {{ i.created_at }}
          </td>
          <td>
            <VChip
              v-if="i.status === 'active'"
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
                  <VListItem @click="show(i.id)">
                    <template #prepend>
                      <VIcon icon="mdi-show-outline" />
                    </template>
                    <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/security/admins/edit/${i.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>
                  <VListItem @click="showChangePassword(i.id)">
                    <template #prepend>
                      <VIcon icon="mdi-lock" />
                    </template>
                    <VListItemTitle>{{ $t('Update password') }}</VListItemTitle>
                  </VListItem>
                  <VListItem @click="openDelete(i.id)">
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

    <!-- Show Dialog -->
    <ShowForm
      v-model="showDialog"
      :item="item"
      :loading="showLoading"
      @close="close"
    />

    <!-- Change Password Dialog -->
    <ChangePassword
      v-if="changeId"
      :change-id="changeId"
      @close="closeChangePassword"
      @update-form="updateForm"
    />
  </div>
</template>
