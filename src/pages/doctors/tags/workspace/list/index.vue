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
} = tableHock('tag/workspace', false, true, true, {}, false, 'tags')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ICON', key: 'icon', sortable: false },
  { title: 'TITLE', key: 'title' },
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
            title: $t('Workspace Tags')
          }
        ]"
      />
    <PageHeader
      :title="$t('Workspace Tags')"
      :text="$t('From here you can manage system workspace tags')"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        add-path="doctors-tags-workspace-add"
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
                  <VListItem :to="`/doctors/tags/workspace/edit/${item.id}`">
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
