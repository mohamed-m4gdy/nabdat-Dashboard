<script lang="ts" setup>
import type { GridColumn } from '@core/types'
import {slotItem, dayType} from "./slotItem"
// props and emits data
interface Props {
  selectedCheckbox: dayType
  checkboxContent: slotItem[]
  gridColumn?: GridColumn
}
interface Emit {
  (e: 'update:selectedCheckbox', value: dayType): void
}
const props = defineProps<Props>()
const emit = defineEmits<Emit>()

// multy select logic

// sellected ref
const selectedOption = ref<slotItem[]>(props.selectedCheckbox.slots)

watch(selectedOption, () => emit('update:selectedCheckbox', {
  day: props.selectedCheckbox.day,
  slots: selectedOption.value
}), {deep: true})

watch(()=> props.selectedCheckbox.slots, (value) => selectedOption.value = value, {deep: true})
</script>

<template>
  <VRow
  >
    <VCol
      v-for="(item, index) in props.checkboxContent"
      :key="index"
      v-bind="gridColumn"
      :sm="2"
    >
      <div
        class="custom-checkbox rounded cursor-pointer btn btn-primary"
        :class="{ 
          'selected' : selectedOption.find(el => el.start_time == item.start_time && el.end_time == item.end_time),
          'disabbled-butten': !item.enabled
        }"
      >
        {{ item.start_time }}
      </div>
    </VCol>
  </VRow>
</template>

<style lang="scss" scoped>
.custom-checkbox {
  display: block;
  padding: 0.5em;
  position: relative;
  text-align: center;
  border-color: rgb(var(--v-theme-primary)) !important;
  border: 1px solid;
  width: 100%;
  line-height: 20px;

  .hideCheck {
    position: absolute;
    opacity: 0;
  }
  .cr-title {
    font-weight: 500;
  }
}
.selected{
  background: rgb(var(--v-theme-primary)) !important;
  border-color: rgb(var(--v-theme-primary)) !important;
  color: white !important;
}

.disabbled-butten {
  background: #eee;
  border: #eee;
}
.v-theme--dark {
  .disabbled-butten {
    background: #eee6;
    border: #eee;
  }
}
</style>
