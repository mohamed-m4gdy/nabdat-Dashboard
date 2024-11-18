<script setup lang="ts">
defineProps(['id', 'item', 'loading'])

const emit = defineEmits(['close'])

const {t : $t} = useI18n()
</script>

<template>
  <VDialog
    max-width="600px"
  >
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <VDivider />
      <!-- 👉 Admin Details -->
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Admin details') }}
        </h6>
        <VList class="card-list">
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
                {{ $t('Phone') }}:
                <span class="text-capitalize text-body-2">{{ item.phone }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Mobile') }}:
                <span class="text-capitalize text-body-2">{{ item.mobile }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Language') }}:
                <span class="text-capitalize text-body-2">{{ item.default_language?.name }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Gender') }}:
                <span class="text-capitalize text-body-2">{{ item.gender }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Country') }}:
                <span class="text-capitalize text-body-2">{{ item.country?.name }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('City') }}:
                <span class="text-capitalize text-body-2">{{ item.city?.name }}</span>
              </h6>
            </VListItemTitle>
          </VListItem>
          <VListItem class="display-flex">
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Role') }}:
                <span class="text-capitalize text-body-2">{{ item.role?.name }}</span>
              </h6>
            </VListItemTitle>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Status') }}:
                <span class="text-capitalize text-body-2">
                  <VChip
                    v-if="item.active"
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
          <VListItem>
            <VListItemTitle>
              <h6 class="text-sm font-weight-medium">
                {{ $t('Created at') }}:
                <span class="text-capitalize text-body-2">{{ item.created_at }}</span>
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
