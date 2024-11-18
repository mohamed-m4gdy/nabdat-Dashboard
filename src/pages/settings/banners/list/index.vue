<script setup lang="ts">
import ShowForm from './components/show.vue'
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'

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
} = tableHock('banners')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'IMAGE', key: 'image' },
  { title: 'DESCRIPTION', key: 'description' },
  { title: 'URL', key: 'url' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// Show form
const { item, loading: showLoading, show, close, showDialog } = showHock('banners/')
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
          title: $t('Banners')
        }
      ]"
    />
    <PageHeader
      :title="$t('Banners')"
      :text="$t('From here you can manage system banners')"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        add-path="settings-banners-add"
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
            <VAvatar
              size="34"
              class="me-3"
            >
              <VImg :src="item.image.en" />
            </VAvatar>
          </td>
          <td>
            {{ item.description }}
          </td>
          <td>
            {{ item.url }}
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
                  <VListItem @click="show(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-show-outline" />
                    </template>
                    <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/settings/banners/edit/${item.id}`">
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
    <!-- Show Dialog -->
    <ShowForm
      v-model="showDialog"
      :item="item"
      :loading="showLoading"
      @close="close"
    />
  </div>
</template>
