<script setup lang="ts">
import DeleteDilog from './components/deleteDilog.vue'
import EmptyTable from './components/emptyTable.vue'
import ErrorView from './components/error.vue'
import TableHeader from './components/header.vue'
import Loader from './components/loader.vue'
import Pagination from './components/pagination.vue'

defineProps(['options', 'titleHeader', 'addPath', 'dynamicPath', 'totalItems', 'headers', 'searchQuery', 'loading', 'itemsLength', 'headers', 'items', 'error', 'options', 'deleteText', 'deleteId', 'totalPages', 'totalItems', 'tableTitle', 'popupAdd'])

const emit = defineEmits(['colseDelete', 'deleteItem', 'changePage', 'changeSearch', 'sort', 'openCreateForm'])

const colseDelete = () => {
  emit('colseDelete')
}

const deleteItem = () => {
  emit('deleteItem')
}

const changePage = (page: number) => {
  emit('changePage', page)
}

const changeSearch = (value: string) => {
  emit('changeSearch', value)
}

const openCreateForm = () => {
  emit('openCreateForm')
}
</script>

<template>
  <div class="items-table">
    <TableHeader
      :addPath="addPath"
      :dynamic-path="dynamicPath"
      :title-header="titleHeader"
      :table-title="tableTitle"
      @changeSearch="changeSearch"
      @openCreateForm="openCreateForm"
      :popupAdd="popupAdd"
    />
    <!-- SECTION Datatable -->
    <VTable>
      <!-- table header -->
      <thead>
        <tr>
          <template v-for="(header) in headers" :key="index">
            <th
              v-if="typeof header.sortable == 'undefined' && !header.sortable"
              class="text-uppercase"
              @click="$emit('sort', header.key)"
            >
              <VIcon icon="mdi-arrow-up" /> {{ $t(header.title) }}
            </th>
            <th class="text-uppercase" v-else>
              {{ $t(header.title) }}
            </th>
          </template>
        </tr>
      </thead>
      <!-- table body -->
      <tbody>
        <slot />
      </tbody>
    </VTable>
    <Loader v-if="loading" />
    <EmptyTable v-if="!loading && items.length === 0 && !error" />
    <ErrorView v-if="!loading && items.length === 0 && error" />
    <!-- !SECTION -->
    <VDivider />
    <Pagination
      :options="options"
      :total-pages="totalPages"
      :total-items="totalItems"
      @change-page="changePage"
    />
    <DeleteDilog
      v-if="deleteId"
      :delete-text="deleteText"
      @colse-delete="colseDelete"
      @delete-item="deleteItem"
    />
  </div>
</template>

<style lang="scss">
 .v-theme--dark .items-table {
  thead {
    background:rgb(var(--v-theme-table-header-background));
  }
}
.v-theme--light .items-table {
  thead {
    background: rgb(249,250,252);
  }
}
</style>
