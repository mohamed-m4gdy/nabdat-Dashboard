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
              <div class="mb-2 d-flex gap-1" :class="items.object?.title?.title !== item.title?.title ? 'highlight' : ''">
                <h4>
                  {{ $t('Title') }}:
                </h4>
                {{ item.title?.title }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.speciality?.title !== item.speciality?.title ? 'highlight' : ''">
                <h4>
                  {{ $t('Speciality') }}:
                </h4>
                {{ item.speciality?.title }}
              </div>
              <div class="mb-2 d-flex gap-1" v-if="item.sub_speciality?.title"  :class="items.object?.sub_speciality?.title !== item.sub_speciality?.title ? 'highlight' : ''">
                <h4>
                  {{ $t('Sub speciality') }}:
                </h4>
                {{ item.sub_speciality?.title }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="(items.object.first_name !== item.first_name || items.object.last_name !== item.last_name) ? 'highlight' : ''">
                <h4>
                  {{ $t('Name') }}:
                </h4>
                {{ item.first_name }} {{ item.last_name }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.email !== item.email ? 'highlight' : ''">
                <h4>
                  {{ $t('Email') }}:
                </h4>
                {{ item.email }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.national_number !== item.national_number ? 'highlight' : ''">
                <h4>
                  {{ $t('National number') }}:
                </h4>
                {{ item.national_number }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.mobile !== item.mobile ? 'highlight' : ''">
                <h4>
                  {{ $t('Mobile') }}:
                </h4>
                {{ item.mobile }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.calling_code !== item.calling_code ? 'highlight' : ''">
                <h4>
                  {{ $t('Calling code') }}:
                </h4>
                {{ item.calling_code }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.default_language?.name !== item.default_language.name ? 'highlight' : ''">
                <h4>
                  {{ $t('Language') }}:
                </h4>
                {{ item.default_language?.name }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.dob !== item.dob ? 'highlight' : ''">
                <h4>
                  {{ $t('Birthday') }}:
                </h4>
                {{ item.dob }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.origin_country?.name !== item.origin_country.name ? 'highlight' : ''">
                <h4>
                  {{ $t('Origin country') }}:
                </h4>
                {{ item.origin_country?.name }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.country?.name !== item.country.name ? 'highlight' : ''">
                <h4>
                  {{ $t('Country') }}:
                </h4>
                {{ item.country?.name }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.government?.name !== item.government.name ? 'highlight' : ''">
                <h4>
                  {{ $t('Governorate') }}:
                </h4>
                {{ item.government?.name }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.city?.name !== item.city.name ? 'highlight' : ''">
                <h4>
                  {{ $t('City') }}:
                </h4>
                {{ item.city?.name }}
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.gender !== item.gender ? 'highlight' : ''">
                <h4>
                  {{ $t('Gender') }}:
                </h4>
                {{ item.gender }}
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
