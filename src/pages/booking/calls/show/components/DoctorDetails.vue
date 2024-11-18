<script lang="ts" setup>
defineProps(['item', 'loading'])
const { locale } = useI18n({ useScope: 'global' })
</script>

<template>
  <div>
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <!-- 👉 Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Doctor details') }}
        </h6>
        <VDivider class="my-4" />
        <VList class="card-list">
          <div class="text-center mb-3">
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
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Doctor') }}:
              <span class="text-capitalize text-body-2">
                {{ item.doctor.first_name[locale as 'ar' | 'en'] }}
                {{ item.doctor.last_name[locale as 'ar' | 'en'] }}
              </span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Title ') }}:
              <span class="text-capitalize text-body-2">{{ item.doctor?.title?.title }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Gender') }}:
              <span class="text-capitalize text-body-2">{{ item.doctor?.gender }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Speciality') }}:
              <span class="text-capitalize text-body-2">{{ item.doctor?.main_speciality_obj?.title }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-3" v-if="item.doctor?.sub_speciality_obj?.title">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Sub speciality') }}:
              <span class="text-capitalize text-body-2">{{ item.doctor?.sub_speciality_obj?.title }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mb-2">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Status') }}:
              <VChip
                v-if="item.doctor?.status === 'approved'"
                color="success"
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Approved') }}
              </VChip>
              <VChip
                v-else
                color="error"
                class="font-weight-medium"
                size="small"
              >
                {{ $t('Not approved') }}
              </VChip>
            </h6>
          </VListItemTitle>
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium d-flex align-center gap-1">
              {{ $t('Rating') }}:
              <span class="text-capitalize text-body-2">
                <VRating
                  readonly
                  :size="19"
                  :model-value="item.doctor_rating"
                />
              </span>
            </h6>
          </VListItemTitle>
        </VList>
      </VCardText>

      <div v-if="item.status.code === 'attended' || item.status.code === 'completed'">
        <VCardItem>
          <VCardTitle>{{ $t('Doctor Reviews') }}</VCardTitle>
        </VCardItem>
        <VCardText v-if="item.doctor.reviews.length === 0">
          {{ $t('There are no reviews') }}
        </VCardText>
        <VCardText v-else>
          <VList class="card-list">
            <VListItem
              v-for="review in item.doctor.reviews"
              :key="review.id"
            >
              <template #prepend start class="align-start">
                <VAvatar
                  start
                  rounded
                  class="align-start"
                >
                  <VImg
                    :height="50"
                    class="align-start"
                    :width="50"
                    :src="review.photo"
                  />
                </VAvatar>
              </template>

              <VListItemTitle class="text-sm font-weight-medium">
                {{ review.name }}
              </VListItemTitle>
              <VListItemAction class="text-error font-weight-medium">
                <span>
                  <VRating
                    readonly
                    :size="15"
                    :model-value="review.rating"
                  />
                </span>
              </VListItemAction>
              <VListItemSubtitle class="text-xs line-break mt-1">
                <div>
                  {{ review.review }}
                </div>
              </VListItemSubtitle>

              <v-divider class="mt-3 w-100"></v-divider>
            </VListItem>
          </VList>
        </VCardText>
      </div>
    </VCard>
  </div>
</template>
<style lang="scss">
.line-break {
  -webkit-line-clamp: initial !important;
}
</style>
