<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'
import History from './History.vue'

defineProps(['items'])

// get route
const route = useRoute()

const { item } = fetchHock('calendar-logs/show', route.params.id as any as number)
</script>

<template>
  <div>
    <div class="mb-5">
      <VCard>
        <VRow class="mt-3">
          <VCol cols="12">
            <h3 class="me-4 ms-4"> {{ $t('What it was') }}: </h3>
          </VCol>
          <VCol cols="6">
            <VList class="card-list me-4 ms-4">
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-sm font-weight-medium">
                    {{ $t('Waiting time') }}:
                    <span class="text-body-2">
                      {{ item.waiting_time }}
                    </span>
                  </h6>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCol>
          <VCol cols="6">
            <VList class="card-list me-4 ms-4">
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-sm font-weight-medium">
                    {{ $t('First come') }}:
                    <VChip
                      v-if="item.first_come"
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
                  </h6>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCol>
          <VCol cols="6">
            <VList class="card-list me-4 ms-4">
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-sm font-weight-medium">
                    {{ $t('Time interval') }}:
                    <span class="text-body-2">{{ item.time_interval }}</span>
                  </h6>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCol>
          <VCol cols="6">
            <VList class="card-list me-4 ms-4">
              <VListItem>
                <VListItemTitle>
                  <h6 class="text-sm font-weight-medium">
                    {{ $t('Has calendar') }}:
                    <VChip
                      v-if="item.has_calendar"
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
                  </h6>
                </VListItemTitle>
              </VListItem>
            </VList>
          </VCol>
          <VCol cols="12">
            <VExpansionPanels  variant="accordion" v-if="item">
              <VExpansionPanel v-for="(day, index) in item.data" :key="index">
                <VExpansionPanelTitle>
                  {{ $t(day.day) }}
                </VExpansionPanelTitle>
                <VExpansionPanelText>
                  <VRow>
                    <VCol
                      v-for="slot in day.slots"
                      :sm="2"
                    >
                      <div
                        class="custom-checkbox disabbled-butten rounded btn btn-primary"
                      >
                        {{ slot.start_time }}
                      </div>
                    </VCol>
                  </VRow>
                </VExpansionPanelText>
              </VExpansionPanel>
            </VExpansionPanels>
          </VCol>
        </VRow>
      </VCard>
    </div>
    <div>
      <History :time-interval="item.time_interval" />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.custom-checkbox {
  display: block;
  padding: 0.5em;
  position: relative;
  text-align: center;
  border-color: rgb(var(--v-theme-primary)) !important;
  border: 1px solid;
  width: 100%;
  line-height: 20px;

  .hideCheck {
    position: absolute;
    opacity: 0;
  }
  .cr-title {
    font-weight: 500;
  }
}
.v-theme--light .disabbled-butten {
  background: #000000ab;
  border: #000;
  color: #fff;
}
.v-theme--dark .disabbled-butten {
  background: #eeeeeec7 !important;
  border-color: #eee9 !important;
  color: #000;
}
</style>
