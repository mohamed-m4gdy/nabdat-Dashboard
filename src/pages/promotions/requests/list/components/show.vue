<script setup lang="ts">
import avatar1 from '@images/avatars/avatar-1.png'

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
                v-if="avatar1"
                :src="avatar1"
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
                <span class="text-capitalize text-body-2">{{ item.doctor.specialities[0].title }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Bio') }}:
              <span class="text-capitalize text-body-2">{{ item.doctor.bio }}</span>
            </h6>
          </VListItemTitle>
          <VListItem class="display-flex mt-2">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium d-flex align-center gap-1">
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
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Phone') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor.phone }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Visit count') }}:
                <span class="text-capitalize text-body-2">{{ item.doctor.profile_visit_count }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.doctor.is_promoted"
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
      <!-- 👉 Promotion Requests Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Promotion requests details') }}
        </h6>
        <VList class="card-list">
          <div class="my-2">
            <h6 class="text-sm mt-1 font-weight-medium">
              <div class="d-flex gap-3">
                <div>{{ $t('Description') }}:</div>
                <div>{{ item.description }}</div>
              </div>
            </h6>
          </div>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Reply') }}:
                <span class="text-capitalize text-body-2">{{ item.reply }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle class="my-2">
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.approved"
                    color="primary"
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Approved') }}
                  </VChip>
                  <VChip
                    v-else
                    class="font-weight-medium"
                    size="small"
                  >
                    {{ $t('Pending') }}
                  </VChip>
                </span>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCardText>
      <VDivider />

      <!-- 👉 Review Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Promotion Settings details') }}
        </h6>
        <VList class="card-list">
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Price') }}:
                <span class="text-capitalize text-body-2">{{ item.promo_setting.price }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Units') }}:
                <span class="text-capitalize text-body-2">{{ item.promo_setting.units }}/{{ item.promo_setting.durations }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCardText>

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
