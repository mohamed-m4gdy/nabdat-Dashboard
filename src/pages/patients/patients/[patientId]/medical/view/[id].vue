<script setup lang="ts">
import Details from './components/details.vue'
import PatientDetails from './components/patientDetails.vue'
import fetchHock from '@/helpers/fetchHock'

// get route
const route = useRoute()

const {
  item,
  loading,
} = fetchHock(`patient/${parseInt(route.params.patientId as string)}/medical-history`, parseInt(route.params.id as string), false )

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'TRADENAME', key: 'medicine.tradename' },
  { title: 'COMPANY', key: 'medicine.company' },
  { title: 'TAGS', key: 'tags' },
  { title: 'COMMENT', key: 'comment' },
]
const headersMedicalAttachments = [
  { title: 'ID', key: 'id' },
  { title: 'FILE', key: 'file' },
  { title: 'DESCRIPTION', key: 'description' },
]

const detailsId = ref()


watchEffect(() => {
  if (item.value.id)
    detailsId.value = item.value.id
})
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
          title: $t('Patients'),
          link: '/patients/patients/list'
        },
        {
          title: $t('Medical history'),
          link: `/patients/patients/${parseInt(route.params.patientId as string)}/medical/list`
        },
        {
          title: $t('Medical details'),
        }
      ]"
    />
    <PageHeader
      :title="$t('Medical details')"
      :text="$t('From here you can manage system Approvals medical details')"
    />
    <Details
      v-if="detailsId && !loading && item.created_by === 'doctor'"
      :items="item"
    />
    <PatientDetails
      v-if="detailsId && !loading && item.created_by === 'patient'"
      :items="item"
    />
    <VCard>
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <h3 class="text-base font-weight-medium"> {{ $t('Medical history') }} </h3>
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
        <tr v-for="medicine in item.history_medicines" :key="medicine.id">
          <td>
            {{ medicine.id }}
          </td>
          <td>
            {{ medicine.medicine.tradename }}
          </td>
          <td>
            {{ medicine.medicine.company }}
          </td>
          <td>
            <span v-for="tag in item.tags">
              <div v-for="link in tag.tags_attachment" v-if="tag?.tags_attachment.length !== 0">
                <VBtn variant="text" :href="link" target="_blank">
                  {{ tag.title }}
                </VBtn>
              </div>
              <div v-else>
                {{ tag.title }}
              </div>
            </span>
          </td>
          <td>
            {{ medicine.comment }}
          </td>
        </tr>
      </tbody>
    </VTable>
    <EmptyTable v-if="!loading && item.history_medicines === 0" />
    </VCard>
    
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
<style lang="scss">
.items-table {
  .invoice-list-search {
    inline-size: 12rem;
  }
}
.v-theme--dark .items-table {
  background:rgb(var(--v-theme-table-header-background));
}
.v-theme--light .items-table {
  background: rgb(249,250,252);
}
</style>
