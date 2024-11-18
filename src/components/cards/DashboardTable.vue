<script setup lang="ts">
import tableHock from '@/helpers/tableHock'

// index table model

const {
  items,
} = tableHock('dashboard/support', false, true, true, {}, false)

const patients = computed(() => items.value.filter(item => item.type === 'patient'))
const doctors = computed(() => items.value.filter(item => item.type === 'doctor'))
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12" md="6">
        <VCard>
          <!-- SECTION Card Header and Menu -->
          <VCardItem>
            <!-- 👉 Title -->
            <VCardTitle>{{ $t('Doctor support') }}</VCardTitle>
      
            <!-- 👉 menu -->
      
            <template #append>
              <div class="me-n3">
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
                      <VListItem to="/support/doctors/list">
                        <template #prepend>
                          <VIcon icon="mdi-show-outline" />
                        </template>
                        <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
            </template>
          </VCardItem>
          <!-- !SECTION -->
      
          <!-- SECTION Meting Schedule -->
          <VCardText>
            <VList
              lines="two"
              class="card-list"
            >
              <VListItem
                v-for="item in doctors"
                :key="item.id"
              >
                <!-- 👉 Avatar -->
                <template #prepend>
                  <VAvatar
                    start
                    :size="38"
                    :image="item.user.photo"
                  />
                </template>
      
                <!-- 👉 Title and Subtitle -->
      
                <VListItemTitle class="text-sm font-weight-medium mb-1">
                  {{ item.user.firstname }} {{ item.user.lastname }}
                </VListItemTitle>
                <VListItemSubtitle class="text-no-wrap text-xs">
                  <VIcon
                    start
                    size="16"
                    icon="mdi-calendar-blank"
                  />
                  <span>{{ item.created_at }}</span>
                </VListItemSubtitle>
      
                <!-- 👉 Business Types -->
                <template #append>
                  <VListItemAction>
                    <VChip
                        v-if="item.user?.active"
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
                  </VListItemAction>
                </template>
              </VListItem>
            </VList>
          </VCardText>
          <!-- !SECTION -->
        </VCard>
      </VCol>
      <VCol cols="12" md="6">
        <VCard>
          <!-- SECTION Card Header and Menu -->
          <VCardItem>
            <!-- 👉 Title -->
            <VCardTitle>{{ $t('Patients support') }}</VCardTitle>
      
            <!-- 👉 menu -->
      
            <template #append>
              <div class="me-n3">
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
                      <VListItem to="/support/patients/list">
                        <template #prepend>
                          <VIcon icon="mdi-show-outline" />
                        </template>
                        <VListItemTitle>{{ $t('View') }}</VListItemTitle>
                      </VListItem>
                    </VList>
                  </VMenu>
                </VBtn>
              </div>
            </template>
          </VCardItem>
          <!-- !SECTION -->
      
          <!-- SECTION Meting Schedule -->
          <VCardText>
            <VList
              lines="two"
              class="card-list"
            >
              <VListItem
                v-for="item in patients"
                :key="item.id"
              >
                <!-- 👉 Avatar -->
                <template #prepend>
                  <VAvatar
                    start
                    :size="38"
                    :image="item.user.photo"
                  />
                </template>
      
                <!-- 👉 Title and Subtitle -->
      
                <VListItemTitle class="text-sm font-weight-medium mb-1">
                  {{ item.user.firstname }} {{ item.user.lastname }}
                </VListItemTitle>
                <VListItemSubtitle class="text-no-wrap text-xs">
                  <VIcon
                    start
                    size="16"
                    icon="mdi-calendar-blank"
                  />
                  <span>{{ item.created_at }}</span>
                </VListItemSubtitle>
      
                <!-- 👉 Business Types -->
                <template #append>
                  <VListItemAction>
                    <VChip
                        v-if="item.user?.active"
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
                  </VListItemAction>
                </template>
              </VListItem>
            </VList>
          </VCardText>
          <!-- !SECTION -->
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 1.5rem;
}
</style>
