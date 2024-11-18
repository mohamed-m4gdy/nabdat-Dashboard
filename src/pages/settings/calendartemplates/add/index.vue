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
  title: '',
  type: null,
  first_come: true,
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

const router = useRouter()
const { t } = useI18n()

// slots logic
const slotsCalender = ref<dayType[] | null>(null);
watch(() => item.value.time_interval, async (value) => {
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
    const response = await axios.get(linkGnirator('calendar-templates/generate/slots'), {params: {"interval" : value ,"waiting_time" : 0}})
    if (response.data.success) slotsCalender.value = response.data.data
  }
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
          title: $t('Calendar templates'),
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
      :title="$t('Add calendar template')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol
            cols="12"
            md="6"
          >
            <VTextField
              v-model="item.title"
              :label="$t('Title')"
              :error-messages="getInputError('title')"
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
                  @click="resetData"
                />
                <VRadio
                  :label="$t('First come first served')"
                  :disabled="item.type != 'visit'"
                  :value="true"
                  @click="resetData"
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
