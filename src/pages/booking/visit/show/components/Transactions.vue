<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import avatar1 from '@images/avatars/avatar-1.png'
import showHock from '@/helpers/showHock'
import ShowForm from './show.vue'

const route = useRoute()

const { item, loading: showLoading, show, close, showDialog } = showHock('transactions/')

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
} = tableHock(`booking/${route.params.id}/transactions`)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'User', key: 'created_by' },
  { title: 'Total', key: 'total' },
  { title: 'Payment method', key: 'payment' },
  { title: 'Date', key: 'created_at' },
  { title: 'ACTIONS', sortable: false },
]

</script>

<template>
  <div>
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
          class="mt-3"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            <div class="d-flex">
                <VAvatar
                  size="34"
                  class="me-3 mt-2"
                >
                  <VImg :src="avatar1" />
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-sm">
                    <div class="font-weight-medium user-list-name no-wrap">
                      {{ item.created_by?.firstname + ' ' + item.created_by?.lastname }}
                    </div>
                  </h6>

                  <span class="text-xs text-medium-emphasis">{{ item.created_by?.email }}</span>
                  <span class="text-xs text-medium-emphasis">{{ item.created_by?.mobile }}</span>
                </div>
              </div>
          </td>
          <td class="no-wrap">
            {{ item.total }} {{ item.currency?.name }}
          </td>

          <td class="no-wrap">
            {{ item.payment.title }}
          </td>
          <td class="no-wrap">
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
                  <VListItem @click="show(item.id)" >
                    <template #prepend>
                      <VIcon icon="mdi-eye" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
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
<style scoped>
.no-wrap {
  text-wrap: nowrap;
}
</style>
