<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const props = defineProps(['item'])

const {
  items,
} = tableHock('reports/booking-status')
</script>

<template>
  <VCard>
    <VCardItem>
      <VCardTitle>{{ $t('Bookings') }}</VCardTitle>
    </VCardItem>

    <VCardText>
      <p class="mb-md-10">
        <span>
          {{ $t('Total Bookings') }}: 
        </span>
        <span class="text-high-emphasis font-weight-medium me-1">
          {{ props.item.bookings_count }}
        </span>
      </p>
      <VRow>
        <VCol
          v-for="(item, index) in items"
          :key="item.id"
          cols="6"
          sm="6"
        >
          <div class="d-flex align-center">
            <div class="me-3">
              <VAvatar
                :color="
                  item.code === 'confirmed' ? 'primary' :
                  item.code === 'completed' ? 'success' :
                  item.code === 'attended' ? 'info' :
                  item.code === 'cancel' ? 'error' :
                  item.code === 'not_attended' ? 'warning' :
                  item.code === 'exception_cancel' ? 'error' :
                  item.code === 'pending' ? 'secondary' :
                  item.code === 'failed_payment' ? 'error' :
                  item.code === 'noshow' ? 'error' : ''
                "
                rounded
                size="40"
                class="elevation-1"
              >
                <VIcon
                  size="24"
                  :icon="
                    item.code === 'confirmed' ? 'mdi-ticket-confirmation' :
                    item.code === 'completed' ? 'ri-task-fill' :
                    item.code === 'attended' ? 'mdi-account-outline' :
                    item.code === 'cancel' ? 'mdi-cancel' :
                    item.code === 'not_attended' ? 'mdi-account-cancel' :
                    item.code === 'exception_cancel' ? 'mdi-close-circle-multiple-outline' :
                    item.code === 'pending' ? 'mdi-account-clock' :
                    item.code === 'failed_payment' ? 'mdi-alert-circle' :
                    item.code === 'noshow' ? 'mdi-close-circle-multiple-outline' : ''
                  "
                />
              </VAvatar>
            </div>

            <div class="d-flex flex-column">
              <span class="text-caption">
                {{ item.title }}
              </span>
              <span class="text-h6">{{ item.booking_count }}</span>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
