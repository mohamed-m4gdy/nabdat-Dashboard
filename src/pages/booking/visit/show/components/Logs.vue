<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

const route = useRoute()

const {
  items,
  loading,
} = tableHock(`booking/logs?filters[booking_id]=${route.params.id}`)
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <VCard :title="$t('Booking logs')" v-if="!loading">
      <VCardText>
        <VTimeline
          side="end"
          align="start"
          line-inset="8"
          truncate-line="both"
          density="compact"
        >
          <!-- SECTION Timeline Item: Flight -->
          <VTimelineItem
            dot-color="primary"
            size="x-small"
            v-for="(item, index) in items"
            :key="index"
          >
            <!-- 👉 Header -->
            <div class="d-flex justify-space-between align-center gap-2 flex-wrap">
              <span class="app-timeline-title">
                {{ item.created_at }}
              </span>
              <!-- <span class="app-timeline-meta">{{ item.day }}</span> -->
            </div>
            <div class="d-flex gap-2 mt-2">
              <div>
                <VAvatar
                  class="cursor-pointer"
                  color="primary"
                  variant="tonal"
                >
                  <VImg :src="item.user?.photo" />
                </VAvatar>
              </div>
              <div>
                <!-- 👉 Content -->
                <p class="app-timeline-text mb-1">
                  <span>{{ item.type }}</span>
                  <span v-if="item.user?.firstname"> -- {{ item.user?.firstname }}</span>
                </p>
                <p class="app-timeline-text mb-1">
                  <span>{{ item.status?.title }}</span>
                  <VIcon
                    size="20"
                    icon="mdi-arrow-right"
                    class="mx-2"
                  />
                  <span>{{ item.comment }}</span>
                </p>
              </div>
            </div>
          </VTimelineItem>
        </VTimeline>
      </VCardText>
    </VCard>
  </div>
</template>
