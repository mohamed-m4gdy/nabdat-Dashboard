<script setup lang="ts">
import Pending from './components/Pending.vue'
import Completed from './components/Completed.vue'
const currentTab = ref(0)
const {t : $t} = useI18n()

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
          title: $t('Bio & name approvals'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Bio & name approvals')"
      :text="$t('From here you can manage system bio & name approvals')"
    />

    <div>
      <VRow class="ms-2 mt-5">
        <VTabs
          v-model="currentTab"
          class="v-tabs-pill d-flex"
        >
          <VTab>
            {{ $t('Pending') }}
          </VTab>
          <VTab>{{ $t('Completed') }}</VTab>
        </VTabs>
      </VRow>
      <VWindow
        v-model="currentTab"
        class="mt-4 mb-5 border py-5 px-5"
      >
        <VWindowItem>
          <Pending />
        </VWindowItem>
        <VWindowItem>
          <Completed />
        </VWindowItem>
      </VWindow>
    </div>
  </div>
</template>
<style scoped lang="css">
.v-btn.v-btn--density-default.v-btn--size-default.v-btn--variant-text.v-tab {
  color: rgb(var(--v-theme-primary));
  border: 1px solid rgb(var(--v-theme-primary));
  margin-left: 15px;
}
.v-tabs.v-tabs-pill .v-slide-group-item--active.v-tab--selected.text-primary {
  color: rgb(var(--v-theme-on-primary)) !important;
}
</style>
