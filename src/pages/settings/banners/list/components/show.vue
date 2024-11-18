<script setup lang="ts">
defineProps(['id', 'item', 'loading'])

const emit = defineEmits(['close'])

const {t : $t} = useI18n()
</script>

<template>
  <VDialog max-width="800px">
    <Loader v-if="loading" />
    <VCard v-if="!loading">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
      <VCardText>
        <h6 class="text-h6">
          {{ $t('Banner details') }}
        </h6>
        <VList class="card-list">
          <div class="text-center">
            <VAvatar
              rounded="sm"
              :size="300"
              :color="!item.image ? 'primary' : undefined"
              :variant="!item.image ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.image.en"
                :src="item.image.en"
              />
            </VAvatar>
            <VAvatar
              rounded="sm"
              class="ms-10"
              :size="300"
              :color="!item.image ? 'primary' : undefined"
              :variant="!item.image ? 'tonal' : undefined"
            >
              <VImg
                v-if="item.image.ar"
                :src="item.image.ar"
              />
            </VAvatar>
          </div>
          <VListItemTitle>
            <h6 class="text-sm mt-1 font-weight-medium">
              {{ $t('Names') }}:
              <span
                v-for="(name, index) in item.name"
                :key="index"
                class="text-capitalize text-body-2"
              >{{ name }} <span v-if="index < item.name.length - 1"> - </span></span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mt-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Description') }}:
              <span class="text-capitalize text-body-2">{{ item.description }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mt-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Url') }}:
              <span class="text-capitalize text-body-2">{{ item.url }}</span>
            </h6>
          </VListItemTitle>
          <VListItemTitle class="mt-3">
            <h6 class="text-sm font-weight-medium">
              {{ $t('Created at') }}:
              <span class="text-capitalize text-body-2">{{ item.created_at }}</span>
            </h6>
          </VListItemTitle>
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
