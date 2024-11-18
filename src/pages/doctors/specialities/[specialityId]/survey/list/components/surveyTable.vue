<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const props = defineProps(['items', 'specialityId'])

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
} = tableHock('survey-questions', false, true, true, { survey_id: props.items })

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
  <VCard>
    <!-- items table -->
    <Table
      :headers="headers"
      :dynamic-path="`/doctors/specialities/${props.specialityId}/survey/${props.items}/add`"
      :title-header="$t('question')"
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
                <VListItem :to="`/doctors/specialities/${props.specialityId}/survey/list/questionanswers/${item.id}`">
                  <template #prepend>
                    <VIcon icon="mdi-eye-outline" />
                  </template>
                  <VListItemTitle>{{ $t('Answers') }}</VListItemTitle>
                </VListItem>
                <VListItem :to="`/doctors/specialities/${props.specialityId}/survey/${props.items}/edit/${item.id}`">
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
    </Table>
  </VCard>
</template>
