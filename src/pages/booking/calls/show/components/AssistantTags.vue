<script setup lang="ts">
defineProps(['item', 'loading'])

// table headers
const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TITLE', key: 'title' },
]
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <VCard class="mt-5">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <h3 class="text-base font-weight-medium"> {{ $t('Assistant tags') }} </h3>
        <VSpacer />
      </VCardText>
    <VTable>
      <!-- table header -->
      <thead class="items-table">
        <tr>
          <template v-for="(header) in headers" :key="index">
            <th class="text-uppercase">
              {{ $t(header.title) }}
            </th>
          </template>
        </tr>
      </thead>
      <!-- table body -->
      <tbody>
        <tr v-for="i in item?.workspace_tags.assistant" :key="i.id">
          <td>
            {{ i.id }}
          </td>
          <td>
            {{ i.title }}
          </td>
        </tr>
      </tbody>
    </VTable>
    <EmptyTable v-if="!loading && item?.workspace_tags.length === 0" />
    </VCard>
  </div>
</template>
