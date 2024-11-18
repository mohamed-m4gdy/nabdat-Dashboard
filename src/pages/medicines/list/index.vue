<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
import tableHock from '@/helpers/tableHock'

const {
  changePage,
  changeSearch,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  fetchItems,
  items,
  loading,
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock('medicines')

const {t : $t} = useI18n()

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TRADE NAME', key: 'tradename' },
  { title: 'COMPANY', key: 'company' },
  { title: 'GROUP', key: 'group' },
  { title: 'FORM', key: 'form' },
  { title: 'PRICE', key: 'price' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// approve item logic
const approveId = ref<number>(0)
const openService = ref<boolean>(false)
const { y } = useWindowScroll()
const currentPosition = ref<number>()

const closeApproveForm = () => {
  approveId.value = 0
  openService.value = false
  fetchItems()
  setTimeout(() => {
    window.scroll({top: currentPosition.value})
  }, 200)
}

const openForm = () =>  {
  currentPosition.value = y.value
  window.scrollTo({ top: 0})
  openService.value = true
}

const showApproveForm = (id: number) => {
  openForm()
  approveId.value = id
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
          title: $t('Medicines'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Medicines')"
      :text="$t('From here you can manage system medicines')"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        add-path="medicines-add"
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
          <td class="no-wrap">
            {{ item.tradename }}
          </td>
          <td class="no-wrap">
            {{ item.company }}
          </td>
          <td class="no-wrap">
            {{ item.group }}
          </td>
          <td class="no-wrap">
            {{ item.form }}
          </td>
          <td class="no-wrap">
            {{ item.price }}
          </td>
          <td>
            <VChip
              v-if="item.approved"
              color="success"
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Approved') }}
            </VChip>
            <VChip
              v-else
              color="error"
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Not approved') }}
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
                  <VListItem :to="`/medicines/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>

                  <VListItem
                    v-if="!item.approved"
                    @click="showApproveForm(item.id)"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-check-decagram-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Approve') }}</VListItemTitle>
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
    <!-- approve dialog -->
    <ApproveForm
      v-if="openService"
      :approve-id="approveId"
      @close="closeApproveForm"
    />
  </div>
</template>

<style lang="scss">
.no-wrap {
  font-size: 13px;
}
</style>
