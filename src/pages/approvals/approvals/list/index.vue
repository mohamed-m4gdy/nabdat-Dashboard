<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
import tableHock from '@/helpers/tableHock'

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
  fetchItems,
} = tableHock('approvals')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'ACTION', key: 'action' },
  { title: 'TYPE', key: 'type' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const approveId = ref<number>(0)
const showApproveForm = (id: number) => approveId.value = id

const closeApproveForm = () => {
  approveId.value = 0
  fetchItems()
}

const close = () => {
  approveId.value = 0
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
          title: $t('Approvals'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Approvals')"
      :text="$t('From here you can manage system approvals')"
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
          v-for="item in items"
          :key="item.id"
        >
          <td>
            {{ item.id }}
          </td>
          <td>
            {{ item.action }}
          </td>
          <td>
            {{ item.type }}
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
                  <VListItem @click="showApproveForm(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-check-decagram-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Approve') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/approvals/approvals/${item.id}/data/list`">
                    <template #prepend>
                      <VIcon icon="mdi-chart-donut" />
                    </template>
                    <VListItemTitle>{{ $t('Data & logs') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
    <!-- approve dialog -->
    <ApproveForm
      v-if="approveId"
      :approve-id="approveId"
      @update-form="closeApproveForm"
      @close="close"
    />
  </div>
</template>
