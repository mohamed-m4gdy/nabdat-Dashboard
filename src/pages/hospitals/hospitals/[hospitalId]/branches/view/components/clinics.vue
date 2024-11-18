<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

defineProps(['spicialtyId'])

const {t : $t} = useI18n()

const route = useRoute()

const {
  changePage,
  error,
  items,
  loading,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock('workspace', false, true, true, {branch_id: route.params.id as any as number}, false)

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Title', key: 'title' },
  { title: 'SPECIALITY', key: 'speciality.title' },
  { title: 'CITY', key: 'city.name' },
  { title: 'ADDRESS', key: 'address' },
  { title: 'CREATED AT', key: 'created_at' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'active' },
]
</script>
<template>
    <VCard>
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <h3 class="text-base font-weight-medium">{{ $t('Workspaces') }} </h3>
        </VCardText>
        <Show
          :headers="headers"
          :loading="loading"
          :items="items"
          :options="options"
          :total-pages="totalPages"
          :total-items="totalItems"
          :error="error"
          @change-page="changePage"
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
                {{ item.speciality.title }}
            </td>
            <td>
                {{ item.city.name }}
            </td>
            <td>
                {{ item.address }}
            </td>
            <td>
                {{ item.created_at }}
            </td>
            <td>
              <VChip
                :color="item.approved === 'approved' ? 'success' : item.approved === 'refused' ? 'error' : ''"
                class="font-weight-medium"
                size="small"
              >
                {{ $t(item.approved) }}
              </VChip>
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
          </tr>
        </Show>
      </VCard>
</template>
