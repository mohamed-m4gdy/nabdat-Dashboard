<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const route = useRoute()

const {t : $t} = useI18n()

const {
  changePage,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  fetchItems,
  items,
  loading,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock('workspace', false, true, true, {doctor_id: route.params.id, organization_type: 'hospital'}, false)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'CITY', key: 'city.name' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fetch items on mount
watchEffect(() => fetchItems())

</script>
<template>
    <VCard>
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <div class="text-h6">
            {{ $t('Hospitals') }}
          </div>
          <VSpacer />
        </VCardText>
        <Show
          :headers="headers"
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
              <RouterLink :to="`/hospitals/workspace/workspaceDoctors/${item.id}`" >
                {{ item.title }}
              </RouterLink>
            </td>
            <td>
                {{ item.speciality.title }}
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
                    <VListItem :to="`/hospitals/workspace/workspaceDoctors/${item.id}`">
                      <template #prepend>
                        <VIcon icon="mdi-eye-outline" />
                      </template>
                      <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
          </td>
          </tr>
        </Show>
      </VCard>
</template>
