<script setup lang="ts">
defineProps(['items'])

const { locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <div>
    <div class="mb-2">
      {{ $t('Title') }}:
      {{ locale === 'en' ? items.object?.title.en : items.object?.title.ar }}
    </div>
    <div class="mb-2">
      {{ $t('Address') }}:
      {{ items.object?.address }}
    </div>
    <div class="mb-2">
      {{ $t('Mobile') }}:
      {{ items.object?.mobile }}
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
