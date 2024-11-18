<script setup lang="ts">
defineProps(['items'])
</script>

<template>
  <div>
    <div class="mb-2">
      {{ $t('Name') }}:
      {{ items.object?.firstname }} {{ items.object?.lastname }}
    </div>
    <div class="mb-2">
      {{ $t('Email') }}:
      {{ items.object?.email }}
    </div>
    <div class="mb-2">
      {{ $t('Mobile') }}:
      {{ items.object?.mobile }}
    </div>
    <div class="mb-2">
      {{ $t('Gender') }}:
      {{ items.object?.gender }}
    </div>
    <div class="mb-2">
      {{ $t('Action') }}:
      {{ items.action }}
    </div>
    <div class="mb-2">
      {{ $t('Type') }}:
      {{ items.type }}
    </div>
    <div class="mb-2">
      {{ $t('Created at') }}:
      {{ items.created_at }}
    </div>
  </div>
</template>
