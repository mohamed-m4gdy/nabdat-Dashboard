<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
import ShowForm from './components/show.vue'
import tableHock from '@/helpers/tableHock'
import showHock from '@/helpers/showHock'

const {
  changePage,
  changeSearch,
  error,
  fetchItems,
  items,
  loading,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock('promotion/requests')

// promotion/requests

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'DOCTOR', key: 'doctor.name' },
  { title: 'PRICE', key: 'promo_setting.price' },
  { title: 'UNITS', key: 'promo_setting.units' },
  { title: 'DURATIONS', key: 'promo_setting.durations' },
  { title: 'REPLY', key: 'reply' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fetch items on mount
watchEffect(() => {
  fetchItems()
})

const approveId = ref<number>(0)
const showApproveForm = (id: number) => approveId.value = id

const closeApproveForm = () => {
  approveId.value = 0
  fetchItems()
}

const closeForm = () => {
  approveId.value = 0
}

const { item, loading: showLoading, show, close, showDialog } = showHock('promotion/requests/')
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
          title: $t('Promotions requests'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Promotions requests')"
      :text="$t('From here you can manage system requests')"
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
          <td class="mt-1">
            <div class="d-flex">
              <VAvatar
                size="34"
                class="me-3"
              >
                <VImg :src="i.doctor.photo" />
              </VAvatar>

              <div class="d-flex flex-column">
                <h6 class="text-sm">
                  <div class="font-weight-medium user-list-name no-wrap">
                    {{ i.doctor.name }}
                  </div>
                </h6>
              </div>
            </div>
          </td>
          <td>
            {{ i.promo_setting.price }}
          </td>
          <td>
            {{ i.promo_setting.units }}
          </td>
          <td>
            {{ i.promo_setting.durations }}
          </td>
          <td>
            {{ i.reply }}
          </td>
          <td>
            <VChip
              v-if="i.approved"
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
                    <VListItemTitle>{{ $t('Approve & Reply') }}</VListItemTitle>
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
      @close="closeForm"
      @update-form="closeApproveForm"
    />
    <!-- Show Dialog -->
    <ShowForm v-model="showDialog" @close="close" :item="item" :loading="showLoading" />
  </div>
</template>
