<script setup lang="ts">
import ShowForm from './components/show.vue'
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'
import formHock from '@/helpers/formHock'

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
} = tableHock('payGateOffline')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'LOGO', key: 'logo' },
  { title: 'TITLE', key: 'title' },
  { title: 'CODE', key: 'code' },
  { title: 'FEES', key: 'fees' },
  { title: 'REFERNCE NUMBER', key: 'refernce_number' },
  { title: 'STATUS', key: 'is_active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const showUpdateStatus = async (id: number, status: boolean) => {
  const initialItem = { is_active: !status }
  const rules = {}
  const { saveItem } = formHock<any>(`payGateOffline/updateStatus/${id}`, 'patch', initialItem, rules)
  await saveItem()
}



// Show form
const { item: showItems, loading: showLoading, show, close, showDialog } = showHock('payGateOffline/')
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
          title: $t('Payment offline')
        }
      ]"
    />
    <PageHeader
      :title="$t('Payment offline')"
      :text="$t('From here you can manage system Payment offline')"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        add-path="settings-paymentoffline-add"
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
              <VImg :src="item.logo" />
            </VAvatar>
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.code }}
          </td>
          <td>
            {{ item.fees }}
          </td>
          <td>
            {{ item.refernce_number }}
          </td>
          <td>
            <VSwitch
                v-model="item.is_active"
                :label="item.is_active ? $t('Active') : $t('Not active')"
                @click="showUpdateStatus(item.id, item.is_active)"
                inset
              />
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
                  <VListItem :to="`/settings/paymentoffline/edit/${item.id}`">
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
      :item="showItems"
      :loading="showLoading"
      @close="close"
    />
  </div>
</template>
