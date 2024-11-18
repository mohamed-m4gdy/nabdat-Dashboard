<script setup lang="ts">
import axios from '@axios'
import linkGenrator from '@/helpers/linkGenrator'

const props = defineProps(['path', 'label', 'limit', 'value', 'errorMessages', 'title'])

const emit = defineEmits(['autoComplete', 'update:value', 'onSelect'])

interface searchForm {
  search: string
}

// prepare item
const searchSetup: searchForm = {
  search: '',
}

const item = ref<searchForm>(searchSetup)
const loading = ref<boolean>(false)
const serverErrors = ref<string[]>([])
const items = ref([])

const saveItem = async () => {
  if(item.value.search !== '') {
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
}

const selected = ref([])

watch(selected, fullObject => {
  emit('update:value', fullObject)
  emit('onSelect', fullObject)
})

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
      :items="items.map((item: any) => { return item })"
      :item-title="title"
      item-value="id"
      :label="props.label"
      clearable
      density="comfortable"
      item-props
      class="w-100"
      :error-messages="errorMessages"
      :loading="loading"
      @keyup="saveItem"
    />
  </div>
</template>
