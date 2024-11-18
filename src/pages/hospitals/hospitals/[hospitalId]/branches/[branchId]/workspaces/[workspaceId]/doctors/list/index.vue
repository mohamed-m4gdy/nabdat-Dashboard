<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// get route
const route = useRoute()
const {t : $t} = useI18n()

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
} = tableHock(`doctors`, false, true, true, {'workspacbe_id': route.params.workspaceId})

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'CLINICS', key: 'clinics' },
  { title: 'APPROVED', key: 'approved' },
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
          title: $t('Hospitals'),
            link: '/hospitals/hospitals/list'
        },
        {
          title: $t('Branches'),
          link: `/hospitals/hospitals/${parseInt(route.params.hospitalId as string)}/branches/list`
        },
        {
          title: $t('Workspaces'),
          link: `/hospitals/hospitals/${parseInt(route.params.hospitalId as string)}/branches/${route.params.branchId}/workspaces/list`
        },
        {
          title: $t('Doctors'),
        },
      ]"
    />
    <PageHeader :title="$t('Doctors')" :text="$t('From here you can manage hospital doctors')" />
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
          <td class="mt-1">
            <div class="d-flex">
              <div class="d-flex flex-column">
                <h6 class="text-sm">
                  <div class="font-weight-medium user-list-name no-wrap">
                    {{ item.name }}
                  </div>
                </h6>

                <span class="text-xs text-medium-emphasis">{{ item.email }}</span>
              </div>
            </div>
          </td>
          <td>
            {{ item.mobile }}
          </td>
          <td>
            {{ item.clinics }}
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
              v-if="item.status === 'active'"
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
                  <VListItem :to="`/doctors/doctors/view/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-eye-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/calender/list?doctor_id=${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-calendar-blank" />
                    </template>
                    <VListItemTitle>{{ $t('Calendar') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/doctors/doctors/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
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
