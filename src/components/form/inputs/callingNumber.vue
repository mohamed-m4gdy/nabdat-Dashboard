<script setup lang="ts">
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'

const prop = defineProps(['paths', 'value', 'errorMessages', 'icon'])
const emit = defineEmits(['update:value'])
const select = ref()
const loading = ref<boolean>(false)
const items = ref([])

const fetchItems = () => {
  loading.value = true
  axios.get(linkGenrator('calling_codes')).then(response => {
      items.value = response.data?.data ?? []
      // stop loader
      loading.value = false
    })
    .catch(() => {
      loading.value = false
    })
}

watchEffect(() => {
  if(prop.value) {
    if(typeof select.value === 'undefined') {
      select.value = prop.value
    }
  }
})

watch(select, () => {
  if(select.value.calling_code) {
    emit('update:value', select.value.calling_code)
  }
})

</script>

<template>
  <div class="customCodeNumber">
    <VSelect
      v-model="select"
      :loading="loading"
      :items="items"
      item-title="value"
      item-value="key"
      :error-messages="errorMessages"
      @focus="fetchItems()"
    >
      <template #chip="{ props, item }">
        <VChip
          v-bind="props"
          :prepend-avatar="icon ? icon : item.value.icon"
          :text="item.value.calling_code"
        />
      </template>
  
      <template #item="{ props, item }">
        <VListItem
          v-bind="props"
          :prepend-avatar="item?.value?.icon"
          :title="item?.value?.calling_code"
        />
      </template>
    </VSelect>
  </div>
</template>

<style lang="scss">
.customCodeNumber {
  .v-field__append-inner {
    color: unset !important;
    background: unset !important;
    position: absolute;
    left: -30px;
  }
  .v-field--appended {
    padding-inline-end: 0;
    color: unset !important;
    background: unset !important;
  }
  .v-autocomplete .v-field .v-text-field__prefix, .v-autocomplete .v-field .v-text-field__suffix, .v-autocomplete .v-field .v-field__input, .v-autocomplete .v-field.v-field {
    padding: 0;
    color: unset !important;
    background: unset !important;
  }
  .v-chip.v-chip--density-default {
    height: 100%;
    background: none !important;
    border-radius: 0 !important;
    font-size: 11px;
    color: unset !important;
    background: unset !important;
  }
  .v-field__field {
    display: block;
    grid-area: none;
    color: unset !important;
    background: unset !important;
  }
  .v-field__input {
    padding: 0;
    color: unset !important;
    background: unset !important;
  }
  .v-autocomplete .v-field .v-field__input > input {
    display: none !important;
    color: unset !important;
    background: unset !important;
  }
  .v-chip.v-chip--size-small .v-avatar {
    width: 30px;
    height: 30px;
    border-radius: 0;
    margin-inline-start: -5px;
    margin-inline-end: 1px;
    color: unset !important;
    background: unset !important;
  }
  .v-avatar--density-default.v-avatar--size-default.v-avatar--variant-flat {
    border-radius: 0 !important;
    color: unset !important;
    background: unset !important;
  }
}
</style>
