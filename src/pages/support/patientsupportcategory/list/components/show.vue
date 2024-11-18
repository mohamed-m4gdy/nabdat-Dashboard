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
              :color="!item.photo ? 'primary' : undefined"
              :variant="!item.photo ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.photo"
                :src="item.photo"
              />
            </VAvatar>
          </div>
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Name') }}:
                <span class="text-capitalize text-body-2">{{ item.firstname }} {{ item.lastname }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Title') }}:
                <span class="text-capitalize text-body-2">{{ item.title.title }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Speciality') }}:
                <span class="text-capitalize text-body-2">{{ item.main_speciality.title }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Bio') }}:
                <span class="text-capitalize text-body-2">{{ item.bio[locale as 'ar' | 'en'] }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile') }}:
                <span class="text-capitalize text-body-2">{{ item.mobile }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Phone') }}:
                <span class="text-capitalize text-body-2">{{ item.phone }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Email') }}:
                <span class="text-capitalize text-body-2">{{ item.email }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Birthday') }}:
                <span class="text-capitalize text-body-2">{{ item.dob }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Gender') }}:
                <span class="text-capitalize text-body-2">{{ item.gender }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Language') }}:
                <span class="text-capitalize text-body-2">{{ item.default_language.name }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Country') }}:
                <span class="text-capitalize text-body-2">{{ item.country.name }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Governorate') }}:
                <span class="text-capitalize text-body-2">{{ item.government.name }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('City') }}:
                <span class="text-capitalize text-body-2">{{ item.city.name }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}: 
                <VChip
                  v-if="item.active"
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
