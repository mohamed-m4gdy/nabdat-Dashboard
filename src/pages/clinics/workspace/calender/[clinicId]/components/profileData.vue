<script lang="ts" setup>
    import fetchHock from '@/helpers/fetchHock'
    const route = useRoute()
    const {item} = fetchHock('workspace', route.params.clinicId as any as number)
</script>
<template>
  <VCard :title="item.title">
    <!-- 👉 Details -->
    <!-- <template #append>
      <VBtn :to="`/clinics/workspace/calendarHistoryId/${route.params.clinicId as any as number}/${route.params.id as any as number}`">
        {{ $t('Calendar Logs') }}
      </VBtn>
    </template> -->
    <VCardText>
      <VRow>
        <VCol>
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Doctor') }}:
                  <span class="text-body-2">{{ item.doctor?.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Address') }}:
                  <span class="text-body-2">{{ item.country?.name }} - {{ item.city?.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCol>
        <VCol>
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Mobile') }}:
                  <span class="text-capitalize text-body-2">{{ item.mobile }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
