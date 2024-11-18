<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
import ShowForm from './components/show.vue'
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'

const {
  changePage,
  changeSearch,
  error,
  items,
  loading,
  options,
  sort,
  fetchItems,
  totalItems,
  totalPages,
} = tableHock('doctor/reviews')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'DOCTOR', key: 'doctor.name' },
  { title: 'RATING', key: 'rating' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'SHOW IDENTITY', key: 'show_identity' },
  { title: 'APPROVE', key: 'approved' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

const { item, loading: showLoading, show, close, showDialog } = showHock('doctor/reviews/')

// approve item logic
const approveId = ref<number>(0)
const showApproveForm = (id: number) => approveId.value = id

const closeApproveForm = () => {
  approveId.value = 0
  fetchItems()
}
const closeForm = () => {
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
          title: $t('Doctor Reviews')
        }
      ]"
    />
    <PageHeader
      :title="$t('Doctor Reviews')"
      :text="$t('From here you can manage system doctor reviews')"
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
          v-for="i in items"
          :key="i.id"
        >
          <td>
            {{ i.id }}
          </td>
          <td>
            {{ i.name }}
          </td>
          <td>
            {{ i.doctor.name }}
          </td>
          <td>
            <VRating
              readonly
              :model-value="i.rating"
              hover
              :size="19"
            />
          </td>
          <td>
            {{ i.created_at }}
          </td>
          <td>
            <VChip
              v-if="i.show_identity"
              color="primary"
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Active') }}
            </VChip>
            <VChip
              v-else
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Not active') }}
            </VChip>
          </td>
          <td>
            <VChip
              v-if="i.approved"
              color="primary"
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Approved') }}
            </VChip>
            <VChip
              v-else
              class="font-weight-medium"
              size="small"
            >
              {{ $t('Pending') }}
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
                  <VListItem @click="show(i.id)">
                    <template #prepend>
                      <VIcon icon="mdi-show-outline" />
                    </template>
                    <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                  </VListItem>
                  <VListItem @click="showApproveForm(i.id)">
                    <template #prepend>
                      <VIcon icon="mdi-check-decagram-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Approve') }}</VListItemTitle>
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

    <!-- approve dialog -->
    <ApproveForm
      v-if="approveId"
      :approve-id="approveId"
      @update-form="closeApproveForm"
      @close-form="closeForm"
    />
  </div>
</template>
