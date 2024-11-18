<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import formHock from '@/helpers/formHock'

const {t : $t} = useI18n()

// get route
const route = useRoute()

const {
  changePage,
  changeSearch,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  items,
  fetchItems,
  loading,
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`branches`, false, true, true, {'organization_id': route.params.hospitalId})

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'ORGANIZATION', key: 'organization.name' },
  { title: 'MAIN', key: 'main' },
  { title: 'CITY', key: 'city.name' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const updateMainBranch = async (id: number) => {
  const initialItem = { organization_id: route.params.hospitalId }
  const rules = {}
  const { saveItem } = formHock<any>(`branch/${id}/set-main`, 'add', initialItem, rules)
  await saveItem()
  fetchItems()
}
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
        }
      ]"
    />
    <PageHeader :title="$t('Branches')" :text="$t('From here you can manage system branches')" />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :delete-id="deleteId"
        :dynamic-path="`/hospitals/hospitals/${route.params.hospitalId}/branches/add`"
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
            {{ item.organization.name }}
          </td>
          <td>
            <div class="ms-3">{{ item.main ? $t('Yes') : $t('No') }}</div>
            <VSwitch
                :disabled="item.main"
                v-model="item.main"
                @click="updateMainBranch(item.id)"
                inset
              />
          </td>
          <td>
            {{ item.city.name }}
          </td>
          <td>
            {{ item.address }}
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
                  <VListItem :to="`/hospitals/hospitals/${route.params.hospitalId}/branches/view/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-eye-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/hospitals/hospitals/${route.params.hospitalId}/branches/${item.id}/workspaces/list`">
                    <template #prepend>
                      <VIcon icon="mdi-briefcase" />
                    </template>
                    <VListItemTitle>{{ $t('Workspaces') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/hospitals/hospitals/${route.params.hospitalId}/branches/edit/${item.id}`">
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
