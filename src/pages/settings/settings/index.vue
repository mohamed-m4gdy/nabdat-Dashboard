<script lang="ts" setup>
import linkGenrator from '@/helpers/linkGenrator'
import axios from '@axios'
// get form helper
import formHock from '@/helpers/formHock'


// setting form endpoint
const settings = ref<{key: string, title: string, type: string}[]>([])
axios.get(linkGenrator('settings')).then(response => settings.value = response.data.data)

// prepare item
const formSetup: any = {}

const { item, loading, saveItem, serverErrors } = formHock<any>('setting', 'edit', formSetup, {})

const router = useRouter()


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
    <div>
      <Breadcrubs
        :links="[
          {
            title: $t('Home'),
            link: '/'
          },
          {
            title: $t('Settings'),
          }
        ]"
      />
    </div>
    <VCard
      :title="$t('Settings')"
    >
      <Form
        :loading="loading"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <template v-for="setting in settings">
            <VCol
              md="6"
              cols="12"
              v-if="setting.type == 'number'"
            >
              <VTextField
                v-model="item[setting.key]"
                type="number"
                :label="setting.title"
              />
            </VCol>
            <VCol
              md="6"
              cols="12"
              v-if="setting.type == 'array_numbers'"
            >
              <!-- <VCombobox
                multiple
                :label="setting.title"
                v-model="item[setting.key]"
                :items="item[setting.key].replace(/\[|\]/g, '').split(',')"
                variant="outlined"
              /> -->
              <VTextField
                v-model="item[setting.key]"
                type="text"
                :label="setting.title"
              />
            </VCol>
          </template>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>
