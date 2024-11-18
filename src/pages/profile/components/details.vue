<script lang="ts" setup>

interface Props {
  items: {
    firstname: string
    lastname: string
    email: string
    mobile: string
    phone: string
    dob: string
    default_language: {
      name: string
    }
    gender: string
    country: {
      name: string
    }
    government: {
      name: string
    }
    city: {
      name: string
    }
    active: boolean
    created_at: string
  }
}

const props = defineProps<Props>()
</script>

<template>
  <VRow>
    <!-- SECTION User Details -->
    <VCol cols="12">
      <VCard>
        <!-- 👉 Details -->
        <VCardText>

          <!-- 👉 User Details list -->
          <VList class="card-list">
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('name') }}:
                  <span class="text-body-2">
                    {{ props.items.firstname }} {{ props.items.lastname }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Email') }}:
                  <span class="text-body-2">
                    {{ props.items.email }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Status') }}:
                  <VChip
                    v-if="props.items.active"
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
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Mobile') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.mobile }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Phone') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.phone }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Birthday') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.dob }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Gender') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.gender }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Language') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.default_language?.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Country') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.country?.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Governorate') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.government?.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('City') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.city?.name }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Created at') }}:
                  <span class="text-capitalize text-body-2">
                    {{ props.items.created_at }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>
          </VList>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
