<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'
import Logs from './components/Logs.vue'

// get route
const route = useRoute()

const { item, loading } = fetchHock('calendar-logs/show', route.params.id as any as number)
</script>

<template>
  <div>
    <div>
      <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Calendar Edit history'),
          link: '/editcalendarhistory/list'
        },
        {
          title: $t('History')
        }
      ]"
    />
    </div>
    <div class="mb-5">
      <Loader v-if="loading" />
      <Logs
        v-if="item.calendar_log_edit_id && !loading"
        :items="item"
      />
    </div>
  </div>
</template>
