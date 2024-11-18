<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'
import type dayType from '@/components/form/inputs/slotItem'
import Calendars from './components/weekCalendar.vue'

// get form helper
import axios from '@axios'
import linkGnirator from '@/helpers/linkGenrator'

const route = useRoute()

const { item, loading } = fetchHock(`calendars`, route.params.id as any as number, 'edit')

// slots logic
let i = 1;
const slotsCalender = ref<dayType[] | null>(null)

watch(() => item.value.time_interval, async (value) => {
  if (i > 1) {
    item.value.data = [
    {
        day: 'Sat',
        slots: []
      },
      {
        day: 'Sun',
        slots: []
      },
      {
        day: 'Mon',
        slots: []
      },
      {
        day: 'Tues',
        slots: []
      },
      {
        day: 'Wed',
        slots: []
      },
      {
        day: 'Thurs',
        slots: []
      },
      {
        day: 'Fri',
        slots: []
      }
    ]
  }
  i++
  if (value) {
    const response = await axios.get(linkGnirator('calendar-templates/generate/slots'), {params: {"interval" : value ,"waiting_time" : 0, doctor_id : item.value.doctor_id, workspace_id: item.value.workspace_id }})
    if (response.data.success) slotsCalender.value = response.data.data
  }
})

</script>

<template>
  <div>
    <div>
      <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Calls'),
          link: '/calls/list'
        },
        {
          title: $t('Calender')
        }
      ]"
    />
    </div>

    <VCard
      id="invoice-list"
      :title="$t('Calender')"
    >
        <VRow class="mt-3 mb-2">

          <VCol
            md="12"
            cols="12"
          >
          <div v-if="!item.has_calendar">
            <div class="text-center py-5 text-h5 font-weight-bold">
              <VIcon class="text-h1 mb-4" icon="mdi-calendar-alert" />
              <div>{{ $t('There is no calendar for this doctor') }}</div>
            </div>
          </div>
          <div v-else>
            <Calendars
              v-if="!loading"
              v-model:value="item.data"
              :slotsCalender="slotsCalender"
              :grid-column="{ sm: '6', cols: '12' }"
            />
          </div>
          </VCol>
        </VRow>
    </VCard>
  </div>
</template>
