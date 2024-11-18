<script setup lang="ts">
defineProps(['serviceId', 'item'])
const emit = defineEmits(['close'])

const {t : $t} = useI18n()

const showFrom = ref<boolean>(true)
</script>

<template>
  <VDialog
    v-model="showFrom"
    persistent
    width="900"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('More details')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />

      <VCardText class="text-center">
        <VImg
          :height="400"
          :src="item.attachment"
          class="mx-auto mb-5"
        />
      </VCardText>
      <VCardText>
        <VListItem>
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Note') }}:
              <span class="text-body-2">{{ item.note }}</span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="item.bank_account">
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Bank name') }}:
              <span class="text-body-2">{{ item.bank_account?.bank_name }}</span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="item.bank_account">
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Bank account name') }}:
              <span class="text-body-2">{{ item.bank_account?.account_name }}</span>
            </h6>
          </VListItemTitle>
        </VListItem>
        <VListItem v-if="item.bank_account">
          <VListItemTitle>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Bank account number') }}:
              <span class="text-body-2">{{ item.bank_account?.account_number }}</span>
            </h6>
          </VListItemTitle>
        </VListItem>
      </VCardText>

      <VCardActions>
        <VSpacer />
        <VBtn
          color="error"
          @click="$emit('close')"
        >
          {{ $t('Close') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1rem;
}

.pricing-save-chip {
  display: flex;
  inset-block-start: -1.5rem;
  inset-inline-end: -6.5rem;
}
</style>
