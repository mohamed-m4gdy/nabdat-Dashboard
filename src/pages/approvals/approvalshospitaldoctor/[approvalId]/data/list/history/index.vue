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
              <div class="mb-2 d-flex gap-1" :class="items.object?.first_name?.en !== item.first_name?.en ? 'highlight' : ''">
                <h4>{{ $t('English first name') }}:</h4>
                <div>{{ item.first_name?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.first_name?.ar !== item.first_name?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic first name') }}:</h4>
                <div>{{ item.first_name?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.last_name?.en !== item.last_name?.en ? 'highlight' : ''">
                <h4>{{ $t('English last name') }}:</h4>
                <div>{{ item.last_name?.en }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.last_name?.ar !== item.last_name?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic last name') }}:</h4>
                <div>{{ item.last_name?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.bio?.ar !== item.bio?.ar ? 'highlight' : ''">
                <h4>{{ $t('Arabic bio') }}:</h4>
                <div>{{ item.bio?.ar }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.bio?.en !== item.bio?.en ? 'highlight' : ''">
                <h4>{{ $t('English bio') }}:</h4>
                <div>{{ item.bio?.en }}</div>
              </div>
              
              <div class="mb-2 d-flex gap-1" :class="items.object.hospital.name !== item.hospital.name ? 'highlight' : ''">
                <h4>{{ $t('Hospital') }}:</h4>
                <div>{{ item.hospital?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object.branch.name !== item.branch.name ? 'highlight' : ''">
                <h4>{{ $t('Branch') }}:</h4>
                <div>{{ item.branch?.name }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.title.title !== item.title.title ? 'highlight' : ''">
                <h4>{{ $t('Title ') }}:</h4>
                <div>{{ item.title.title }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.speciality?.title !== item.speciality?.title ? 'highlight' : ''">
                <h4>{{ $t('Speciality') }}:</h4>
                <div>{{ item.speciality?.title }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" v-if="item.sub_speciality?.title" :class="items.object?.sub_speciality?.title !== item.sub_speciality?.title ? 'highlight' : ''">
                <h4>{{ $t('Sub Speciality') }}:</h4>
                <div>{{ item.sub_speciality?.title }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.national_number !== item.national_number ? 'highlight' : ''">
                <h4>{{ $t('National number') }}:</h4>
                <div>{{ item.national_number }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.email !== item.email ? 'highlight' : ''">
                <h4>{{ $t('Email') }}:</h4>
                <div>{{ item.email }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.mobile !== item.mobile ? 'highlight' : ''">
                <h4>{{ $t('Mobile') }}:</h4>
                <div>{{ item.calling_code }}{{ item.mobile }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.phone !== item.phone ? 'highlight' : ''">
                <h4>{{ $t('Phone') }}:</h4>
                <div>{{ item.phone }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.gender !== item.gender ? 'highlight' : ''">
                <h4>{{ $t('Gender') }}:</h4>
                <div>{{ item.gender }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.dob !== item.dob ? 'highlight' : ''">
                <h4>{{ $t('Birthday') }}:</h4>
                <div>{{ item.dob }}</div>
              </div>
              <div class="mb-2 d-flex gap-1" :class="items.object?.default_language.name !== item.default_language.name ? 'highlight' : ''">
                <h4>{{ $t('Default language') }}:</h4>
                <div>{{ item.default_language.name }}</div>
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
              <div class="mb-2 d-flex gap-1" :class="items.object?.origin_country?.name !== item.origin_country?.name ? 'highlight' : ''">
                <h4>{{ $t('Origin country') }}:</h4>
                <div>{{ item.origin_country?.name }}</div>
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
