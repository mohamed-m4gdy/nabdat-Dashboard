<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import formHock from '@/helpers/formHock'

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
} = tableHock('payGateOnline')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TITLE', key: 'title' },
  { title: 'PAYMENTGATE', key: 'paymentGate.title' },
  { title: 'CODE', key: 'code' },
  { title: 'FEES', key: 'fees' },
  { title: 'STATUS', key: 'is_active' },
]

const showUpdateStatus = async (id: number, status: boolean) => {
  const initialItem = { is_active: !status }
  const rules = {}
  const { saveItem } = formHock<any>(`payGateOnline/updateStatus/${id}`, 'patch', initialItem, rules)
  await saveItem()
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
          title: $t('Payment gate online')
        }
      ]"
    />
    <PageHeader
      :title="$t('Payment gate online')"
      :text="$t('From here you can manage system payment gate online')"
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
            {{ item.paymentGate.title }}
          </td>
          <td>
            {{ item.code }}
          </td>
          <td>
            {{ item.fees }}
          </td>
          <td>
            <VSwitch
                v-model="item.is_active"
                :label="item.is_active ? $t('Active') : $t('Not active')"
                @click="showUpdateStatus(item.id, item.is_active)"
                inset
              />
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
