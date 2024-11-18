<script setup lang="ts">
import DeleteDilog from './components/deleteDilog.vue'
import EmptyTable from './components/emptyTable.vue'
import ErrorView from './components/error.vue'
import Loader from './components/loader.vue'
import Pagination from './components/pagination.vue'

defineProps(['options', 'openDialog', 'totalItems', 'headers', 'searchQuery', 'loading', 'itemsLength', 'headers', 'items', 'error', 'options', 'deleteText', 'deleteId', 'totalPages', 'totalItems'])

const emit = defineEmits(['colseDelete', 'deleteItem', 'changePage', 'changeSearch'])

const colseDelete = () => {
  emit('colseDelete')
}

const deleteItem = () => {
  emit('deleteItem')
}

const changePage = (page: number) => {
  emit('changePage', page)
}
</script>

<template>
  <div class="items-table">
    <!-- SECTION Datatable -->
    <VTable>
      <!-- table header -->
      <thead>
        <tr>
          <template
            v-for="(header, index) in headers"
            :key="index"
          >
            <th
              v-if="typeof header.sortable == 'undefined' && !header.sortable"
              class="text-uppercase"
              @click="$emit('sort', header.key)"
            >
              <VIcon icon="mdi-arrow-up" /> {{ $t(header.title) }}
            </th>
            <th
              v-else
              class="text-uppercase"
            >
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

