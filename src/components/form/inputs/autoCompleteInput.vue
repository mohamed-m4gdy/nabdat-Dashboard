<script setup lang="ts">
import axios from '@axios'
import linkGenrator from '@/helpers/linkGenrator'

const props = defineProps(['path', 'label', 'limit', 'value', 'errorMessages'])

const emit = defineEmits(['autoComplete', 'update:value'])

interface searchForm {
  search: string
  limit: number
}

// prepare item
const searchSetup: searchForm = {
  search: null,
  limit: props.limit,
}

const item = ref<searchForm>(searchSetup)
const loading = ref<boolean>(false)
const serverErrors = ref<string[]>([])
const items = ref([])

const saveItem = async () => {
  if (item.value.search == '') {
    items.value = []
    item.value.search = ''

    return false
  }

  if (item.value.search === null) {
    items.value = []
    item.value.search = ''

    return false
  }

  try {
    await axios.post(
      linkGenrator(props.path),
      item.value,
    ).then(response => {
      items.value = response.data.data
    })

    // stop loading
    loading.value = false
  }
  catch (error: any) {
    loading.value = false

    // handel error and push to errors
    if (error.code === 'ERR_NETWORK') {
      items.value = []
      serverErrors.value.push('Netwerk error you have error in your network')
    }
    else if (error.response?.status === '422') {
      items.value = []
      for (const key in error.response.data.errors)
        serverErrors.value.push(error.response.data.errors[key][0])
    }
  }
}

watch(() => item.value.search, (newValue, oldValue) => {
  if (newValue === '') {
    items.value = []
    item.value.search = ''
  }
  if (newValue === null) {
    items.value = []
    item.value.search = ''
  }
})

const selected = ref('')

const autoComplete = () => {
  emit('autoComplete', selected.value)
}

watch(selected, () => emit('update:value', selected))

watchEffect(() => {
  if (props.value)
    selected.value = props.value
})
</script>

<template>
  <div>
    <VCombobox
      v-model="selected"
      v-model:search="item.search"
      :label="props.label"
      :items="items"
      clearable
      density="comfortable"
      item-props
      class="w-100"
      :error-messages="errorMessages"
      :loading="loading"
      @keyup="saveItem"
      @update:model-value="autoComplete"
    />
  </div>
</template>
