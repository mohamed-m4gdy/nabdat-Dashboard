<script setup lang="ts">
import validation from './validation'
import type Iform from './Iform'
import type dayType from '@/components/form/inputs/slotItem'

// get form helper
import formHock from '@/helpers/formHock'
import axios from '@axios'
import linkGnirator from '@/helpers/linkGenrator'

const emit = defineEmits(['close', 'updateForm'])
const props = defineProps(['spicialtyId'])
const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)

// get route
const route = useRoute()

// prepare item
const formSetup: Iform = {
  first_come: true,
  time_interval: null,
  waiting_time: null,
  doctor_id: null,
  cost: null,
  follow_up_cost: null,
  allow_online_pay: true,
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

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>(`workspace/${route.params.id}/assign`, 'add', formSetup, validation)


const resetData = () => {
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

const { t } = useI18n()
// slots logic
let i = 1;
const slotsCalender = ref<dayType[] | null>(null);
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
    const response = await axios.get(linkGnirator('calendar-templates/generate/slots'), {params: {"interval" : value ,"waiting_time" : 0, doctor_id : item.value.doctor_id, workspace_id: route.params.id}})
    if (response.data.success) slotsCalender.value = response.data.data
  }
})

const submit = async () => {
  const response = await saveItem()
  if (response.status){
    emit('updateForm')
    emit('close')
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
  <VDialog
    v-model="showFrom"
    persistent
    width="900"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('Add doctor to workspace')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
        class="mb-5"
      />

      <FormModel
        class="pt-10"
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
      >
        <VRow class="my-3 mx-3">
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.doctor_id"
              v-model:value="item.doctor_id"
              :label-string="$t('Doctors')"
              :fillter="{
                speciality_id : props.spicialtyId,
              }"
              paths="doctors"
              :error-messages="getInputError('doctor_id')"
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
            cols="12"
            md="6"
          >
            <VTextField
              v-model="item.cost"
              type="number"
              :label="$t('Cost')"
              :error-messages="getInputError('cost')"
              :suffix="$t('EGP')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="item.follow_up_cost"
              :label="$t('Follow up cost')"
              type="number"
              :error-messages="getInputError('follow_up_cost')"
              :suffix="$t('EGP')"
              persistent-placeholder
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.waiting_time"
              :label="$t('Waiting time')"
              type="number"
              :error-messages="getInputError('waiting_time')"
              :suffix="$t('Minutes')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <div class="d-flex align-center gap-10">
              <VRadioGroup
                v-model="item.first_come"
                :error-messages="getInputError('first_come')"
                inline
              >
                <VRadio
                  :label="$t('On a specific time')"
                  :value="false"
                  @click="resetData"
                />
                <VRadio
                  :label="$t('First come first served')"
                  :value="true"
                  @click="resetData"
                />
              </VRadioGroup>
            </div>
          </VCol>
          <VCol
            cols="6"
          >
            <VCheckbox
              v-model="item.allow_online_pay"
              :label="$t('Online Payment')"
            />
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
      </FormModel>

      <VCardActions>
        <VSpacer />
        <VBtn
          v-if="!loading"
          @click="submit"
        >
          {{ $t('Save') }}
        </VBtn>
        <VBtn v-if="loading">
          {{ $t('Loading') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
