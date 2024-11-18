<script setup lang="ts">
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'
import { inputTypes } from '@/@types/filter'
const {t : $t} = useI18n()

const prop = defineProps(['fillter', 'value'])
const emit = defineEmits(['addFilter', 'change'])


const valued = ref()
const select = ref<any>()

if (prop.fillter.type == inputTypes.search && prop.value) {
  axios.get(linkGenrator(prop.fillter.path + '?filters[id]=' + prop.value)).then(response => {
    const data = response.data.data
    if(data[0]) valued.value = data[0][prop.fillter.titleParam ? prop.fillter.titleParam : 'name']
  })
} else if (prop.fillter.type == inputTypes.switch) {
  select.value = prop.value == 'true' ? true : false
} else if (prop.fillter.type == inputTypes.select) {
  select.value = prop.value
} else if (prop.fillter.type == inputTypes.date) {
  select.value = prop.value
}

watch(select, value => {
  if (select.value !== '') {
    emit('change', select)
    
  }
  if (value !== '')  {
    emit('addFilter', prop.fillter.prop, value, prop.fillter.noKeyFilter ? prop.fillter.noKeyFilter : false)
  }
})

watch(() => prop.value, value => {
  if(value === null) {
    select.value = ''
  }
})
</script>

<template>
  <VSwitch
    v-if="fillter.type == inputTypes.switch"
    v-model="select"
    inset
    :label="$t(fillter.title)"
    clearable
    clear-icon="mdi-close"
    item-title="value"
    item-value="key"
    :items="fillter.items"
  />
  <VSelect
    v-else-if="fillter.type == inputTypes.select"
    v-model="select"
    inset
    :label="$t(fillter.title)"
    clearable
    clear-icon="mdi-close"
    item-title="value"
    item-value="key"
    :items="fillter.items"
  />
  <Search
    v-else-if="fillter.type == inputTypes.search"
    :valued="valued"
    v-model="select"
    :label-string="$t(fillter.title)"
    order-by="name"
    :paths="fillter.path"
    :fillter="{
      [fillter.filterName]: fillter.filterVal,
    }"
    :title-param="fillter.titleParam"
    :title-names="fillter.titleNames"
    :disabled="fillter.dissabled"
    :clear="fillter.clear"
  />
  <DateInput
    v-else-if="fillter.type == inputTypes.date"
    v-model:value="select"
    :label="$t(fillter.title)"
    clearable
    clear-icon="mdi-close"
  />
</template>
