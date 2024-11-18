<script setup lang="ts">
defineProps(['id', 'item', 'loading'])

const emit = defineEmits(['close'])

const {t : $t} = useI18n()
</script>

<template>
  <VDialog
    width="300px"
    max-width="600px"
  >
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <!-- 👉 Review Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Details') }}
        </h6>
        <VDivider class="mt-5" />
        <VList class="card-list">
          <VListItem class="mt-4">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Name') }}:
              <span class="text-capitalize text-body-2">{{ item.name }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Country') }}:
              <span class="text-capitalize text-body-2">{{ item.country.name }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Code') }}:
              <span class="text-capitalize text-body-2">{{ item.code }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Type') }}:
              <span class="text-capitalize text-body-2">{{ item.type }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Limit') }}:
              <span class="text-capitalize text-body-2">{{ item.limit }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('User limit') }}:
              <span class="text-capitalize text-body-2">{{ item.user_limit }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Value') }}:
              <span class="text-capitalize text-body-2">{{ item.value }}<span v-if="item.type === 'perc'">%</span></span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('Start date') }}:
              <span class="text-capitalize text-body-2">{{ item.start_date }}</span>
            </h6>
          </VListItem>
          <VListItem>
            <h6 class="text-sm font-weight-medium">
              {{ $t('End date') }}:
              <span class="text-capitalize text-body-2">{{ item.expires_at }}</span>
            </h6>
          </VListItem>
          <VListItem class="my-2">
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Status') }}:
              <span class="text-capitalize text-body-2">
                <VChip
                  v-if="item.status"
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
          </VListItem>
        </VList>
        <VDivider class="mt-5" />
      </VCardText>
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
.vShow {
  min-width: 300px;
}
</style>
