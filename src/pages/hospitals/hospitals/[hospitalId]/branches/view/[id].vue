<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'
import clinics from './components/clinics.vue'
import doctors from './components/doctors.vue'
const route = useRoute()

const {t : $t} = useI18n()

const { item } = fetchHock('branches', route.params.id as any as number)
</script>

<template>
  <VRow>
    <VCol
      cols="12"
    >
      <Breadcrubs
        :links="[
          {
            title: $t('Home'),
            link: '/'
          },
          {
            title: $t('Hospitals'),
            link: '/hospitals/hospitals/list'
          },
          {
            title: $t('Branches'),
            link: `/hospitals/hospitals/${route.params.hospitalId}/branches/list`
          },
          {
            title: $t('Show')
          }
        ]"
      />
    </VCol>
    <VCol
      cols="12"
      md="5"
      lg="4"
    >
      <VCard>
        <!-- 👉 Details -->
        <VCardText>
          <h6 class="text-h6">
            {{ $t('Details') }}
          </h6>

          <VDivider class="my-4" />
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Name') }}:
                  <span class="text-capitalize text-body-2">{{ item.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Organization') }}:
                  <span class="text-capitalize text-body-2">{{ item.organization?.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium d-flex gap-2">
                  <div>{{ $t('Specialities') }}:</div>
                  <div>
                    <span class="text-capitalize text-body-2" v-for="speciality in item.specialities_obj">
                      <div> {{ speciality.title }} </div>
                    </span>
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Phone') }}:
                  <span class="text-capitalize text-body-2">{{ item?.calling_code }}-{{ item?.phone }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Mobile') }}:
                  <span class="text-capitalize text-body-2">{{ item?.phone_calling_code }}{{ item?.mobile }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Country') }}:
                  <span class="text-body-2">{{ item.country?.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Governorate') }}:
                  <span class="text-body-2">{{ item.government?.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('City') }}:
                  <span class="text-body-2">{{ item.city?.name }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Main branch') }}:
                  <span class="text-body-2">
                    <VChip
                        v-if="item.main_branch"
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
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Status') }}:
                  <span class="text-body-2">
                    <VChip
                        v-if="item.active"
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
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>

    <VCol
      cols="12"
      md="7"
      lg="8"
    >
      <clinics :spicialtyId="item.main_speciality?.id"/>
      <doctors class="mt-4" />
      
      <VCard class="mt-3 px-4 py-3">
        <div class="d-flex gap-3 mt-3">
          <h4 class="mt-1">
            {{ $t('Files') }}:
          </h4>
          <div class="d-flex flex-wrap gap-4">
            <div v-for="(i, index) in item.files" :key="index">
              <div class="d-flex align-center justify-center flex-column">
                <div class="d-flex flex-wrap gap-5">
                  <VBtn
                    :href="i.file"
                    target="_blank"
                    variant="text"
                    class="d-block h-100"
                  >
                    <VAvatar
                      rounded="sm"
                      :size="200"
                      :color="!i.file ? 'primary' : undefined"
                      :variant="!i.file ? 'tonal' : undefined"
                    >
                      <VImg
                        :src="i.file"
                      />
                    </VAvatar>
                  </VBtn>
                </div>
              </div>
              </div>
          </div>
        </div>
      </VCard>
    </VCol>
  </VRow>
</template>
