<script lang="ts" setup>
import BookingDetails from './components/BookingDetails.vue'
import CalendarDetails from './components/CalendarDetails.vue'
import DoctorDetails from './components/DoctorDetails.vue'
import PatientDetails from './components/PatientDetails.vue'
import Transactions from './components/Transactions.vue'
import SurveyVue from './components/Survey.vue'
import MedicalHistory from './components/MedicalHistory.vue'
import Logs from './components/Logs.vue'
import Attachment from './components/Attachment.vue'
import MedicalAttachment from './components/MedicalAttachment.vue'
import DoctorTags from './components/DoctorTags.vue'
import AssistantTags from './components/AssistantTags.vue'
import WorkspaceTags from './components/WorkspaceTags.vue'
import fetchHock from '@/helpers/fetchHock'

const route = useRoute()

const { item, loading, fetchItem } = fetchHock('bookings', route.params.id as any as number)

watch(() => route.params.id, value => {
  fetchItem()
})

const tab = ref(null)
</script>

<template>
  <div>
    <VRow>
      <VCol
        cols="12"
      >
        <Breadcrubs
          :links="[
            {
              title: $t('Home'),
              link: '/'
            },
            {
              title: $t('Bookings visit'),
              link: '/booking/visit/list'
            },
            {
              title: $t('Details')
            }
          ]"
        />
      </VCol>
      <VCol
        cols="12"
        md="5"
        lg="4"
      >
        <VRow>
          <VCol cols="12">
            <BookingDetails :item="item" :loading="loading" />
          </VCol>
          <VCol cols="12">
            <CalendarDetails :item="item" :loading="loading" />
          </VCol>
          <VCol cols="12">
            <PatientDetails :item="item" :loading="loading" />
          </VCol>
          <VCol cols="12">
            <DoctorDetails :item="item" :loading="loading" />
          </VCol>
        </VRow>
      </VCol>
  
      <VCol
        cols="12"
        md="7"
        lg="8"
      >
        <VRow>
          <VCol cols="12">
            <Loader v-if="loading" />
            <Transactions v-if="item.id" />
          </VCol>
          <VCol cols="12">
            <Loader v-if="loading" />
            <SurveyVue v-if="item.id" />
          </VCol>
          <VCol cols="12">
            <Attachment v-if="item.id" :item="item" :loading="loading" />
          </VCol>
          <VCol cols="12">
            <Loader v-if="loading" />
            <MedicalHistory v-if="item.id" />
          </VCol>
          <VCol cols="12">
            <Loader v-if="loading" />
            <MedicalAttachment v-if="item.id" :item="item" :loading="loading" />
          </VCol>
          <VCol cols="12">
            <Loader v-if="loading" />
            <Logs v-if="item.id" />
          </VCol>
          <VCol cols="12">
            <VCard>
              <VTabs
                v-model="tab"
                align-tabs="center"
                class="v-tabs-pill mt-8"
              >
                <VTab value="overview">
                  {{ $t('Doctor') }}
                </VTab>
                <VTab value="profile">
                  {{ $t('Assistant') }}
                </VTab>
                <VTab value="security">
                  {{ $t('Workspace') }}
                </VTab>
              </VTabs>
              <VCardText class="py-0 px-0">
                <VWindow
                  v-model="tab"
                  class="pt-5"
                >
                  <VWindowItem value="overview">
                    <DoctorTags v-if="item.id" :item="item" :loading="loading" />
                  </VWindowItem>
    
                  <VWindowItem value="profile">
                    <AssistantTags v-if="item.id" :item="item" :loading="loading" />
                  </VWindowItem>
    
                  <VWindowItem value="security">
                    <WorkspaceTags v-if="item.id" :item="item" :loading="loading" />
                  </VWindowItem>
                </VWindow>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VCol>
    </VRow>
  </div>
</template>
