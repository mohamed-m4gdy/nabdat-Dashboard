<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'
import branches from '../components/branches.vue'
import workspaces from '../components/workspaces.vue'
import doctors from '../components/doctors.vue'
const route = useRoute()


const { item } = fetchHock('hospitals', route.params.id as any as number)

const {t : $t} = useI18n()
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
        <VCardText class="text-center pt-15">
          <!-- 👉 photo -->
          <VAvatar
            rounded="sm"
            :size="120"
            :color="!item.hospital_logo ? 'primary' : undefined"
            :variant="!item.hospital_logo ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.hospital_logo"
              :src="item.hospital_logo"
            />
          </VAvatar>
          <!-- 👉 User fullName -->
          <h3 class="mt-4">
            {{ item.name }}
          </h3>
        </VCardText>

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
                  {{ $t('Descriptions') }}:
                  <span class="text-capitalize text-body-2">{{ item.descriptions }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Email') }}:
                  <span class="text-capitalize text-body-2">{{ item.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Phone') }}:
                  <span class="text-capitalize text-body-2">{{ item.calling_code }} {{ item.phone }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Mobile') }}:
                  <span class="text-capitalize text-body-2">{{ item.mobile }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Ratio visit type') }}:
                  <span class="text-capitalize text-body-2">{{ item.ratio?.visit?.price_type }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Ratio visit value') }}:
                  <span class="text-capitalize text-body-2">{{ item.ratio?.visit?.value }}</span>
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
                  {{ $t('Branch status') }}:
                  <span class="text-body-2">
                    <VChip
                        v-if="item.branch_status"
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
      <branches />
      <workspaces class="mt-4" />
      <doctors class="mt-4" />
    </VCol>
  </VRow>
</template>
