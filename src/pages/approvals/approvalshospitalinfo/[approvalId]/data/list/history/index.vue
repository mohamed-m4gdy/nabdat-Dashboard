<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="4" v-for="(item, index) in items.history" :key="index">
        <VCard class="py-5 px-5 mb-5 d-flex">
          <div class="w-100">
            <div class="card-header">
              {{ item.created_at }}
            </div>
            <div class="py-3 px-4">
              <div class="mb-2 d-flex gap-1" :class="items.object.name.en !== item.name.en ? 'highlight' : ''">
                <h4>{{ $t('English name') }}:</h4>
                <div>{{ item.name.en }}</div>
              </div>

              <div class="mb-2 d-flex gap-1" :class="items.object.name.ar !== item.name.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic name') }}:</h4>
                <div>{{ item.name.ar }}</div>
              </div>

              <div class="mb-2 d-flex gap-1" :class="items.object.descriptions.en !== item.descriptions.en ? 'highlight' : ''">
                <h4>{{ $t('English descriptions') }}:</h4>
                <div>{{ item.descriptions.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object.descriptions.ar !== item.descriptions.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic descriptions') }}:</h4>
                <div>{{ item.descriptions.ar }}</div>
              </div>
            </div>
          </div>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.v-card {
  padding: 0 !important;
}
.card-header {
  background-color: #0000003b;
    padding: 15px;
    margin-bottom: 15px;
    color: #fff;
    text-align: center;
}
.highlight {
  background-color: #bcafc940;
  padding: 5px;
}
</style>
