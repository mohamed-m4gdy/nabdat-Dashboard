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
} = tableHock(`patient/${parseInt(route.params.patientId as string)}/home-visits`, false, true, true)

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'DOCTOR', key: 'doctor.name' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'CREATED AT', key: 'created_at' },
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
          title: $t('Home visits'),
        }
      ]"
    />
    <PageHeader :title="$t('Home visits')" :text="$t('From here you can manage system home visits')" />
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
            {{ item.doctor?.name }}
          </td>

          <td>
            {{ item.speciality?.title }}
          </td>
          <td>
            {{ item.address }}
          </td>
          <td>
            {{ item.mobile }}
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
                  <VListItem :to="`/patients/patients/${parseInt(route.params.patientId as string)}/visits/view/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-dots-horizontal-circle" />
                    </template>
                    <VListItemTitle>{{ $t('Home visit log') }}</VListItemTitle>
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
