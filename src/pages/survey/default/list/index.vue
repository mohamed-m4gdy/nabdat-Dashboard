<script setup lang="ts">
import AfterLogin from './components/afterLogin.vue'
import tableHock from '@/helpers/tableHock'

// index table model
import IndexTable from '@/components/table/index.vue'

const {
  changePage,
  changeSearch,
  colseDelete,
  deleteId,
  deleteItem,
  error,
  items,
  loading,
  openDelete,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock('survey-questions?filters[survey_type]=default')

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'QUESTION', key: 'question' },
  { title: 'TYPE', key: 'type' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'REQUIRED', key: 'required' },
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
          title: $t('Default'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Default')"
      :text="$t('From here you can manage system default')"
    />
    <AfterLogin />
    <VCard>
      <!-- items table -->
      <IndexTable
        :tableTitle="$t('Questions')"
        :headers="headers"
        add-path="survey-default-add"
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
            {{ item.question }}
          </td>
          <td>
            {{ item.type }}
          </td>
          <td>
            {{ item.created_at }}
          </td>
          <td>
            <VChip
              v-if="item.required"
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
            <VChip
              v-if="item.status"
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
                  <VListItem :to="`/survey/default/list/questionanswers/${item.id}`">
                    <template #prepend>
                      <VIcon icon="mdi-eye-outline" />
                    </template>
                    <VListItemTitle>{{ $t('Answers') }}</VListItemTitle>
                  </VListItem>
                  <VListItem :to="`/survey/default/edit/${item.id}`">
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
      </IndexTable>
    </VCard>
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
