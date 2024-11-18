<script setup lang="ts">
import Security from './components/security.vue'
import UpdateProfile from './components/updateProfile.vue'
import Bio from './components/bio.vue'
import Details from './components/details.vue'
import tableHock from '@/helpers/tableHock'

const {
  items,
} = tableHock('admin/profile')

const tab = ref(null)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <Bio :items="items" />
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <VTabs
        v-model="tab"
        align-tabs="center"
        class="v-tabs-pill"
      >
        <VTab value="overview">
          <VIcon
            start
            icon="mdi-account-outline"
          />
          {{ $t('OVERVIEW') }}
        </VTab>
        <VTab value="profile">
          {{ $t('Update profile') }}
        </VTab>
        <VTab value="security">
          {{ $t('Update password') }}
        </VTab>
      </VTabs>
      <VCardText class="py-0 px-0">
        <VWindow
          v-model="tab"
          class="pt-5"
        >
          <VWindowItem value="overview">
            <Details :items="items" />
          </VWindowItem>

          <VWindowItem value="profile">
            <UpdateProfile :items="items" />
          </VWindowItem>

          <VWindowItem value="security">
            <Security />
          </VWindowItem>
        </VWindow>
      </VCardText>
    </VCol>
  </VRow>
</template>
