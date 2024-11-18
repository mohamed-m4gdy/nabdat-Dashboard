<script setup lang="ts">
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'

const props = defineProps(['paths', 'labelString', 'value', 'errorMessages', 'orderBy', 'titleParam', 'fillter'])
const emit = defineEmits(['update:value'])

const search = ref<string>('')
const select = ref<any[]>([])
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

watch(select, () => emit('update:value', select))

watch(() => props.fillter, value => filters.value = value)
</script>

<template>
  <VAutocomplete
    chips
    closable-chips
    v-model="select"
    v-model:search="search"
    :loading="loading"
    :label="labelString"
    :items="items.map((item: any) => { return { key: item.id, value: item[titleParam ? titleParam : 'name'] } })"
    item-title="value"
    item-value="key"
    clearable
    :multiple="true"
    clear-icon="mdi-close"
    :error-messages="errorMessages"
    @keyup="fetchItems(search)"
    @focus="fetchItems('')"
  />
</template>
