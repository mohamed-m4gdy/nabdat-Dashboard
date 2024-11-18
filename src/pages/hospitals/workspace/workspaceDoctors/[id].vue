<script setup lang="ts">
import profileData from './components/profileData.vue'
import worktimes from './components/worktimes.vue'

const spicialtyId = ref()

const updateSpicialty = (value: number) => spicialtyId.value = value


defineComponent(['profileData', 'worktimes'])
</script>

<template>
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
            title: $t('Hospitals workspace'),
            link: '/hospitals/workspace/list'
          },
          {
            title: $t('Work times')
          }
        ]"
      />
    </VCol>
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <profileData @updateSpicialty="updateSpicialty" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <worktimes :spicialtyId="spicialtyId"/>
    </VCol>
  </VRow>
</template>
