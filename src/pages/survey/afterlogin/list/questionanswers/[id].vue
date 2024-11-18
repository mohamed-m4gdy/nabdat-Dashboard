<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import QuestionDetails from './QuestionDetails.vue'

// get route
const route = useRoute()

const {
  changePage,
  changeSearch,
  error,
  items,
  loading,
  deleteId,
  deleteItem,
  colseDelete,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`question/${route.params.id}/answers`)

const { locale } = useI18n({ useScope: 'global' })

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'USER', key: 'user' },
  { title: 'ANSWER', key: 'answer' },
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
          title: $t('After login'),
          link: '/survey/afterlogin/list'
        },
        {
          title: $t('Question answers'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Answers')"
      :text="$t('From here you can manage system answers')"
    />
    <QuestionDetails />
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
            {{ item.user?.firstname }} {{ item.user?.lastname }}
          </td>
          <td>
            <span v-if="item.answer">
              {{ item.answer }}
            </span>
              <VChip
                v-else
                color="success"
                class="font-weight-medium"
                size="small"
              >
                {{ item.option?.option[locale as 'ar' | 'en'] }}
              </VChip>
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
