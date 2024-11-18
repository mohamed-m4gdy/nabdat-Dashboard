<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'
import changePassword from './components/changePassword.vue'
import EndOfService from './components/EndOfService.vue'

// index table model
import IndexTable from '@/components/table/index.vue'

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
  fetchItems,
  addFilter,
  resetFilter,
} = tableHock('hospitals')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'EMAIL', key: 'email' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'BRANCHES', key: 'branches' },
  { title: 'APPROVED', key: 'active' },
  { title: 'STATUS', key: 'status' },
  { title: 'ACTIONS', key: 'actions', sortable: false },
]

// fillter data
const fillters = ref<filterItem[]>([
  {
    type: inputTypes.search,
    title: 'Country',
    prop: 'country_id',
    path: 'country',
    change: (value: any) => {
      options.value.filters.city_id = null
      options.value.filters.government_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'Governorate',
    prop: 'government_id',
    path: 'government',
    dissabled: true,
    filterVal: '',
    filterName: 'country_id',
    change: (value: any) => {
      options.value.filters.city_id = null
    }
  },
  {
    type: inputTypes.search,
    title: 'City',
    prop: 'city_id',
    path: 'city',
    dissabled: true,
    filterVal: '',
    filterName: 'government_id'
  },
  {
    type: inputTypes.search,
    title: 'Speciality',
    prop: 'speciality_id',
    path: 'specialities',
    titleParam: 'title',
  },
  {
    type: inputTypes.select,
    title: 'Status',
    prop: 'status',
    cols: 4,
    items: [
      {
        key: 'true',
        value: $t('Active'),
      },
      {
        key: 'false',
        value: $t('Not active'),
      },
    ],
  },
])


// countries, governorates, cities filters by select
watch(options.value, value => {
  // Enable governorate after choosing country and get the value of country
  if(value.filters.country_id) {
    fillters.value[1].filterVal = value.filters.country_id
    fillters.value[1].dissabled = false
  } else {
    fillters.value[1].dissabled = true
  }
  // Enable city after choosing governorates and get the value of governorates
  if(value.filters.government_id) {
    fillters.value[2].filterVal = value.filters.government_id
    fillters.value[2].dissabled = false
  } else {
    fillters.value[2].dissabled = true
  }
}, {deep: true})

// change password logic
const passwordId = ref<number>(0)
const showPasswordForm = (id: number) => passwordId.value = id
const closePasswordForm = () => passwordId.value = 0

// End of service logic
const endOfServiceId = ref<number>(0)
const endOfServiceForm = (id: number) => endOfServiceId.value = id
const endOfServiceClose = () => endOfServiceId.value = 0
const endOfServiceUpdate = () => {
  endOfServiceId.value = 0
  fetchItems()
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
          title: $t('Hospitals'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Hospitals')"
      :text="$t('From here you can manage system hospitals')"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @add-filter="addFilter"
      @reset-filter="resetFilter"
    />
    <VCard>
      <!-- items table -->
      <IndexTable
        :headers="headers"
        add-path="hospitals-hospitals-add"
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
          <td class="no-wrap">
            {{ item.name }}
          </td>
          <td>
            {{ item.email }}
          </td>
          <td>
            {{ item.mobile }}
          </td>
          <td class="no-wrap">
            <VListItem :to="`/hospitals/hospitals/${item.id}/branches/list`">
              <VListItemTitle> {{ item.branches }}</VListItemTitle>
            </VListItem>
          </td>
          <td>
            <VChip
              v-if="item.active"
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
                  <VListItem :to="`/hospitals/hospitals/view/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-eye-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/hospitals/hospitals/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>

                  <VListItem :to="`/hospitals/hospitals/${item.id}/branches/list`">
                    <template #prepend>
                      <VIcon icon="mdi-source-branch" />
                    </template>
                    <VListItemTitle>{{ $t('Branches') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/hospitals/hospitals/${item.id}/doctors/list`">
                    <template #prepend>
                      <VIcon icon="mdi-doctor" />
                    </template>
                    <VListItemTitle>{{ $t('Doctors') }}</VListItemTitle>
                  </VListItem>

                  <VListItem
                    @click="showPasswordForm(item.id)"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-lock" />
                    </template>
                    <VListItemTitle>{{ $t('Update password') }}</VListItemTitle>
                  </VListItem>

                  <VListItem @click="endOfServiceForm(item.id)">
                    <template #prepend>
                      <VIcon icon="mdi-ray-end-arrow" />
                    </template>
                    <VListItemTitle>{{ $t('End Of Service') }}</VListItemTitle>
                  </VListItem>
                </VList>
              </VMenu>
            </VBtn>
          </td>
        </tr>
      </IndexTable>
    </VCard>

    <changePassword
      v-if="passwordId"
      :update-id="passwordId"
      @close="closePasswordForm"
      @update-form="closePasswordForm"
    />
    <EndOfService
      v-if="endOfServiceId"
      :update-id="endOfServiceId"
      @close="endOfServiceClose"
      @update-form="endOfServiceUpdate"
    />
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
