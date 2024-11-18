<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// get route
const route = useRoute()

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
  sort,
  totalItems,
  totalPages,
} = tableHock(`workspace`, false, true, true, {'branch_id': route.params.branchId})

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'TYPE', key: 'type' },
  { title: 'CITY', key: 'city.name' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
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
          title: $t('Hospitals'),
            link: '/hospitals/hospitals/list'
        },
        {
          title: $t('Branches'),
            link: `/hospitals/hospitals/${parseInt(route.params.hospitalId as string)}/branches/list`
        },
        {
          title: $t('Workspaces'),
        }
      ]"
    />
    <PageHeader :title="$t('Workspaces')" :text="$t('From here you can manage system workspaces')" />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :dynamic-path="`/hospitals/hospitals/${route.params.hospitalId}/branches/${route.params.branchId}/workspaces/add`"
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
            {{ item.title }}
          </td>
          <td>
            {{ item.speciality.title }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.city.name }}
          </td>
          <td>
            {{ item.address }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VChip
              :color="item.approved === 'approved' ? 'success' : item.approved === 'refused' ? 'error' : ''"
              class="font-weight-medium"
              size="small"
            >
              {{ item.approved }}
            </VChip>
          </td>
          <td>
            <VChip
              v-if="item.active"
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
                  <VListItem :to="`/hospitals/hospitals/${route.params.hospitalId}/branches/${route.params.branchId}/workspaces/${item.id}/doctors/list`">
                    <template #prepend>
                      <VIcon icon="mdi-doctor" />
                    </template>
                    <VListItemTitle>{{ $t('Doctors') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/hospitals/hospitals/${route.params.hospitalId}/branches/${route.params.branchId}/workspaces/edit/${item.id}`">
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
