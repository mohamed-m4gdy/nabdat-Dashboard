<script setup lang="ts">

const { locale } = useI18n({ useScope: 'global' })

defineProps(['id', 'item', 'loading'])

const emit = defineEmits(['close'])

const {t : $t} = useI18n()
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
          {{ $t('Patient details') }}
        </h6>
        <VList class="card-list">
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Name') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.firstname }} {{ item.patient.lastname }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.mobile }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Phone') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.phone }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Email') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.email }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Gender') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.gender }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Country') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.country }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}: 
                <VChip
                  v-if="item.patient.active"
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
                {{ $t('Email verified') }}:
                <VChip
                  v-if="item.patient.is_email_verified"
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Verified') }}
                </VChip>
                <VChip
                  v-else
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Not verified') }}
                </VChip>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile verified') }}:
                <VChip
                  v-if="item.patient.is_mobile_verified"
                  color="success"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Verified') }}
                </VChip>
                <VChip
                  v-else
                  color="error"
                  class="font-weight-medium"
                  size="small"
                >
                  {{ $t('Not verified') }}
                </VChip>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Created at') }}:
                <span class="text-capitalize text-body-2">{{ item.patient.created_at }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>
        <VDivider class="my-5" />
        <h6 class="text-h6">
          {{ $t('Booking details') }}
        </h6>
        
        <VList class="card-list mt-5">
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Booking status') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.status.title[locale as 'ar' | 'en'] }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Code') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.status.code }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status description') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.status.description }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Type') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.type }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Calender id') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.calendar_id }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Created at') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.status.created_at }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Updated at') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.status.updated_at }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Booking date') }}:
                <span class="text-capitalize text-body-2">{{ item.booking.booking_date }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>

        <VDivider class="my-5" />
        <h6 class="text-h6">
          {{ $t('Support category details') }}
        </h6>
        
        <VList class="card-list mt-5">
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Title') }}:
                <span class="text-capitalize text-body-2">{{ item.support_category.title }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Type') }}:
                <span class="text-capitalize text-body-2">{{ item.support_category.type }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Sorting') }}:
                <span class="text-capitalize text-body-2">{{ item.support_category.sorting }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.support_category.status"
                    color="primary"
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Active') }}
                  </VChip>
                  <VChip
                    v-else
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Not active') }}
                  </VChip>
                </span>
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
