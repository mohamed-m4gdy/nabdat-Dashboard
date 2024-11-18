<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

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
} = tableHock(`booking/surveys?filters[booking_id]=${route.params.id}`)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'QUESTIONS', key: 'survey' },
  { title: 'TYPE', key: 'survey' },
  { title: 'ANSWERS', key: 'survey' },
  { title: 'STATUS', key: 'status' },
]

const { locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <div>
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :items="items"
        :table-title="$t('Survey')"
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
            {{ item.survey?.question?.question }}
          </td>
          <td>
            {{ item.survey?.question?.type }}
          </td>
          <td>
            <span v-if="item.survey?.question?.type === 'multi'">
              <VChip
                color="success"
                class="font-weight-medium"
                size="small"
              >
                {{ item.survey?.option?.option[locale as 'ar' | 'en'] }}
              </VChip>
            </span>
            <span v-if="item.survey?.question?.type === 'yesorno'">
              <VChip
                v-if="item.survey?.answer === '0'"
                color="success"
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Yes') }}
              </VChip>
              <VChip
                v-else
                color="error"
                class="font-weight-medium"
                size="small"
              >
                {{ $t('No') }}
              </VChip>
            </span>
            <span v-else>
              {{ item.survey?.answer }}
            </span>
          </td>
          <td>
            <VChip
              v-if="item.survey?.question?.status === 'active'"
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
              {{ $t('Inactive') }}
            </VChip>
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
