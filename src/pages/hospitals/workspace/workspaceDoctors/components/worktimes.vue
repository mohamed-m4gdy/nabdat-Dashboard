<script setup lang="ts">
  import tableHock from '@/helpers/tableHock'
  import avatar1 from '@images/avatars/avatar-1.png'
  import CostForm from '@/pages/doctorWorkspace/components/costForm/index.vue'
  import CreateForm from '@/pages/doctorWorkspace/components/createForm/index.vue'

  defineProps(['spicialtyId'])
  const route = useRoute();

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
    fetchItems
  } = tableHock('calendars', false, true, true, {
    workspace_id: route.params.id
  })

  // table headers
  const headers = [
    { title: 'Doctor', key: 'doctor_id' },
    { title: 'Cost', key: 'cost'},
    { title: 'Follow up cost', key: 'follow_up_cost'},
    { title: 'WAITING TIME', key: 'waiting_time'},
    { title: 'Days', key: 'days' },
    { title: 'PAY ONLINE', key: 'allow_online_pay' },
    { title: 'ACTIONS', key: 'actions', sortable: false },
  ]

  const costId = ref<number>(0)
  const showCostForm = (id: number) => costId.value = id
  const closeCostForm = () => costId.value = 0

  const sowCreate = ref<boolean>(false)
  const openCreateForm = () => sowCreate.value = true
  const closeCreateForm = () => sowCreate.value = false

</script>

<template>
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :tableTitle="$t('Workspace Doctors')"
        :loading="loading"
        :items="items"
        :options="options"
        :total-pages="totalPages"
        :total-items="totalItems"
        :error="error"
        @change-page="changePage"
        @change-search="changeSearch"
        @sort="sort"
        @openCreateForm="openCreateForm"
        :popupAdd="true"
      >
        <tr
          v-for="item in items"
          :key="item.id"
        >
          <td>
            <RouterLink :to="`/doctors/doctors/view/${item.doctor?.id}`">
              <div class="d-flex">
                <VAvatar
                  size="34"
                  class="me-3"
                >
                  <VImg :src="avatar1" />
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-sm">
                    <div class="font-weight-medium user-list-name no-wrap">
                      {{item.doctor?.name}}
                    </div>
                  </h6>

                  <span class="text-xs text-medium-emphasis">
                    {{item.doctor?.email}}
                  </span>
                </div>
              </div>
            </RouterLink>
          </td>
          <td>
            {{ item.cost }}
          </td>
          <td>
            {{ item.follow_up_cost }}
          </td>
          <td>
            {{ item.waiting_time }}
          </td>
          <td>
            {{ item.days }}
          </td>
          <td>
            <VChip
              v-if="item.allow_online_pay"
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
                  <VListItem @click="showCostForm(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-currency-usd" />
                    </template>
                    <VListItemTitle>{{ $t('Cost') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/doctorWorkspace/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-calendar-blank" />
                    </template>
                    <VListItemTitle>{{ $t('Work times') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>

      <CostForm
        v-if="costId"
        :workspace-id="costId"
        @update-form="() => {
          fetchItems();
          closeCostForm();
        }"
        @close="closeCostForm"
      />
      <CreateForm
        v-if="sowCreate"
        :spicialtyId="spicialtyId"
        @update-form="fetchItems"
        @close="closeCreateForm"
      />
    </VCard>
</template>
