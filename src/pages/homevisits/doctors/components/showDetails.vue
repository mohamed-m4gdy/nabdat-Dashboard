<script setup lang="ts">
defineProps(['id', 'item', 'loading'])

const {t : $t} = useI18n()

const emit = defineEmits(['close'])
</script>

<template>
  <VDialog max-width="600px">
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <!-- 👉 Patient Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Details') }}
        </h6>
        <VList class="card-list">
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Description') }}:
                <span class="text-capitalize text-body-2">{{ item?.description }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Speciality') }}:
                <span class="text-capitalize text-body-2">{{ item?.speciality?.title }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Sub speciality') }}:
                <span class="text-capitalize text-body-2">{{ item?.sub_speciality?.title }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Address') }}:
                <span class="text-capitalize text-body-2">{{ item?.address }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('City') }}:
                <span class="text-capitalize text-body-2">{{ item?.city }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile') }}:
                <span class="text-capitalize text-body-2">{{ item?.mobile }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Created at') }}:
                <span class="text-capitalize text-body-2">{{ item?.created_at }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>
        <VDivider class="mx-5 my-10" />
        <h6 class="text-h6">
          {{ $t('Patient details') }}
        </h6>
        <VList class="card-list">
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Name') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.firstname }} {{ item?.patient?.lastname }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.mobile }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle v-if="item?.patient?.phone">
              <h6 class="text-sm font-weight-medium">
                {{ $t('Phone') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.phone }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Email') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.email }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Gender') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.gender }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Country') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.country?.name }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Created at') }}:
                <span class="text-capitalize text-body-2">{{ item?.patient?.created_at }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Email verified') }}: 
                <VChip
                  v-if="item?.patient?.is_email_verified"
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Active') }}
                </VChip>
                <VChip
                  v-else
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Not active') }}
                </VChip>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile verified') }}: 
                <VChip
                  v-if="item?.patient?.is_mobile_verified"
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Active') }}
                </VChip>
                <VChip
                  v-else
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Not active') }}
                </VChip>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}: 
                <VChip
                  v-if="item?.patient?.active"
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Active') }}
                </VChip>
                <VChip
                  v-else
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Not active') }}
                </VChip>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCardText>
      <VDivider />

      <VDivider class="mb-5" />
      <VCardActions>
        <VSpacer />

        <VBtn
          color="error"
          variant="outlined"
          @click="$emit('close')"
        >
          {{ $t('Close') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss">
.display-flex {
  .v-list-item__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }
}
</style>
