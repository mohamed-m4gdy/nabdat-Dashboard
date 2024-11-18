<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const {
  changePage,
  changeSearch,
  error,
  items,
  loading,
  openDelete,
  deleteId,
  deleteItem,
  colseDelete,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock('specialities')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ICON', key: 'icon', sortable: false },
  { title: 'TITLE', key: 'title' },
  { title: 'PARENT', key: 'parent.title', sortable: false },
  { title: 'STATUS', key: 'status' },
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
          title: $t('Specialities')
        }
      ]"
    />
    <PageHeader
      :title="$t('Specialities')"
      :text="$t('From here you can manage system specialities')"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        add-path="doctors-specialities-add"
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
            <VImg
              :src="item.icon"
              height="40"
              width="40"
            />
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.parent?.title ? item.parent?.title : '--' }}
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
                  <VListItem :to="`/doctors/specialities/edit/${item.id}`">
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

                  <VListItem :to="`/doctors/specialities/${item.id}/survey/list`">
                    <template #prepend>
                      <VIcon icon="mdi-chat-question" />
                    </template>
                    <VListItemTitle>{{ $t('Survey') }}</VListItemTitle>
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
