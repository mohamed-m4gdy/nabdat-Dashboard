<script setup lang="ts">
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'

const props = defineProps(['apiUrl', 'cardTitle', 'sameColor'])

interface Category {
  x: string;
  y: string;
}

interface SeriesData {
  name: string;
  data: number[];
}


const categories = ref<Category[]>([])
const series = ref<SeriesData[]>([])
const months = ref<string[]>([])
const loading = ref<boolean>(false)
const error = ref<boolean>(false)
const total = ref()
const currency = ref()
const startDate = ref(`${new Date().getFullYear()}-01-01`)
const endDate = ref(`${new Date().getFullYear()}-12-31`)

loading.value = true


const fetchItem = async (startTime: string | boolean = false, endTime: string | boolean = false) => {
  if (startTime && endTime) {
    axios.get(
    linkGenrator(`${props.apiUrl}?created_from=${startTime}&created_to=${endTime}`),
  ).then(response => {
    categories.value = response.data.data
    months.value = categories.value.map((el: any) => el.x)
    series.value = [{
      name: 'revenu',
      data: categories.value.map((el: any) => Number(el.y.split(' ')[0]))
    }]
    total.value = categories.value.map(el => Number(el.y.split(' ')[0])).reduce((sum, value) => sum + value,  0)
    currency.value = categories.value[0].y.split(' ')[1]
    loading.value = false
  }).catch(() => {
    loading.value = false
    error.value = true
  })
  } else {
    axios.get(
      linkGenrator(`${props.apiUrl}?created_from=${new Date().getFullYear()}-01-01&created_to=${new Date().getFullYear()}-12-31`),
    ).then(response => {
      categories.value = response.data.data
      months.value = categories.value.map((el: any) => el.x)
      series.value = [{
        name: 'revenu',
        data: categories.value.map((el: any) => Number(el.y.split(' ')[0]))
      }]
      total.value = categories.value.map(el => Number(el.y.split(' ')[0])).reduce((sum, value) => sum + value,  0)
      currency.value = categories.value[0].y.split(' ')[1]
      loading.value = false
    }).catch(() => {
      loading.value = false
      error.value = true
    })
  }
}

fetchItem()

watchEffect(() => {
  if(startDate.value && endDate.value)
    fetchItem(startDate.value, endDate.value)
})
</script>

<template>
  <VCard>
    <VCardItem>
      <div class="chart-header">
        <div>
          <VCardTitle>{{ cardTitle }}</VCardTitle>
          <VCardSubtitle>{{ $t('Total') }} {{ total }} {{ currency }}</VCardSubtitle>
        </div>
        <div class="date-picker-wrapper">
          <div class="d-flex gap-2 align-center text-subtitle-2 mb-3">
            <div>{{ $t('From date') }}</div>
            <AppDateTimePicker
              v-model="startDate"
              prepend-inner-icon="mdi-calendar-blank-outline"
              density="compact"
              :config="{ position: 'auto right' }"
            />
          </div>
          <div class="d-flex gap-2 align-center text-subtitle-2">
            <div>{{ $t('To date') }}</div>
            <AppDateTimePicker
              v-model="endDate"
              prepend-inner-icon="mdi-calendar-blank-outline"
              density="compact"
              :config="{ position: 'auto right' }"
            />
          </div>
        </div>
      </div>
    </VCardItem>
    <VCardText>
      <Revenue :months="months" :values="series" v-if="!loading" />
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.chart-header {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.date-picker-wrapper {
  display: flex;
  flex-direction: column;
  align-items: end;
}
.date-picker-wrapper {
  .app-picker-field {
    width: 145px;
  }
}
</style>
