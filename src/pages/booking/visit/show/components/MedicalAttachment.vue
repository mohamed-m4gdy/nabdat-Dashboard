<script lang="ts" setup>
defineProps(['item', 'loading'])

const headersMedicalAttachments = [
  { title: 'ID', key: 'id' },
  { title: 'FILE', key: 'file' },
  { title: 'DESCRIPTION', key: 'description' },
]
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <VCard class="mt-5" v-if="item?.medical_attachments">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <h3 class="text-base font-weight-medium"> {{ $t('Medical attachments') }} </h3>
        <VSpacer />
      </VCardText>
    <VTable>
      <!-- table header -->
      <thead class="items-table">
        <tr>
          <template v-for="(header) in headersMedicalAttachments" :key="index">
            <th class="text-uppercase">
              {{ $t(header.title) }}
            </th>
          </template>
        </tr>
      </thead>
      <!-- table body -->
      <tbody>
        <tr v-for="medicine in item?.medical_attachments" :key="medicine.id">
          <td>
            {{ medicine.id }}
          </td>
          <td>
            <VBtn variant="text" :href="medicine?.file" target="_blank">
              {{ $t('File') }}
            </VBtn>
          </td>
          <td>
            {{ medicine.description }}
          </td>
        </tr>
      </tbody>
    </VTable>
    <EmptyTable v-if="!loading && item?.medical_attachments.length === 0" />
    </VCard>
  </div>
</template>
