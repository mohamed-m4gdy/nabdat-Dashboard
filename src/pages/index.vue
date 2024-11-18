<script setup lang="ts">
import tableHock from '@/helpers/tableHock'
import DoctorImage from '@images/avatars/doctor.png'
import PatientImage from '@images/avatars/patients.png'
import { useGlobalStore } from '@/helpers/global'

import { useGeolocation } from '@/helpers/useGeolocation'

interface CardCounts {
  doctors_count: number;
  patients_count: number;
  bookings_count: number;
}

const {t : $t} = useI18n()

const store = useGlobalStore()

const { coords } = useGeolocation()

watch(coords, () => {
  store.setCoords(coords.value)
})

const {
  loading,
  items,
} = tableHock<CardCounts>('dashboard/cards')

</script>

<template>
  <section v-if="!loading">
    <VRow class="match-height">
      <VCol cols="12">
        <VRow>
          <VCol
            cols="12"
            md="8"
          >
            <BookingCard :item="items" />
          </VCol>
          <VCol 
            cols="12"
            md="4"
          >
            <VRow>
              <VCol
                cols="12"
                class="d-flex flex-column"
              >
                <VCard class="overflow-visible">
                  <div class="position-relative">
                    <VCardText>
                      <h6 class="text-base font-weight-medium mb-6">
                        {{ $t('Total balance') }}
                      </h6>
                    </VCardText>
  
                    <VCardText>
                      <div class="d-flex align-center flex-wrap mt-5 mb-3">
                        <h5 class="text-h5 me-2">
                          {{ items.total_balance }}
                        </h5>
                      </div>
                    </VCardText>
                    <div class="illustrator-img me-5 mb-5">
                      <VIcon
                        size="80"
                        icon="mdi-cash-multiple"
                      />
                    </div>
                  </div>
                </VCard>
              </VCol>
              <VCol
                cols="12"
                class="d-flex flex-column"
              >
                <VCard class="overflow-visible">
                  <div class="position-relative">
                    <VCardText>
                      <h6 class="text-base font-weight-medium mb-6">
                        {{ $t('Holded balance') }}
                      </h6>
                    </VCardText>
  
                    <VCardText>
                      <div class="d-flex align-center flex-wrap mt-5 mb-3">
                        <h5 class="text-h5 me-2">
                          {{ items.holded }}
                        </h5>
                      </div>
                    </VCardText>
                    <div class="illustrator-img me-5 mb-5">
                      <VIcon
                        size="80"
                        icon="mdi-wallet"
                      />
                    </div>
                  </div>
                </VCard>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </VCol>
      <VCol cols="12" md="6">
        <RevenueSettings api-url="reports/revenue" :card-title="$t('Total Revenue')" />
      </VCol>
      <VCol cols="12" md="6">
        <RevenueSettings api-url="reports/hospital-revenue" :card-title="$t('Hospital Revenue')" />
      </VCol>
      <VCol cols="12" md="6">
        <RevenueSettings api-url="reports/clinic-revenue" :card-title="$t('Clinic Revenue')" />
      </VCol>
      <VCol cols="12" md="6">
        <VRow>
          <VCol
            cols="12"
            class="d-flex flex-column align-self-end mt-5"
          >
            <VCard class="overflow-visible">
              <div class="position-relative">
                <VCardText>
                  <h6 class="text-base font-weight-medium mb-6">
                    {{ $t('Doctor Count') }}
                  </h6>
                </VCardText>
    
                <VCardText>
                  <div class="d-flex align-center flex-wrap mt-1 mb-1">
                    <h5 class="text-h5 me-2">
                      {{ items.doctors_count }}
                    </h5>
                  </div>
                </VCardText>
                <div class="illustrator-img">
                  <VImg
                    :src="DoctorImage"
                    :width="170"
                  />
                </div>
              </div>
            </VCard>
          </VCol>
          <VCol
            cols="12"
            class="d-flex flex-column align-self-end"
          >
            <VCard class="overflow-visible">
              <div class="position-relative">
                <VCardText>
                  <h6 class="text-base font-weight-medium mb-6">
                    {{ $t('Patients Count') }}
                  </h6>
                </VCardText>
    
                <VCardText>
                  <div class="d-flex align-center flex-wrap mt-1 mb-1">
                    <h5 class="text-h5 me-2">
                      {{ items.patients_count }}
                    </h5>
                  </div>
                </VCardText>
                <div class="illustrator-img">
                  <VImg
                    :src="PatientImage"
                    :width="150"
                  />
                </div>
              </div>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
      <VCol
        cols="12"
        md="12"
      >
        <DashboardTable />
      </VCol>
    </VRow>
  </section>
</template>

<style lang="scss">
.content-between {
  justify-content: space-between;
}
.illustrator-img {
  position: absolute;
  inset-block-end: 0;
  inset-inline-end: 5%;
}
</style>
