<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const route = useRoute()

const {t : $t} = useI18n()

const {
  changePage,
  error,
  items,
  loading,
  options,
  sort,
  totalItems,
  totalPages,
} = tableHock(`doctors`, false, true, true, {'organization_id': route.params.id as any as number})

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'NAME', key: 'name' },
  { title: 'MOBILE', key: 'mobile' },
  { title: 'CLINICS', key: 'clinics' },
  { title: 'APPROVED', key: 'approved' },
  { title: 'STATUS', key: 'status' },
]
</script>
<template>
    <VCard>
        <VCardText class="d-flex align-center flex-wrap gap-4">
          <div class="text-h6">
            {{ $t('Doctors') }}
          </div>
          <VSpacer />
          <div class="d-flex align-center flex-wrap gap-6">
            <!-- 👉 Create item -->
            <VBtn  :to="`/hospitals/hospitals/view/adddoctor/${route.params.id}`">
              {{ $t('Add doctor') }}
            </VBtn>
          </div>
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
            <td class="mt-1">
              <div class="d-flex">
                <div class="d-flex flex-column">
                  <h6 class="text-sm">
                    <div class="font-weight-medium user-list-name no-wrap">
                      {{ item.name }}
                    </div>
                  </h6>

                  <span class="text-xs text-medium-emphasis">{{ item.email }}</span>
                </div>
              </div>
            </td>
            <td>
              {{ item.mobile }}
            </td>
            <td>
              {{ item.clinics }}
            </td>
            <td>
              <VChip
                :color="item.approved === 'approved' ? 'success' : item.approved === 'refused' ? 'error' : ''"
                class="font-weight-medium"
                size="small"
              >
                {{ item.approved }}
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
          </tr>
        </Show>
      </VCard>
</template>
