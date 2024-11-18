<script lang="ts" setup>
defineProps(['item', 'loading'])
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <!-- 👉 Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Attachments') }}
        </h6>
        <VDivider class="my-4" />
        <VList class="card-list d-flex">
          <VListItemTitle class="mb-3" v-for="attach in item.attachments">
            <h6 class="text-sm font-weight-medium">
              <span class="text-capitalize text-body-2">
                <VBtn variant="text" :href="attach" target="_blank">
                  {{ $t('Attachment') }}
                </VBtn>
              </span>
            </h6>
          </VListItemTitle>
        </VList>
      </VCardText>
      <EmptyTable v-if="!loading && item.attachments.length === 0" />
    </VCard>
  </div>
</template>
