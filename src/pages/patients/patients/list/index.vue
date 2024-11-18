<script setup lang="ts">
import ApproveForm from './components/approveForm.vue'
import UpdateBlock from './components/updateBlockForm.vue'
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'

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
  options,
  sort,
  totalItems,
  fetchItems,
  totalPages,
  openDelete,
  addFilter,
  resetFilter,
} = tableHock('patients')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'firstname' },
  { title: 'EMAIL', key: 'email' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'GENDER', key: 'gender' },
  { title: 'STATUS', key: 'active' },
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
    type: inputTypes.select,
    title: 'Gender',
    prop: 'gender',
    cols: 4,
    items: [
      {
        key: 'male',
        value: $t('Male'),
      },
      {
        key: 'female',
        value: $t('Female'),
      },
    ],
  },
  {
    type: inputTypes.select,
    title: 'Status',
    prop: 'active',
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
  {
    type: inputTypes.select,
    title: 'Main survey',
    prop: 'main_survey_answered',
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

// approve item logic
const updateId = ref<number>(0)
const passwordId = ref<number>(0)
const showPasswordForm = (id: number) => passwordId.value = id

const openService = ref<boolean>(false)
const { y } = useWindowScroll()
const currentPosition = ref<number>()

const closeForms = () => {
  updateId.value = 0
  passwordId.value = 0
  openService.value = false
  fetchItems()
  setTimeout(() => {
    window.scroll({top: currentPosition.value})
  }, 200)
}

const close = () => {
  updateId.value = 0
  passwordId.value = 0
  openService.value = false
  setTimeout(() => {
    window.scroll({top: currentPosition.value})
  }, 200)
}

const openForm = () =>  {
  currentPosition.value = y.value
  window.scrollTo({ top: 0})
  openService.value = true
}

const showUpdateForm = (id: number) => {
  openForm()
  updateId.value = id
}

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
        }
      ]"
    />
    <PageHeader :title="$t('Patients')" :text="$t('From here you can manage system patientS')" />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @addFilter="addFilter"
      @resetFilter="resetFilter"
    />
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        add-path="patients-patients-add"
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
            {{ item.firstname }} {{ item.lastname }}
          </td>
          <td>
            {{ item.email }}
          </td>
          <td>
            {{ item.mobile }}
          </td>
          <td>
            {{ item.gender }}
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
                  <VListItem :to="`/patients/patients/edit/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-pencil-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                  </VListItem>
                  <VListItem
                    v-if="!item.approved"
                    @click="showPasswordForm(item.id)"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-lock" />
                    </template>
                    <VListItemTitle>{{ $t('Update password') }}</VListItemTitle>
                  </VListItem>
                  <VListItem
                    v-if="!item.approved"
                    @click="showUpdateForm(item.id)"
                  >
                    <template #prepend>
                      <VIcon icon="mdi-block-helper" />
                    </template>
                    <VListItemTitle>{{ $t('Update block') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/patients/patients/${item.id}/medical/list`">
                    <template #prepend>
                      <VIcon icon="mdi-pill" />
                    </template>
                    <VListItemTitle>{{ $t('Medical history') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/patients/patients/${item.id}/visits/list`">
                    <template #prepend>
                      <VIcon icon="mdi-home-account" />
                    </template>
                    <VListItemTitle>{{ $t('Home visit') }}</VListItemTitle>
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
      v-if="passwordId"
      :update-id="passwordId"
      @close="close"
      @update-form="closeForms"
    />
    <UpdateBlock
      v-if="openService"
      :update-id="updateId"
      @close="close"
      @update-form="closeForms"
    />
  </div>
</template>
