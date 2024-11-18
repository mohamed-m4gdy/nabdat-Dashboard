<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'

const props = defineProps(['items', 'timeInterval'])

// get route
const route = useRoute()

const { item } = fetchHock('calendars', route.params.id as any as number, 'compare')

// const panel = ref([0, 1, 2, 3, 4, 5, 6])

// Computed property to conditionally bind v-model
// const conditionalPanel = computed(() => {
//  // Check if item.value and item.value.data are defined
//  if (item.value && item.value.data) {
//    return item.value.data.some((day: any) => day.status === 'removed') ? null : panel.value;
//  }
//  // Return null or a default value if item.value or item.value.data is undefined
//  return null;
// });

// Method to handle panel opening
// const handlePanelOpen = (index: number) => {
//  const day = item.value.data[index]
//  if (day.status !== 'removed') {
//     // Check if the panel is already open
//     const isOpen = panel.value.includes(index)
//     if (isOpen) {
//       // If it's open, remove it from the array to close it
//       panel.value = panel.value.filter(i => i !== index)
//     } else {
//       // If it's closed, add it to the array to open it
//       panel.value = [...panel.value, index]
//     }
//  }
// }
</script>

<template>
  <div>
    <div class="mb-5">
      <VCard>
        <VRow class="mt-3 mb-2">
          <VCol cols="12">
            <h3 class="me-4 ms-4"> {{ $t('What it became') }}: </h3>
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
            <VExpansionPanels  variant="accordion" v-if="item">
              <VExpansionPanel v-for="(day, index) in item.data" :key="index">
                <VExpansionPanelTitle :class="{
                    'removed-day' : day.status === 'removed',
                    'changed' : day.status === 'new'
                  }">
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
.removed-day {
  margin-bottom: 15px;
  color: rgb(var(--v-theme-error)) !important;
}

.changed {
  margin-bottom: 15px;
  color: rgb(var(--v-theme-primary)) !important;
}
</style>
