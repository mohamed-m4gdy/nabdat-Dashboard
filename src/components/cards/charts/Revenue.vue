<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { useThemeConfig } from '@core/composable/useThemeConfig'
import { hexToRgb } from '@layouts/utils'

const props = defineProps(['values', 'months'])
const vuetifyTheme = useTheme()
const { theme } = useThemeConfig()


const options = controlledComputed(theme, () => {
  const currentTheme = ref(vuetifyTheme.current.value.colors)
  const variableTheme = ref(vuetifyTheme.current.value.variables)

  const disabledColor = `rgba(${hexToRgb(currentTheme.value['on-surface'])},${variableTheme.value['disabled-opacity']})`

  return {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        distributed: true,
        columnWidth: '60%',
        endingShape: 'rounded',
        startingShape: 'rounded',
      },
    },
    legend: { show: false },
    // dataLabels: { enabled: false },
    // colors: [
    //   currentTheme.value.primary,
    // ],
    states: {
      hover: {
        filter: { type: 'none' },
      },
      active: {
        filter: { type: 'none' },
      },
    },
    noData: {
      text: 'Loading...'
    },
    xaxis: {
      categories: props.months,
      axisTicks: { show: false },
      crosshairs: { opacity: 0 },
      axisBorder: { show: false },
      tickPlacement: 'on',
      labels: {
        style: {
          fontSize: '12px',
          colors: disabledColor,
        },
      },
    },
    yaxis: { show: false },
    grid: {
      show: false,
      padding: {
        top: -15,
        left: -10,
        right: -10,
      },
    },
    tooltip: {
      enabled: false,
    },
  }
})
</script>

<template>
  <VueApexCharts
    type="bar"
    :options="options"
    :series="values"
    :height="203"
  />
</template>
