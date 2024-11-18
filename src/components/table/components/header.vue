<script setup lang="ts">
const props = defineProps(['addPath', 'titleHeader', 'dynamicPath', 'tableTitle', 'popupAdd'])
const emit = defineEmits(['changeSearch', 'openCreateForm'])
const search = ref('')
const awaitingSearch = ref<any>(false)

const doSearch =  () => {
  if (!awaitingSearch.value) clearTimeout(awaitingSearch.value)
  awaitingSearch.value = setTimeout(() => { emit('changeSearch', search.value) }, 400)
}

</script>

<template>
  <VCardText class="d-flex align-center flex-wrap gap-4">
    <h3 class="text-base font-weight-medium" v-if="tableTitle"> {{ tableTitle }} </h3>
    <VSpacer />

    <div class="d-flex align-center flex-wrap gap-6">
      <!-- 👉 Search  -->
      <div class="invoice-list-search">
        <VTextField v-if="!titleHeader"  v-model="search" :placeholder="$t('Search item')" density="compact"  @keyup="doSearch" />
        <VTextField v-if="titleHeader"  v-model="search" :placeholder="`${$t('Search')} ${props.titleHeader}`" density="compact"  @keyup="doSearch" />
      </div>

      <!-- 👉 Create item -->
      <VBtn v-if="props.addPath" :to="{ name: props.addPath }">
        {{ props.titleHeader ? `${$t('Create')} ${props.titleHeader}` : $t('Create item') }}
      </VBtn>

      <VBtn v-if="props.dynamicPath" :to="props.dynamicPath">
        {{ props.titleHeader ? `${$t('Create')} ${props.titleHeader}` : $t('Create item') }}
      </VBtn>

      <VBtn v-if="props.popupAdd" @click="emit('openCreateForm')">
        {{ props.titleHeader ? `${$t('Create')} ${props.titleHeader}` : $t('Create item') }}
      </VBtn>
    </div>
  </VCardText>
</template>

<style lang="scss">
.items-table {
  .invoice-list-search {
    inline-size: 12rem;
  }
}
</style>

