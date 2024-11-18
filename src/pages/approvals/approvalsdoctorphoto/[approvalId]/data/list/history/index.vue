<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="4" v-for="(item, index) in items.media" :key="index">
        <VCard class="py-5 px-5 mb-5 d-flex">
          <div class="w-100">
            <div class="card-header">
              {{ item.created_at }}
            </div>
            <div class="py-3 px-4">
              <VCardText class="text-center">
                <!-- 👉 photo -->
                <VAvatar
                  rounded="sm"
                  :size="200"
                  :color="items.media.length === 0 ? 'primary' : undefined"
                  :variant="items.media.length === 0 ? 'tonal' : undefined"
                >
                  <VImg
                    v-if="item"
                    :src="item"
                  />
                </VAvatar>
              </VCardText>
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
.v-card.px-3.py-2 {
  padding-top: 8px !important;
  padding-bottom: 8px !important;
  padding-right: 12px !important;
  padding-left: 12px !important;
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
