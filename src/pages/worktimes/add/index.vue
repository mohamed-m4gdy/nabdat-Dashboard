<script lang="ts" setup>
import validation from './validation'
import type Iform from './Iform'
import type dayType from '@/components/form/inputs/slotItem'

// get form helper
import formHock from '@/helpers/formHock'
import axios from '@axios'
import linkGnirator from '@/helpers/linkGenrator'

// prepare item
const formSetup: Iform = {
  workspase_id: null,
  doctor_id:  null,
  cost: null,
  follow_up_cost: null,
  allow_online_pay: null,
  waiting_time: null,
  first_come: false,
  type: null,
  time_interval: null,
  data: [
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

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>('calendar-templates', 'add', formSetup, validation)

const router = useRouter()
const { t } = useI18n()

// slots logic
const slotsCalender = ref<dayType[] | null>(null);
watch(() => item.value.time_interval || item.value.doctor_id || item.value.workspase_id, async (value) => {
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
  if (value) {
    const response = await axios.get(linkGnirator('calendar-templates/generate/slots'), {params: {"interval" : value ,"waiting_time" : 0, doctor_id : item.value.doctor_id, workspace_id: item.value.workspase_id}})
    if (response.data.success) slotsCalender.value = response.data.data
  }
})

watch(() => item.value.first_come, async (value) => {
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
})

// submit method
const submitItem = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    router.go(-1)
  }
  else {
    // scroll to top screen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const changeTemplate = (value: any) => {
  axios.get(linkGnirator('calendar-templates/get-slots/' + value.id)).then( response => {
    const data = response.data.data
    item.value.first_come = data.first_come
    item.value.data = [...data.data]
  })
}


// interval options data
const intervalOptions = ref<{key:string,value: number}[]>([])
axios.get(linkGnirator('calendar-template/intervals')).then( response => {
  const intervals: {key:string,value: number}[] = []
  response.data.data.forEach((el: any) => {
    intervals.push({key: el + ' ' + t('minutes'), value: el})
  })
  intervalOptions.value = intervals
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
          title: $t('Work time'),
          link: '/settings/calendartemplates/list'
        },
        {
          title: $t('Add')
        }
      ]"
    />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add Work time')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.workspase_id"
              v-model:value="item.workspase_id"
              :label-string="$t('Workspace')"
              paths="workspase"
              :error-messages="getInputError('workspase_id')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <!-- :disabled="!item.speciality_id"
              :fillter="{
                speciality_id: item.speciality_id,
              }" -->
            <Search
              v-model="item.doctor_id"
              v-model:value="item.doctor_id"
              :label-string="$t('Doctor')"
              paths="doctors"
              :error-messages="getInputError('doctor_id')"
            />
          </VCol>

          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.cost"
              :label="$t('Cost')"
              :error-messages="getInputError('cost')"
              :suffix="$t('EGP')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.follow_up_cost"
              :label="$t('Follow up cost')"
              :error-messages="getInputError('follow_up_cost')"
              :suffix="$t('EGP')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VSelect
              v-model="item.type"
              :label="$t('Calendar type')"
              item-title="key"
              item-value="value"
              :items="[
                {
                  key: $t('Visit'),
                  value: 'visit',
                },
                {
                  key: $t('Call'),
                  value: 'call',
                },
              ]"
              :error-messages="getInputError('type')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VSelect
              v-model="item.time_interval"
              :label="$t('Time interval')"
              item-title="key"
              item-value="value"
              :items="intervalOptions"
              :error-messages="getInputError('time_interval')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              :label-string="$t('Calender template')"
              :disabled="!item.time_interval"
              :fillter="{
                time_interval : item.time_interval,
              }"
              paths="calendar-templates"
              title-param="title"
              @change="(value) => {changeTemplate(value)}"
              :error-messages="getInputError('time_interval')"
            />
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <VRow class="align-center">
              <VCol
                md="4"
                cols="6"
              >
                <VCheckbox
                  v-model="item.allow_online_pay"
                  :label="$t('Online Payment')"
                />
              </VCol>
              <VCol
                md="4"
                cols="12"
              >
                <VTextField
                  v-model="item.waiting_time"
                  :label="$t('Waiting time')"
                  :error-messages="getInputError('waiting_time')"
                  :suffix="$t('Minutes')"
                  persistent-placeholder
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <div class="d-flex align-center gap-10">
              <VRadioGroup
                v-model="item.first_come"
                :error-messages="getInputError('first_come')"
                :aria-disabled="item.type != 'visit'"
                inline
              >
                <VRadio
                  :label="$t('On a specific time')"
                  :disabled="item.type != 'visit'"
                  :value="false"
                />
                <VRadio
                  :label="$t('First come first served')"
                  :disabled="item.type != 'visit'"
                  :value="true"
                />
              </VRadioGroup>
            </div>
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <WeekCalendar
              v-model:value="item.data"
              :slotsCalender="slotsCalender"
              :grid-column="{ sm: '6', cols: '12' }"
            />
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
