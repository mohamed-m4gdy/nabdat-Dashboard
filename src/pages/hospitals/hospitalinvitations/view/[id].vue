<script lang="ts" setup>
import showHock from '@/helpers/showHock'
const {t : $t} = useI18n()

// get route
const route = useRoute()

const { item, loading, show } = showHock('hospital/invitations/')

show(parseInt(route.params.id as string))
const { locale } = useI18n({ useScope: 'global' })

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
          title: $t('Invitations'),
          link: '/hospitals/hospitalinvitations/list'
        },
        {
          title: $t('Invite details'),
        }
      ]"
    />
    </div>
    <Loader v-if="loading" />
    <VRow>
      <VCol
        cols="12"
        md="5"
        lg="4"
      >
      <VRow>
        <VCol cols="12">
          <VCard v-if="!loading">
            <!-- 👉 Invitation Details -->
            <VCardText>
              <h6 class="text-h6">
                {{ $t('Invite details') }}
              </h6>
              <VList class="card-list">

                <div class="display-flex">
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Cost') }}:
                      <span class="text-capitalize text-body-2">{{ item.cost }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Follow up cost') }}:
                      <span class="text-capitalize text-body-2">{{ item.follow_up_cost }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Waiting time') }}:
                      <span class="text-capitalize text-body-2">{{ item.waiting_time }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle v-if="item.time_interval" class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Time interval') }}:
                      <span class="text-capitalize text-body-2">{{ item.time_interval }}</span>
                    </h6>
                  </VListItemTitle>
                </div>

                <div>
                  <h6 class="text-sm font-weight-medium mb-1">
                    {{ $t('Allow online pay') }}:
                    <span class="text-capitalize text-body-2">
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
                    </span>
                  </h6>
                  <h6 class="text-sm font-weight-medium mb-1">
                    {{ $t('Status') }}:
                    <span class="text-capitalize text-body-2">
                      <VChip
                        :color="item.accepted === 'approved' ? 'success' : item.accepted === 'refused' ? 'error' : ''"
                        class="font-weight-medium"
                        size="small"
                      >
                        {{ item.accepted }}
                      </VChip>
                    </span>
                  </h6>
                </div>

                <div class="display-flex">
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Created at') }}:
                      <span class="text-capitalize text-body-2">{{ item.created_at }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Response at') }}:
                      <span class="text-capitalize text-body-2">{{ item.response_at }}</span>
                    </h6>
                  </VListItemTitle>
                </div>

              </VList>
            </VCardText>
          </VCard>
        </VCol>
        <VCol
          cols="12"
        >
          <VCard v-if="!loading">
            <!-- 👉 Hospitals Details -->
            <VCardText>
              <h6 class="text-h6">
                {{ $t('Organization details') }}
              </h6>
              <VList class="card-list">
                <div class="text-center mt-7">
                  <!-- 👉 photo -->
                  <VAvatar
                    rounded="sm"
                    :size="150"
                  >
                    <VImg :src="item.organization.photo" />
                  </VAvatar>
                </div>

                <VListItem class="mt-3">
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Name') }}:
                      <span class="text-capitalize text-body-2">{{ item.organization.name[locale as 'ar' | 'en'] }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Description') }}:
                      <span class="text-capitalize text-body-2">{{ item.organization.descriptions[locale as 'ar' | 'en'] }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle class="mb-1">
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Workspace') }}:
                      <span class="text-capitalize text-body-2">{{ item.workspace.title }}</span>
                    </h6>
                  </VListItemTitle>
                  <VListItemTitle>
                    <h6 class="text-sm mt-1 font-weight-medium">
                      {{ $t('Created at') }}:
                      <span class="text-capitalize text-body-2">{{ item.organization.created_at }}</span>
                    </h6>
                  </VListItemTitle>
                </VListItem>
              </VList>
            </VCardText>
            <VDivider />
          </VCard>
        </VCol>
      </VRow>
      </VCol>
      <VCol
        cols="12"
        md="7"
        lg="8"
      >
        <VCard v-if="!loading">
          <!-- 👉 Doctor Details -->
          <VCardText>
            <h6 class="text-h6">
              {{ $t('Doctor details') }}
            </h6>
            <VList class="card-list">
              <div class="text-center mt-7">
                <!-- 👉 photo -->
                <VAvatar
                  rounded="sm"
                  :size="150"
                >
                  <VImg :src="item?.doctor?.photo" />
                </VAvatar>
              </div>

              <VListItemTitle class="mt-3 mb-1">
                <h6 class="text-sm mt-1 font-weight-medium">
                  {{ $t('Name') }}:
                  <span class="text-capitalize text-body-2">{{ item?.doctor?.name }}</span>
                </h6>
              </VListItemTitle>
              
              <div class="display-flex">
                <VListItemTitle class="mb-1">
                  <h6 class="text-sm font-weight-medium">
                    {{ $t('Speciality') }}:
                    <span class="text-capitalize text-body-2">{{ item.doctor?.main_speciality_object?.title }}</span>
                  </h6>
                </VListItemTitle>
              </div>

              <div class="display-flex">
                <VListItemTitle class="mb-1">
                  <h6 class="text-sm font-weight-medium">
                    {{ $t('Status') }}:
                    <span class="text-capitalize text-body-2">
                      <VChip
                        :color="item?.doctor?.status === 'approved' ? 'success' : item?.doctor?.status === 'refused' ? 'error' : ''"
                        class="font-weight-medium"
                        size="small"
                      >
                        {{ item?.doctor?.status }}
                      </VChip>
                    </span>
                  </h6>
                </VListItemTitle>
              </div>
            </VList>
          </VCardText>
          <VDivider />
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
