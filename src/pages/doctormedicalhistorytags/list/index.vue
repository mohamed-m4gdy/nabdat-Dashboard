<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import ApproveForm from './components/approve.vue';
// index table model
import Table from '@/components/table/index.vue'

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
  fetchItems,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`medical-history-tags`, false, true, true, {'approved': false})

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'doctor' },
  { title: 'TITLE', key: 'title' },
  { title: 'SPECIALITY', key: 'doctor' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]


// approve item logic
const approveId = ref<number>(0)
const showApproveForm = (id: number) => approveId.value = id


const closeForm = () => {
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
          title: $t('Doctor Medical history tags')
        }
      ]"
    />
    <PageHeader
      :title="$t('Doctor Medical History Tags')"
      :text="$t('From here you can manage system doctor medical history tags')"
    />
    <VCard>
      <!-- items table -->
      <Table
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
            {{ item.doctor.name }}
          </td>
          <td>
            {{ item.title }}
          </td>
          <td>
            {{ item.doctor.specialities[0]?.title }}
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
                  <VListItem :to="`/doctormedicalhistorytags/edit/${item.id}`">
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
    
    <ApproveForm
      v-if="approveId"
      :update-id="approveId"
      @close="close"
      @update-form="closeForm"
    />
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
