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
const multySelectStart = ref<number | null>(null)
const multySelectEnd = ref<number | null>(null)
const multySelectItem = ref<slotItem[]>([])

const selectMulty = (index: number) => {
  if(typeof multySelectStart.value != 'number') {
    multySelectStart.value = index
    multySelectHover(index)
  } else {
    multySelectItem.value.forEach(item => {
      if(!selectedOption.value.find(el => el.start_time == item.start_time && el.end_time == item.end_time && el.enabled)) selectedOption.value.push(item)
    })
    multySelectStart.value = null
    // logic of select
  }
}

const multySelectHover = (index: number) => {
  if (typeof multySelectStart.value == 'number') {
    multySelectItem.value = []
    multySelectEnd.value = index
    const startLoop = index > multySelectStart.value ? multySelectStart.value : index
    const endLoop = index > multySelectStart.value ? index : multySelectStart.value
    for(let i = startLoop; i <= endLoop; i++) {
      const item = props.checkboxContent[i]
      if (item.enabled) {
        multySelectItem.value.push(item)
      }
    }
  }
}
const multySelectRemove = () => {
  multySelectItem.value = []
  multySelectEnd.value = null
}

// sellected ref
const selectedOption = ref<slotItem[]>(props.selectedCheckbox.slots)
// select event
const selectOption = (value: slotItem, index: number) => {
  if (value.enabled) {
    const item = selectedOption.value.filter(el => el.start_time == value.start_time && el.end_time == value.end_time)[0]
    const itemIndex = item ? selectedOption.value.indexOf(item) : -1
    if (itemIndex >= 0)
      selectedOption.value.splice(itemIndex, 1)
    else {
      selectMulty(index)
    }
  }
}

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
      <button
        class="custom-checkbox rounded cursor-pointer btn btn-primary"
        :class="{ 
          'selected' : selectedOption.find(el => el.start_time == item.start_time && el.end_time == item.end_time),
          'startpoint': index == multySelectStart,
          'endpoint': index == multySelectEnd,
          'inselect': multySelectItem.find(el => el.start_time == item.start_time && el.end_time == item.end_time),
          'disabbled-butten': !item.enabled
        }"
        @click="selectOption(item, index)"
        @mouseover="() => {if(item.enabled) multySelectHover(index)}"
        @mouseleave="multySelectRemove"
        type="button"
        
      >
        {{ item.start_time }}
      </button>
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
.inselect {
  background: rgb(var(--v-theme-secondary)) !important;
  border-color: rgb(var(--v-theme-secondary)) !important;
  color: white !important;
}
.startpoint, .endpoint {
  background: rgb(var(--v-theme-info)) !important;
  border-color: rgb(var(--v-theme-info)) !important;
  color: white !important;
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
