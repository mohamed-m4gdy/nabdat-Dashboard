<script setup lang="ts">
  import CreateForm from './create.vue'
  import EditForm from './edit.vue'
  import workspaceItem from './workspaceItem'

  defineProps(['specialtyId', 'value'])

  const emit = defineEmits(['update:value'])
  const {t : $t} = useI18n()
  
  const items = ref<workspaceItem[]>([])

  // create popup logic
  const showCreate = ref<boolean>(false)
  const openCreateForm = () => {
    window.scrollTo({ top: 0})
    showCreate.value = true
  }
  const closeCreateForm = () => {
    showCreate.value = false
    setTimeout(() => {
      const y = document.getElementById('scrollHear')!.getBoundingClientRect().top + window.scrollY 
      window.scroll({top: y})
    }, 200)
  }

  // edit popup logic
  const showEdit = ref<boolean>(false)
  const openEditForm = () =>  {
    window.scrollTo({ top: 0})
    showEdit.value = true
  }
  const closeEditForm = () => {
    showEdit.value = false
    setTimeout(() => {
      const y = document.getElementById('scrollHear')!.getBoundingClientRect().top + window.scrollY 
      window.scroll({top: y})
    }, 200)
  }

  // add item to items 
  const addItem = (item: workspaceItem) => items.value.push(item)

  // remove item 
  const removeItem = (id: number) => items.value.splice(id, 1)

  // edit item 
  const editId = ref<number | null>(null)
  const editedItem = ref<workspaceItem | null>(null)
  const editItem = (id: number) => {
    editId.value = id
    editedItem.value = items.value[id]
    openEditForm()
  }
  const closeEditItem = () => {
    editId.value = null
    editedItem.value = null
    closeEditForm()
  }

  const updateItem = (item: workspaceItem) => items.value[editId.value as number] = item

  watch(items, () => emit('update:value', items.value), {deep: true})

</script>

<template>
    <VCard class="mt-3" id="scrollHear">
      <VCardText class="d-flex align-center flex-wrap gap-4">
        <h3 class="text-base font-weight-medium" > {{ $t('Doctor workspaces') }} </h3>
        <VSpacer />

        <div class="d-flex align-center flex-wrap gap-6">
          <!-- 👉 Create item -->
          <VBtn @click="openCreateForm">
            {{ $t('Add Workspace') }}
          </VBtn>
        </div>
      </VCardText>
      <VTable>
        <!-- table header -->
        <thead>
          <tr>
            <th class="text-uppercase">
              {{ $t('Branch') }}
            </th>
            <th class="text-uppercase">
              {{ $t('Workspace') }}
            </th>
            <th class="text-uppercase">
              {{ $t('Cost') }}
            </th>
            <th class="text-uppercase">
              {{ $t('Follow up cost') }}
            </th>
            <th class="text-uppercase">
              {{ $t('Waiting Time') }}
            </th>
            <th class="text-uppercase">
              {{ $t('Online Payment') }}
            </th>
            <th class="text-uppercase">
              {{ $t('Settings') }}
            </th>
          </tr>
        </thead>
        <tbody v-if="items.length">
          <tr
            v-for="(item, index) in items"
            :key="index"
          >
            <td>
              {{ item.branch.name }}
            </td>
            <td>
              {{ item.workspace.name }}
            </td>
            <td>
              {{ item.cost }}
            </td>
            <td>
              {{ item.follow_up_cost }}
            </td>
            <td>
              {{ item.waiting_time }}
            </td>
            <td>
              <VChip
                v-if="item.allow_online_pay"
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
            </td>
            <td>
              <VBtn
                icon
                variant="text"
                size="small"
                color="medium-emphasis"
              >
                <VIcon
                  size="24"
                  icon="mdi-dots-vertical"
                />
                <VMenu activator="parent">
                  <VList>
                    <VListItem @click="editItem(index)">
                      <template #prepend>
                        <VIcon icon="mdi-pencil-outline" />
                      </template>
                      <VListItemTitle>{{ $t('Edit') }}</VListItemTitle>
                    </VListItem>
                    <VListItem @click="removeItem(index)">
                      <template #prepend>
                        <VIcon icon="mdi-delete-outline" />
                      </template>
                      <VListItemTitle>{{ $t('Delete') }}</VListItemTitle>
                    </VListItem>
                  </VList>
                </VMenu>
              </VBtn>
            </td>
          </tr>
        </tbody>
      </VTable>
      <div class="p-4  mt-16 mb-16 text-center" v-if="!items.length">
          <VIcon icon="ri-inbox-line" size="55" />
          <h3 class="card-title mb-1">{{ $t('There is no items') }}!</h3>
          <p class="text-muted mb-0">{{ $t('Try to add some items') }}</p>
      </div>

       <!-- create dialog -->
      <CreateForm
        v-if="showCreate"
        :specialtyId="specialtyId"
        @addItem="addItem"
        @close="closeCreateForm"
      />

      <!-- edit dialog -->
      <EditForm
        v-if="showEdit"
        :specialtyId="specialtyId"
        :editItem="editedItem"
        @updateItem="updateItem"
        @close="closeEditItem"
      />
    </VCard>
</template>
