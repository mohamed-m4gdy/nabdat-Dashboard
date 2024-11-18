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
              <div class="mb-2 d-flex gap-1" :class="items.object?.title?.en !== item.title?.en ? 'highlight' : ''">
                <h4>{{ $t('English title') }}:</h4>
                <div>{{ item.title?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.title?.ar !== item.title?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic title') }}:</h4>
                <div>{{ item.title?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.address?.en !== item.address?.en ? 'highlight' : ''">
                <h4>{{ $t('English address') }}:</h4>
                <div>{{ item.address?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.address?.ar !== item.address?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic address') }}:</h4>
                <div>{{ item.address?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.speciality?.title !== item.speciality?.title ? 'highlight' : ''">
                <h4>{{ $t('Speciality') }}:</h4>
                <div>{{ item.speciality?.title }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.organization?.name !== item.organization?.name ? 'highlight' : ''">
                <h4>{{ $t('Organization') }}:</h4>
                <div>{{ item.organization?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" v-if="item.branch?.name" :class="items.object?.branch?.name !== item.branch?.name ? 'highlight' : ''">
                <h4>{{ $t('Branch') }}:</h4>
                <div>{{ item.branch?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" v-if="item.mobile" :class="items.object?.mobile !== item.mobile ? 'highlight' : ''">
                <h4>{{ $t('Mobile') }}:</h4>
                <div>{{ item.mobile }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.country?.name !== item.country?.name ? 'highlight' : ''">
                <h4>{{ $t('Country') }}:</h4>
                <div>{{ item.country?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.government?.name !== item.government?.name ? 'highlight' : ''">
                <h4>{{ $t('Governorate') }}:</h4>
                <div>{{ item.government?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.city?.name !== item.city?.name ? 'highlight' : ''">
                <h4>{{ $t('City') }}:</h4>
                <div>{{ item.city?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.accept_discount_code !== item.accept_discount_code ? 'highlight' : ''">
                <h4>{{ $t('Accept discount') }}:</h4>
                <div>
                  <VChip
                      v-if="items.object.accept_discount_code"
                      color="success"
                      class="font-weight-medium"
                      size="small"
                    >
                      {{ $t('Active') }}
                    </VChip>
                    <VChip
                      v-else
                      color="error"
                      class="font-weight-medium"
                      size="small"
                    >
                      {{ $t('Not active') }}
                    </VChip>
                </div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.lat_lon !== item.lat_lon ? 'highlight' : ''">
                <h4>{{ $t('Lat and lon') }}:</h4>
                <div>{{ item.lat_lon }}</div>
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
