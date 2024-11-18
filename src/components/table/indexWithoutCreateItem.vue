<script setup lang="ts">
import deleteDilog from './components/deleteDilog.vue';
import emptyTable from './components/emptyTable.vue';
import errorView from './components/error.vue';
import tableHeader from './components/headerWithoutCreateItem.vue';
import loader from './components/loader.vue';
import pagination from './components/pagination.vue';

defineProps(['options', 'totalItems', 'headers', 'searchQuery', 'loading', 'itemsLength', 'headers', 'items', 'error', 'options', 'deleteText', 'deleteId', 'totalPages', 'totalItems'])

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

const changeSearch = (value: string) => {
  emit('changeSearch', value)
}
</script>

<template>
  <div class="items-table">
    <tableHeader
      @changeSearch="changeSearch" 
    />
    <!-- SECTION Datatable -->
    <VTable>
      <!-- table header -->
      <thead>
        <tr>
          <template v-for="(header, index) in headers" :key="index">
            <th class="text-uppercase" @click="$emit('sort', header.key)"
              v-if="typeof header.sortable == 'undefined' && !header.sortable">
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
    <loader v-if="loading" />
    <emptyTable v-if="!loading && items.length == 0 && !error" />
    <errorView v-if="!loading && items.length == 0 && error" />
    <!-- !SECTION -->
    <VDivider />
    <pagination 
      :options="options" 
      :totalPages="totalPages" 
      :totalItems="totalItems"
      @changePage="changePage" 
    />
    <deleteDilog 
      v-if="deleteId" 
      :deleteText="deleteText" 
      @colseDelete="colseDelete" 
      @deleteItem="deleteItem" 
    />
  </div>
</template>



