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
              {{ item?.created_at }}
            </div>
            <div class="py-3 px-4">
              <div class="mb-2 d-flex gap-1" :class="items?.object?.first_name?.en !== item?.first_name?.en ? 'highlight' : ''">
                <h4>{{ $t('English first name') }}:</h4>
                <div>{{ item?.first_name?.en }}</div>
              </div>

              <div class="mb-2 d-flex gap-1" :class="items?.object?.first_name?.ar !== item?.first_name?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic first name') }}:</h4>
                <div>{{ item?.first_name?.ar }}</div>
              </div>

              <div class="mb-2 d-flex gap-1" :class="items?.object?.last_name?.en !== item?.last_name?.en ? 'highlight' : ''">
                <h4>{{ $t('English last name') }}:</h4>
                <div>{{ item?.last_name?.en }}</div>
              </div>

              <div class="mb-2 d-flex gap-1" :class="items?.object?.last_name?.ar !== item?.last_name?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic last name') }}:</h4>
                <div>{{ item?.last_name?.ar }}</div>
              </div>

              <div class="mb-2 d-flex gap-1" :class="items?.object?.bio?.en !== item?.bio?.en ? 'highlight' : ''">
                <h4>{{ $t('English bio') }}:</h4>
                <div>{{ item?.bio?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items?.object?.bio?.ar !== item?.bio?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic bio') }}:</h4>
                <div>{{ item?.bio?.ar }}</div>
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
