<script setup lang="ts">
import UserType from './approvalTypes/user.vue'
import WorkspaceType from './approvalTypes/workspace.vue'

defineProps(['items'])
</script>

<template>
  <div>
    <VCard class="py-5 px-5 mb-5 d-flex">
      <UserType
        v-if="items.type === 'User'"
        :items="items"
      />
      <WorkspaceType
        v-if="items.type === 'Workspace'"
        :items="items"
      />
      <VSpacer />

      <!--
        <div>
        <VBtn :to="`/approvals/approvals/${items.id}/historydata/list`">
        {{ $t('History data') }}
        </VBtn>
        </div>
      -->
    </VCard>
  </div>
</template>
