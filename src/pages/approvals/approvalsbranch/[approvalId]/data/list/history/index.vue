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
              <div class="mb-2 d-flex gap-1" :class="items.object?.name?.en !== item.name?.en ? 'highlight' : ''">
                <h4>{{ $t('English name') }}:</h4>
                <div>{{ item.name?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.name?.ar !== item.name?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic name') }}:</h4>
                <div>{{ item.name?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.address?.en !== item.address?.en ? 'highlight' : ''">
                <h4>{{ $t('English address') }}:</h4>
                <div>{{ item.address?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.address?.ar !== item.address?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic address') }}:</h4>
                <div>{{ item.address?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1 align-center flex-wrap" :class="items.object?.specialities_obj.length !== item.specialities_obj.length ? 'highlight' : ''">
                <h4>{{ $t('Specialities') }}:</h4>
                <div>
                  <div v-for="(speciality, index) in items.object.specialities_obj" :key="index">
                    <div>{{ speciality.title }}</div>
                  </div>
                </div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.organization?.name !== item.organization?.name ? 'highlight' : ''">
                <h4>{{ $t('Organization') }}:</h4>
                <div>{{ item.organization?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.main_branch !== item.main_branch ? 'highlight' : ''">
                <h4>{{ $t('Main branch') }}:</h4>
                <div>
                  <VChip
                      v-if="items.object.main_branch"
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
              <div class="mb-2 d-flex gap-1" :class="items.object?.city?.name !== item.city?.name ? 'highlight' : ''">
                <h4>{{ $t('City') }}:</h4>
                <div>{{ item.city?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.lat !== item.lat ? 'highlight' : ''">
                <h4>{{ $t('Lat') }}:</h4>
                <div>{{ item.lat }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.lon !== item.lon ? 'highlight' : ''">
                <h4>{{ $t('Lon') }}:</h4>
                <div>{{ item.lon }}</div>
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
