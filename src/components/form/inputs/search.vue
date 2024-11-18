<script setup lang="ts">
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'


const props = defineProps(['paths', 'labelString', 'value', 'errorMessages', 'orderBy', 'titleParam', 'fillter', 'multi', 'titleNames', 'clear'])
const emit = defineEmits(['update:value', 'change'])
const search = ref<string>('')
const select = ref<string>('')
const items = ref([])
const loading = ref<boolean>(false)

const filters = ref(props.fillter)

const fetchItems = (search: string) => {
  loading.value = true
  axios.get(
      linkGenrator(props.paths),
      { params:  {
        term: search,
        page: 1,
        per_page: 15,
        orderDir: 'desc',
        orderBy: 'id',
        filters: filters.value
      }},
    )
    .then(response => {
      items.value = response.data?.data ?? []
      // stop loader
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

watch(select, () => {
  if (!lock.value) {
    emit('update:value', select)
    const item = items.value.find((el: any) => el.id == select.value)
    emit('change', item)
  }
})

const randumId = (Math.random() + 1).toString(36).substring(7);

watch(() => props.fillter, value => filters.value = value)

// get value from backend
const lock = ref(true)
if (props.value) {
  axios.get(linkGenrator(props.paths + '?filters[id]=' + props.value)).then(response => {
    const data = response.data.data
    if(data[0]){
      select.value = data[0][props.titleParam ? props.titleParam : 'name']
      setTimeout(() => lock.value = false, 1)
    }
  })
} else {
  lock.value = false
}
</script>

<template>
  <VAutocomplete
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :label="labelString"
    :items="items.map((item: any) => { 
      let value = '';
      if (titleParam) {
          value = item[titleParam]
      } else if (titleNames) {
          value = `${item[titleNames[0]]} ${item[titleNames[1]]}`
      } else {
          value = `${item['name']}`
      }
      return { key: item.id, value: value };
    })"    
    item-title="value"
    item-value="key"
    :clearable="!clear"
    :multiple="multi"
    clear-icon="mdi-close"
    :error-messages="errorMessages"
    @keyup="fetchItems(search)"
    @focus="fetchItems('')"
    :id="randumId"
  />
</template>
