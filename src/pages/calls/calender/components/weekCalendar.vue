<script setup lang="ts">
    import Slot from './slotBoxes.vue'
    import type dayType from '@/components/form/inputs/slotItem'

    interface Props {
        value: dayType[]
        slotsCalender: dayType[] | null
    }
    interface Emit {
        (e: 'update:value', value: dayType[]): void
    }
    const props = defineProps<Props>()
    const emit = defineEmits<Emit>()

    const calender = ref<dayType[]>(props.value)

    watch(calender, (value) => emit('update:value', calender.value), {deep: true})
    watch(() => props.value , (value) => calender.value = value)
</script>
<template>
  <VExpansionPanels variant="accordion" v-if="props.slotsCalender">
    <VExpansionPanel v-for="(day, index) in props.slotsCalender" :key="index">
      <VExpansionPanelTitle>
        {{ $t(day.day) }}
      </VExpansionPanelTitle>
      <VExpansionPanelText>
        <Slot
          v-model:selected-checkbox="calender[index]"
          :checkbox-content="day.slots"
        />
      </VExpansionPanelText>
    </VExpansionPanel>
  </VExpansionPanels>
</template>
