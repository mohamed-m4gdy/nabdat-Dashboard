<script setup lang="ts">
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
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Payment offline details') }}
        </h6>
        <VList class="card-list">
          <div class="text-center">
            <VAvatar
              rounded="sm"
              :size="150"
              :color="!item.logo ? 'primary' : undefined"
              :variant="!item.logo ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.logo"
                :src="item.logo"
              />
            </VAvatar>
          </div>
          <VListItem class="mt-3">
            <VListItemTitle>
              <h6 class="text-sm mt-1 font-weight-medium">
                {{ $t('Title') }}:
                <span class="text-capitalize text-body-2">{{ item.title }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Details') }}:
              <span class="text-capitalize text-body-2">{{ item.details }}</span>
            </h6>
          </VListItemTitle>
          <VListItem class="display-flex mt-6">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Code') }}:
                <span class="text-capitalize text-body-2">{{ item.code }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Refernce number') }}:
                <span class="text-capitalize text-body-2">{{ item.refernce_number }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Fees') }}:
                <span class="text-capitalize text-body-2">{{ item.fees }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.is_active"
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
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Paymentgate') }}:
                <span class="text-capitalize text-body-2">{{ item.paymentGate.title }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Paymentgate status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.paymentGate.is_active"
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
