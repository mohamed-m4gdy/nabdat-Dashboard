<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import CostForm from '@/pages/doctorWorkspace/components/costForm/index.vue'

defineProps(['spicialtyId'])

const route = useRoute()

const {t : $t} = useI18n()

const {
  changePage,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  fetchItems,
  items,
  loading,
  options,
  sort,
  totalItems,
  openDelete,
  totalPages,
} = tableHock('workspace', false, true, true, {doctor_id: route.params.id, organization_type: 'clinic'}, false)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'CITY', key: 'city.name' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'active' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fetch items on mount
watchEffect(() => fetchItems())

const costId = ref<number>(0)
const showCostForm = (id: number) => costId.value = id
const closeCostForm = () => costId.value = 0

</script>
<template>
    <VCard>
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <h3 class="text-base font-weight-medium">   {{ $t('Clinics') }} </h3>
          <VSpacer />

          <div class="d-flex align-center flex-wrap gap-6">
            <!-- 👉 Create item -->
            <VBtn  :to="'/forms/addClinic?doctor_id=' + route.params.id + '&spicialty_id='+ spicialtyId">
              {{ $t('Create item') }}
            </VBtn>
          </div>
        </VCardText>
        <Show
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
                {{ item.title }}
            </td>
            <td>
                {{ item.speciality.title }}
            </td>
            <td>
                {{ item.city.name }}
            </td>
            <td>
                {{ item.address }}
            </td>
            <td>
                {{ item.created_at }}
            </td>
            <td>
              <VChip
                :color="item.approved === 'approved' ? 'success' : item.approved === 'refused' ? 'error' : ''"
                class="font-weight-medium"
                size="small"
              >
                {{ item.approved }}
              </VChip>
            </td>
            <td>
                <VChip
                v-if="item.active"
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
                    <VListItem @click="showCostForm(item.doctor_workspace_id)">
                      <template #prepend>
                        <VIcon icon="mdi-currency-usd" />
                      </template>
                      <VListItemTitle>{{ $t('Cost') }}</VListItemTitle>
                    </VListItem>
                    <VListItem :to="`/clinics/workspace/calender/${item.id}/${item.doctor_workspace_id}`">
                      <template #prepend>
                        <VIcon icon="mdi-calendar-blank" />
                      </template>
                      <VListItemTitle>{{ $t('Work times') }}</VListItemTitle>
                    </VListItem>
                    <VListItem :to="`/clinics/workspace/edit/${item.id}`">
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
        </Show>
        <CostForm
          v-if="costId"
          :workspace-id="costId"
          @update-form="() => {
            fetchItems();
            closeCostForm();
          }"
          @close="closeCostForm"
        />
      </VCard>
</template>
