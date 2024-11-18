<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import type { filterItem } from '@/@types/filter'
import { inputTypes } from '@/@types/filter'
import avatar1 from '@images/avatars/avatar-1.png'
import showHock from '@/helpers/showHock'
import ShowForm from './components/show.vue'

const { item, loading: showLoading, show, close, showDialog } = showHock('transactions/')


const {t : $t} = useI18n()

interface User {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
  mobile: string | null;
  calling_code: string | null;
  gender: string;
  active: boolean;
  photo: string;
  default_lang_id: number | null;
  user_type: string;
  city_id: number | null;
  city: string | null;
  government_id: number | null;
  government: string | null;
  country_id: number | null;
  country: string | null;
  origin_country_id: number;
  origin_country: {
    id: number;
    name: string;
    code: string;
    calling_code: string;
    currency: {
      id: number;
      name: string;
      code: string;
    };
    currency_id: number;
    icon: string;
    lat: number | null;
    lon: number | null;
    status: boolean;
  };
  is_email_verified: boolean;
  is_mobile_verified: boolean;
  points: any[]; // You may replace 'any' with the actual type if known
  balance: number | null;
  new_mobile: string | null;
  new_mobile_calling_code: string | null;
  new_email: string | null;
  files: any[]; // You may replace 'any' with the actual type if known
}

interface Payment {
  id: number;
  title: string;
}

interface Currency {
  id: number;
  name: string;
}

interface transaction {
  id: number;
  status: string;
  amount: string;
  total: string;
  module: string;
  use_points: boolean;
  amount_in_points: string;
  paid_in_points: string;
  created_by: User;
  payment: Payment;
  currency: Currency;
  created_at: string;
}


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
  totalPages,
  addFilter,
  resetFilter,
} = tableHock<transaction>('transactions')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'User', key: 'user_id' },
  { title: 'Total', key: 'total' },
  { title: 'Payment method', key: 'payment' },
  { title: 'Date', key: 'created_at' },
  { title: 'ACTIONS', sortable: false },
]

// fillter data
const fillters: filterItem[] = [
  {
    type: inputTypes.search,
    title: 'Doctors',
    prop: 'doctor_id',
    path: 'doctors',
  },
  {
    type: inputTypes.search,
    title: 'Patient',
    prop: 'patient_id',
    path: 'patients',
    titleNames: ['firstname', 'lastname']
  },
  {
    type: inputTypes.search,
    title: 'Payment method',
    prop: 'payment_id',
    path: 'paymentGate',
    titleParam: 'title',
  },
  {
    type: inputTypes.search,
    title: 'Currencies',
    prop: 'currency_id',
    path: 'currencies',
  },

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
          title: $t('Transactions')
        }
      ]"
    />
    <PageHeader
      :title="$t('Transactions')"
      :text="$t('From here you can manage Transactions')"
    />
    <Filter
      :fillters="fillters"
      :selected="options.filters"
      @add-filter="addFilter"
      @reset-filter="resetFilter"
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
            <div class="d-flex">
                <VAvatar
                  size="34"
                  class="me-3 mt-2"
                >
                  <VImg :src="avatar1" />
                </VAvatar>

                <div class="d-flex flex-column">
                  <h6 class="text-sm">
                    <div class="font-weight-medium user-list-name no-wrap">
                      {{ item.created_by?.firstname }}
                    </div>
                  </h6>

                  <span class="text-xs text-medium-emphasis">{{ item.created_by?.email }}</span>
                  <span class="text-xs text-medium-emphasis">{{ item.created_by?.mobile }}</span>
                </div>
              </div>
          </td>
          <td>
            {{ item.total }} {{ item.currency?.name }}
          </td>

          <td>
            {{ item.payment.title }}
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
                  <VListItem @click="show(item.id)" >
                    <template #prepend>
                      <VIcon icon="mdi-eye" />
                    </template>
                    <VListItemTitle>{{ $t('Show') }}</VListItemTitle>
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

  </div>
</template>
