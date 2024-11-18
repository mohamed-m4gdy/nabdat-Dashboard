<script setup lang="ts">
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import timeGridPlugin from '@fullcalendar/timegrid'
import type { CalendarApi, EventSourceFunc } from '@fullcalendar/core'
import arLocale from "@fullcalendar/core/locales/ar"
import enLocale from "@fullcalendar/core/locales/en-au"
import { getParams } from "@/helpers/params"


import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'

const { t , locale} = useI18n()


interface Event {
  url: string
  title: string
  start: Date
  end: Date
  allDay: boolean
  extendedProps: {
    type: string
  },
}

const calendarsColor = {
  calendar: 'primary',
  booking: 'success',
  // exception: 'warning',
  // first_come: 'info'
  // Personal: 'error',
  // Family: 'warning',
  // ETC: 'info',
}


const availableCalendars = ref([
  {
    color: 'primary',
    label: t('Calender'),
    value: 'calendar'
  },
  {
    color: 'success',
    label: t('Booking'),
    value: 'booking'
  },
  // {
  //   color: 'warning',
  //   label: t('Exception'),
  //   value: 'exception'
  // },
  // {
  //   color: 'info',
  //   label: t('First come'),
  //   value: 'first_come'
  // },
  // {
  //   color: 'error',
  //   label: 'Personal',
  // },
  // {
  //   color: 'warning',
  //   label: 'Family',
  // },
  // {
  //   color: 'info',
  //   label: 'ETC',
  // },
])


const isLeftSidebarOpen = ref(true)

// 👉 useCalendar
const refCalendar = ref()

// 👉 Calendar API
const calendarApi = ref<null | CalendarApi>(null)

// 👉 Check all
const checkAll = computed({
  get: () => filter.value.data.length === availableCalendars.value.length,
  set: val => {
    if (val)
      filter.value.data = availableCalendars.value.map((i: any) => i.value)
    else if (filter.value.data.length === availableCalendars.value.length)
      filter.value.data = []
  },
})

const params = getParams();

const filter = ref({
  doctor_id: params.doctor_id ? params.doctor_id : null,
  workspace_id: null,
  data: ['calendar', 'booking'],
  filters: {
    type: null,
    status: null,
    patient_id: null

  }
})

const fetchEvents: EventSourceFunc = (info, successCallback) => {
    if (!info) return

    const pad =(s: number)  => { return (s < 10) ? '0' + s : s; }
    let start = new Date(info.start)
    let startDate =  [start.getFullYear(), pad(start.getMonth()+1), pad(start.getDate())].join('-')
    let end = new Date(info.end)
    let endDate =  [end.getFullYear(), pad(end.getMonth()+1), pad(end.getDate())].join('-')
    const params = {
      ...filter.value,
      data: filter.value.data.join(','),
      start_date: startDate,
      end_date: endDate
    }
    axios.get(
      linkGenrator('calendar/all'),
      { params },
    )
    .then(response => {
      successCallback(response.data.data.map((el: any): Event => {return {
        url: '',
        title: el.title,
        start: new Date(el.from_date),
        end: new Date(el.to_date),
        allDay: false,
        extendedProps: {
          type: el.type,
        },
      }}))
    })
  }

  watch(() => filter, () => {
    calendarApi.value?.refetchEvents()
  }, {deep: true})

  onMounted(() => {
    calendarApi.value = refCalendar.value.getApi()
  })
</script>

<template>
  <div>
    <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Calendars')
        }
      ]"
    />
    <VCard>
      <VLayout style="z-index: 0;">
        <VNavigationDrawer
          v-model="isLeftSidebarOpen"
          width="250"
          absolute
          touchless
          location="start"
          class="calendar-add-event-drawer"
          :temporary="$vuetify.display.mdAndDown"
        >
          <div class="pa-5 d-flex flex-column gap-y-8">
            <div>
              <p class="text-sm text-uppercase text-medium-emphasis mb-3">
                {{ $t('Filters') }}
              </p>
              <!--
              :error-messages="getInputError('doctor_id')"-->
              <Search
                v-model:value="filter.doctor_id"
                :label-string="$t('Doctor')"
                paths="doctors"
              />
              <Search
                class="mt-4"
                v-model="filter.workspace_id"
                v-model:value="filter.workspace_id"
                :disabled="!filter.doctor_id"
                :fillter="{
                  doctor_id: filter.doctor_id
                }"
                title-param="title"
                :label-string="$t('Workspace')"
                paths="workspace"
              />
              <VSelect
                class="mt-4"
                v-model="filter.filters.type"
                inset
                :label="$t('Type')"
                clearable
                clear-icon="mdi-close"
                item-title="value"
                item-value="key"
                :items="[
                  {
                    value: $t('Visit'),
                    key: 'visit'
                  },
                  {
                    value: $t('Call'),
                    key: 'call'
                  }
                ]"
              />

              <Search
                class="mt-4"
                v-model:value="filter.filters.patient_id"
                :label-string="$t('Patient')"
                titleParam="firstname"
                paths="patients"
              />

              <p class="text-sm text-uppercase text-medium-emphasis mb-3 mt-3">
                {{ $t('Calendars') }}
              </p>

              <div class="d-flex flex-column calendars-checkbox">
                <VCheckbox
                  v-model="checkAll"
                  :label="$t('View All')"
                  color="secondary"
                />
                <VCheckbox
                  v-for="calendar in availableCalendars"
                  :key="calendar.label"
                  v-model="filter.data"
                  :value="calendar.value"
                  :color="calendar.color"
                  :label="calendar.label"
                  class="pt-1"
                />
              </div>
            </div>
          </div>
        </VNavigationDrawer>
        <VMain>
          <VCard flat>
            <FullCalendar
              ref="refCalendar"
              :options="{
                plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
                initialView: 'dayGridMonth',
                headerToolbar: {
                  start: 'drawerToggler,prev,next title',
                  end: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth',
                },
                locale: locale == 'en' ? enLocale : arLocale ,
                events: fetchEvents,
                forceEventDuration: true,
                eventResizableFromStart: true,
                dragScroll: true,
                dayMaxEvents: 2,
                navLinks: true,
                eventClassNames({ event: calendarEvent }) {
                  const colorName = calendarsColor[calendarEvent._def.extendedProps.type as keyof typeof calendarsColor]

                  return [
                    // Background Color
                    `bg-light-${colorName} text-${colorName}`,
                  ]
                },
                customButtons: {
                  drawerToggler: {
                    text: 'calendarDrawerToggler',
                    click() {
                      isLeftSidebarOpen.value = true
                    },
                  },
                },
              }"
            />
          </VCard>
        </VMain>
      </VLayout>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/libs/full-calendar";

.calendars-checkbox {
  .v-label {
    color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
    opacity: var(--v-high-emphasis-opacity);
  }
}

.calendar-add-event-drawer {
  &.v-navigation-drawer:not(.v-navigation-drawer--temporary) {
    border-end-start-radius: 0.375rem;
    border-start-start-radius: 0.375rem;
  }
}
</style>

<style lang="scss" scoped>
.v-layout {
  overflow: visible !important;

  .v-card {
    overflow: visible;
  }
}
</style>
