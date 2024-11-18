<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="4" v-for="(item, index) in items.history" :key="index">
        <VCard class="py-5 px-5 mb-5 d-flex">
          <div class="w-100">
            <div class="mb-2 d-flex gap-1" :class="items.object?.title?.title !== item.title.title ? 'highlight' : ''">
              <h4>{{ $t('Title ') }}:</h4>
              <div>{{ item.title?.title }}</div>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss">
.highlight {
  background-color: #bcafc940;
  padding: 5px;
}
</style>
