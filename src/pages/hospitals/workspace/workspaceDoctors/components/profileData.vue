<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'

const emit = defineEmits(['updateSpicialty'])

const route = useRoute()
const {item} = fetchHock('workspace', route.params.id as any as number)

watch(item, (value) => emit('updateSpicialty', value.speciality.id))
</script>
<template>
  <VCard>
        <VCardText class="text-center pt-15">
          <!-- 👉 photo -->
          <VAvatar
            rounded="sm"
            :size="120"
            :color="!item.organization_logo ? 'primary' : undefined"
            :variant="!item.organization_logo ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.organization_logo"
              :src="item.organization_logo"
            />
          </VAvatar>

          <!-- 👉 User fullName -->
          <h3 class="mt-4">
            <VListItem :to="`/hospitals/hospitals/${item?.organization?.id}/branches/list`">
              <template #prepend>
              </template>
              <VListItemTitle>{{ item.organization?.name }}</VListItemTitle>
            </VListItem>
          </h3>

          <!-- 👉 title chip -->
          <VChip
            label
            density="comfortable"
            class="text-capitalize mt-7 text-subtitle-1"
          >
          {{ item.title }}
          </VChip>
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
                  {{ $t('Speciality') }}:
                  <span class="text-body-2">{{ item?.speciality?.title }} </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Address') }}:
                  <span class="text-body-2">{{ item?.address }} </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Branch') }}:
                  <span class="text-body-2">{{ item?.branch?.name }} </span>
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
                  {{ $t('Mobile') }}:
                  <span class="text-capitalize text-body-2">{{ item.calling_code }}{{ item.mobile }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem v-if="item.phone">
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Phone') }}:
                  <span class="text-capitalize text-body-2">{{ item.phone }}</span>
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
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Accept discount code') }}:
                  <span class="text-body-2">
                    <VChip
                        v-if="item.accept_discount_code"
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
</template>
