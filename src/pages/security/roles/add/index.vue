<script lang="ts" setup>
import axios from '@axios'
import type Ifrom from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'
import linkGenrator from '@/helpers/linkGenrator'

// prepare item
const formSetup: Ifrom = {
  name: '',
  permissions: []
}

const items = ref<any>([])
const loadingg = ref<boolean>(false)
const error = ref<boolean>(false)

const fetchItems = async (): Promise<void> => {
  const options = ref<any>({
    per_page: 999999999,
  })

  // open loading
  loadingg.value = true

  // Get Items from backend without options
  axios.get(
    linkGenrator('permissions'),
    { params: options.value },
  )
  .then(response => {
    items.value = response.data?.data ?? []
    // stop loader
    loadingg.value = false
  })
  .catch(() => {
    loadingg.value = false
    error.value = true
  })
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Ifrom>('roles', 'add', formSetup, validation)

const router = useRouter()

fetchItems()

const allWords = computed(() => {
  const words: { [key: string]: any } = {}
  for (const key in items.value) {
    words[key] = items.value[key]
  }
  return words
})

// To set the selected permession
const togglePermission = (permissionId: any) => {
  const index = item.value.permissions.indexOf(permissionId)
  if (index > -1) {
    // If the permission is already in the array, remove it
    item.value.permissions.splice(index, 1)
  } else {
    // If the permission is not in the array, add it
    item.value.permissions.push(permissionId)
  }
}

const submitItem = async () => {
  const response = await saveItem()
  if (response.status) {
    // go back
    router.go(-1)
  }
  else {
    // scroll to top screen
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}
</script>

<template>
  <div>
    <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('Roles'),
          link: '/security/roles/list'
        },
        {
          title: $t('Add')
        }
      ]"
    />
    <VCard
      id="invoice-list"
      :title="$t('Add Role')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @saveItem="submitItem"
      >
        <VRow>
          <VCol
            md="12"
            cols="12"
          >
            <VTextField
              v-model="item.name"
              :label="$t('Name')"
              :error-messages="getInputError('name')"
            />
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
          </VCol>
          <VCol cols="12" v-if="loadingg">
            <Loader />
          </VCol>
          <VCol cols="12" v-else>
            <div v-for="(words, key) in allWords" :key="key">
              <h4 class="text-subtitle-1 mb-2">{{ key }}:</h4>
              <VRow class="mb-5">
                <VCol cols="4" v-for="perm in words">
                  <v-checkbox
                    :label="perm.name"
                    :value="perm.id"
                    :input-value="item.permissions.includes(perm.id)"
                    @change="togglePermission(perm.id)"
                  ></v-checkbox>
                </VCol>
              </VRow>
              <VDivider class="mb-5" />
            </div>
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
<style lang="scss">


</style>
