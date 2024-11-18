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
      <!-- 👉 Doctor Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Doctor details') }}
        </h6>
        <VList class="card-list">
          <div class="text-center">
            <VAvatar
              rounded="sm"
              :size="120"
              :color="!item.doctor.photo ? 'primary' : undefined"
              :variant="!item.doctor.photo ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.doctor.photo"
                :src="item.doctor.photo"
              />
            </VAvatar>
          </div>
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Name') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor.name }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Title') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor.title }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Speciality') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor?.specialities[0]?.title }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Bio') }}:
                <!-- <span class="text-capitalize text-body-2">{{ item.doctor.bio[locale as 'ar' | 'en'] }}</span> -->
                <span class="text-capitalize text-body-2 text-wrap">{{ item.doctor.bio }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Phone') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor.phone }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Profile visit count') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor.profile_visit_count }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium d-flex align-center gap-1">
                {{ $t('Average rating') }}:
                <span class="text-capitalize text-body-2">
                  <VRating
                    readonly
                    :size="19"
                    :model-value="item.doctor.avg_rating"
                  />
                </span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Distance') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor?.distance }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle class="display-flex">
              <h6 class="text-sm font-weight-medium">
                {{ $t('Promoted') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.doctor.is_promoted"
                    color="primary"
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Promoted') }}
                  </VChip>
                  <VChip
                    v-else
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Not promoted') }}
                  </VChip>
                </span>
              </h6>
            </VListItemTitle>
            <VListItemTitle class="display-flex">
              <h6 class="text-sm font-weight-medium">
                {{ $t('Favorite') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.doctor.is_favorite"
                    color="primary"
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Favorite') }}
                  </VChip>
                  <VChip
                    v-else
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Not favorite') }}
                  </VChip>
                </span>
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
