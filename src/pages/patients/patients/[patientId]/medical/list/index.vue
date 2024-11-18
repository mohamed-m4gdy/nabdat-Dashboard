<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// get route
const route = useRoute()

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
} = tableHock(`patient/${parseInt(route.params.patientId as string)}/medical-history`, false, true, true)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'DOCTOR', key: 'doctor_name' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'INVESTIGATIONS DATE', key: 'investigation_date' },
  { title: 'CREATED BY', key: 'created_by' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]
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
          title: $t('Patients'),
          link: '/patients/patients/list'
        },
        {
          title: $t('Medical history'),
        }
      ]"
    />
    <PageHeader :title="$t('Medical history')" :text="$t('From here you can manage system Approvals medical history')" />
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
            {{ item.doctor_name }}
          </td>
          <td>
            {{ item.speciality.title }}
          </td>

          <td>
            {{ item.investigation_date }}
          </td>
          <td>
            {{ item.created_by }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VChip
              v-if="item.status === 'natural'"
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
                  <VListItem :to="`/patients/patients/${parseInt(route.params.patientId as string)}/medical/view/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
