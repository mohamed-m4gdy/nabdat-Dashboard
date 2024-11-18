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
      <!-- 👉 Hospitals Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Organization details') }}
        </h6>
        <VList class="card-list">
          <div class="text-center mt-7">
            <!-- 👉 photo -->
            <VAvatar
              rounded="sm"
              :size="150"
            >
              <VImg :src="item.organization.photo" />
            </VAvatar>
          </div>
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Name') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.name }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Type') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.type }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Title') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.title }}</span>
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
                    :model-value="item.organization.avg_rating"
                  />
                </span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Rating count') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.rating_count }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Owner') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.owner.firstname }} {{ item.organization.owner.lastname }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Owner email') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.owner.email }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Owner phone') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.owner.phone }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Owner mobile') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.owner.mobile }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Gender') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.owner.gender }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Country') }}:
                <span class="text-capitalize text-body-2">{{ item.organization.owner.country }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
        </VList>
      </VCardText>
      <VDivider />

      <!-- 👉 Doctor Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Doctor details') }}
        </h6>
        <VList class="card-list">
          <div class="text-center mt-7">
            <!-- 👉 photo -->
            <VAvatar
              rounded="sm"
              :size="150"
            >
              <VImg :src="item.doctor.photo" />
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
                <span class="text-capitalize text-body-2">{{ item.doctor?.main_speciality_object?.title }}</span>
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

      <!-- 👉 Invitation Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Invitation details') }}
        </h6>
        <VList class="card-list">
          <div class="my-2 mt-5">
            <h6 class="text-sm mt-1 font-weight-medium">
              <div class="d-flex gap-3">
                <div>{{ $t('Accepted') }}:</div>
                <div>{{ item.accepted }}</div>
              </div>
            </h6>
          </div>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Created at') }}:
                <span class="text-capitalize text-body-2">{{ item.created_at }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Response at') }}:
                <span class="text-capitalize text-body-2">{{ item.response_at }}</span>
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
