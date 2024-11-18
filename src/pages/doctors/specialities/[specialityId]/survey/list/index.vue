<script setup lang="ts">
import Speciality from './components/speciality.vue'
import SurveyTable from './components/surveyTable.vue'
import tableHock from '@/helpers/tableHock'

// get route
const route = useRoute()

// Get First surveyId
const SurveyId = ref()

const {
  items,
  loading,
} = tableHock('surveys', false, true, true, { speciality_id: route.params.specialityId })

watchEffect(() => {
  if (items.value[0]?.id)
    SurveyId.value = items.value[0]?.id
})
</script>

<template>
  <div>
    <Breadcrubs
        :links="[
          {
            title: $t('Home'),
            link: '/'
          },
          {
            title: $t('Specialities'),
            link: '/doctors/specialities/list'
          },
          {
            title: $t('Speciality survey')
          }
        ]"
      />
    <PageHeader
      :title="$t('Speciality survey')"
      :text="$t('From here you can manage system speciality survey')"
    />

    <VCard v-if="!SurveyId && !loading">
      <EmptyTable />
    </VCard>

    <Loader v-if="loading" />

    <div v-if="!loading">
      <Speciality
        v-if="SurveyId"
        :items="items"
      />
      <SurveyTable
        v-if="SurveyId"
        :specialityId="route.params.specialityId"
        :items="SurveyId"
      />
    </div>
  </div>
</template>
