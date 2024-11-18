<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const route = useRoute()

interface history_medicines {
  id: number
  doctor: {
    id: number
    first_name: {
      ar: string
      en: string
    }
    last_name: {
      ar: string
      en: string
    }
    gender: string
    mobile: string
    calling_code: string
    title: {
      id: number
      title: string
    }
    title_id: number
    main_speciality: string
    main_speciality_obj: {
      id: number
      title: string
    }
    sub_speciality: string | null
    sub_speciality_obj: string | null
    status: string
    reviews: any[]
    rating: string
    photo: string
    created_at: string
  }
  doctor_name: string
  status: string
  investigation_date: string
  speciality: {
    id: number
    title: string
  }
  history_medicines: any[]
  investigations: string
  tags: any[]
  created_at: string
}

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
} = tableHock<history_medicines>(`booking/${route.params.id}/medical-history`)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TRADENAME', key: 'history_medicines' },
  { title: 'INVESTIGATIONS', key: 'investigations' },
  { title: 'TAGS', key: 'tags' },
  { title: 'COMMENT', key: 'history_medicines' },
]
</script>

<template>
  <div>
    <VCard>
      <!-- items table -->
      <Table
        :headers="headers"
        :loading="loading"
        :items="items"
        :table-title="$t('Medical History')"
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
            {{ item?.history_medicines[0]?.medicine?.tradename }}
          </td>
          <td>
            {{ item.investigations }}
          </td>
          <td>
            <span v-for="tag in item?.tags">
              <div v-for="link in tag.tags_attachment">
                <VBtn variant="text" :href="link" target="_blank">
                  {{tag.title}}
                </VBtn>
              </div>
            </span>
          </td>
          <td>
            {{ item.history_medicines[0]?.comment }}
          </td>
        </tr>
      </Table>
    </VCard>
  </div>
</template>
