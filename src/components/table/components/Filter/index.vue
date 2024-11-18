<script setup lang="ts">
const props = defineProps(['fillters', 'selected'])

const {t : $t} = useI18n()

const emit = defineEmits(['addFilter', 'resetFilter'])
const addFilter = (key: string, value: string, noKeyFilter: boolean) => emit('addFilter', key, value, noKeyFilter)

const componentKey = ref(0)

const reset = () => {
  emit('resetFilter')
  componentKey.value += 1
  props.fillters.map((el: any) => {
    el.filterVal = null
    if (el.dissabled === false) {
      el.dissabled = true
    }
  })
}
</script>

<template>
  <VCard
    :title="$t('Filters')"
    class="mb-6"
  >
    <VCardText>
      <VRow>
        <!-- 👉 Status filter -->
        <VCol
          v-for="fillter in fillters"
          cols="12"
          :md="fillter.cols ? fillter.cols : 4"
        >
          <FilterItem
            :key="componentKey"
            :fillter="fillter"
            :value="selected ? selected[fillter.prop] : ''"
            @addFilter="addFilter"
            @change="fillter.change"
          />
        </VCol>
        <VCol cols="12">
          <VBtn color="secondary" @click="reset">
            {{ $t('Reset Filter') }}
          </VBtn>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
