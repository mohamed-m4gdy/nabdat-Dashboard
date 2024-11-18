<script lang="ts" setup>
import type Iform from './Iform'
import validation from './validation'

// get form helper
import formHock from '@/helpers/formHock'

// prepare item
const formSetup: Iform = {
  title: {
    ar: '',
    en: '',
  },
  mobile: '',
  phone: '',
  facilities: [],
  calling_code: null,
  accept_discount_code: false,
  organization_id: null,
  branch_id: null,
  speciality_id: null,
  files: [{ media_path: '', type: 'image', status: true }],
}

const { item, loading, getInputError, saveItem, serverErrors } = formHock<Iform>(`branch/workspace`, 'add', formSetup, validation)

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

// To add new File inpput
const addFileInput = () => item.value.files.push({ media_path: '', type: 'image', status: true })

// To remove new File inpput
const removeIndex = (index: any) => item.value.files.splice(index, 1)

const tab = ref(null)
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
            title: $t('Hospitals workspace'),
            link: '/hospitals/workspace/list'
          },
          {
            title: $t('Add'),
          }
        ]"
      />
    </div>
    <VCard
      id="invoice-list"
      :title="$t('Add workspace')"
    >
      <Form
        :loading="loading"
        :errors="[]"
        :server-errors="serverErrors"
        @save-item="submitItem"
      >
        <VRow>
          <VCol
            md="12"
            cols="12"
            class="border mb-5 mt-3"
          >
            <VTabs
              v-model="tab"
              align-tabs="center"
            >
              <VTab value="english">
                {{ $t('English Translation') }}
              </VTab>
              <VTab value="arabic">
                {{ $t('Arabic Translation') }}
              </VTab>
            </VTabs>
            <VCardText class="py-0 px-0">
              <VWindow
                v-model="tab"
                class="pt-5"
              >
                <VWindowItem value="english">
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VTextField
                        v-model="item.title.en"
                        :label="$t('Name in English')"
                        :error-messages="getInputError('title.en')"
                      />
                    </VCol>
                  </VRow>
                </VWindowItem>
  
                <VWindowItem value="arabic">
                  <VRow>
                    <VCol
                      md="12"
                      cols="12"
                    >
                      <VTextField
                        v-model="item.title.ar"
                        :label="$t('Name in arabic')"
                        :error-messages="getInputError('title.ar')"
                      />
                    </VCol>
                  </VRow>
                </VWindowItem>
              </VWindow>
            </VCardText>
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.organization_id"
              v-model:value="item.organization_id"
              :label-string="$t('Hospital')"
              paths="hospitals"
              :error-messages="getInputError('organization_id')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.branch_id"
              v-model:value="item.branch_id"
              :label-string="$t('Branch')"
              :disabled="!item.organization_id"
              :fillter="{
                organization_id: item.organization_id,
              }"
              paths="branches"
              :error-messages="getInputError('branch_id')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VRow class="align-center">
              <VCol
                class="pe-0"
                cols="3"
              >
              <CallingNumber 
                v-model="item.calling_code"
                v-model:value="item.calling_code"
                :error-messages="getInputError('calling_code')"
              />
              </VCol>
              <VCol
                class="ps-0"
                cols="9"
              >
                <VTextField
                  v-model="item.mobile"
                  :label="$t('Mobile')"
                  :error-messages="getInputError('mobile')"
                />
              </VCol>
            </VRow>
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <VTextField
              v-model="item.phone"
              :label="$t('Phone')"
              :error-messages="getInputError('phone')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <Search
              v-model="item.speciality_id"
              v-model:value="item.speciality_id"
              :disabled="!item.branch_id"
              :label-string="$t('Specialization')"
              :fillter="{
                status: true,
                parent_id: -1,
                branch_id: item.branch_id,
              }"
              paths="specialities"
              title-param="title"
              :error-messages="getInputError('speciality_id')"
            />
          </VCol>
          <VCol
            md="6"
            cols="12"
          >
            <MultySearch
              v-model:value="item.facilities"
              :label-string="$t('Facilities')"
              paths="facilities"
              title-param="title"
              multi="multi"
              :error-messages="getInputError('facilities')"
            />
          </VCol>
          <VCol
            md="12"
            cols="12"
          >
            <VRow class="mt-2 align-center">
              <VCol
                md="4"
                cols="6"
              >
                <VCheckbox
                  v-model="item.accept_discount_code"
                  :label="$t('Accept discount code')"
                />
              </VCol>
            </VRow>
          </VCol>
        </VRow>
        <VRow>
          <VCol cols="12">
            <Loader v-if="loading" />
            <VRow
              v-if="!loading"
              class="mt-5"
            >
              <VCol
                cols="6"
                md="3"
                class="plusContainer"
              >
                <div class="plusIcon">
                  <VIcon
                    icon="mdi-plus-box"
                    size="50"
                    @click="addFileInput"
                  />
                </div>
              </VCol>
              <VCol
                v-for="(file, index) in item.files"
                :key="index"
                cols="6"
                md="3"
              >
                <div class="relative">
                  <FileInput
                    v-model:value="file.media_path"
                    image-wrapper="imageWrapper"
                    :index="index"
                    minus="true"
                    @remove-index="removeIndex"
                  />
                </div>
              </VCol>
            </VRow>
          </VCol>
        </VRow>
      </Form>
    </VCard>
  </div>
</template>

<style lang="scss">
  .plusIcon {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px dashed #ffffff54;
  }
  .v-theme--light .plusIcon {
    border: 1px dashed rgb(5 2 2 / 33%);
  }
  .relative {
    position: relative;
  }
  .plusContainer {
    margin: 0;
    padding-top: 0;
    margin-bottom: 12px;
  }
</style>
