<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'

const route = useRoute()

const props = defineProps(['items', 'timeInterval'])

const { item } = fetchHock('calendars', (route.params.id as string).split('/')[1] as any as number, 'compare')
const panel = ref([0, 1, 2, 3, 4, 5, 6])
</script>

<template>
  <div>
    <div class="mb-5">
      <VCard>
        <VRow class="mt-3 mb-2">
          <VCol cols="12">
            <h3 class="me-4 ms-4"> {{ $t('Logs') }}: </h3>
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
          <VCol cols="12" v-if="props.timeInterval === item.time_interval">
            <VExpansionPanels  variant="accordion" v-if="item"  multiple v-model="panel">
              <VExpansionPanel v-for="(day, index) in item.data" :key="index"  multiple v-model="panel">
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
                        class="custom-checkbox rounded btn btn-primary"
                        :class="{
                          'disabbled-butten' : slot.status === 'unchanged',
                          'removed' : slot.status === 'removed',
                          'new' : slot.status === 'new'
                        }"
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
.new {
  background: rgb(var(--v-theme-primary)) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
}
.removed {
  background: rgb(var(--v-theme-error)) !important;
  border-color: rgb(var(--v-theme-error)) !important;
  color: white !important;
}
</style>
