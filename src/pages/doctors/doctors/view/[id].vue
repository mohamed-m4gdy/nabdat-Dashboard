<script lang="ts" setup>
import fetchHock from '@/helpers/fetchHock'
import clinics from './components/clinics.vue'
import hospitals from './components/hospitals.vue'
const route = useRoute()


const {item} = fetchHock('doctors', route.params.id as any as number)

defineComponent(['clinics', 'hospitals'])
const { locale } = useI18n({ useScope: 'global' })
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
            title: $t('Doctors'),
            link: '/doctors/doctors/list'
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
            :color="!item.photo ? 'primary' : undefined"
            :variant="!item.photo ? 'tonal' : undefined"
          >
            <VImg
              v-if="item.photo"
              :src="item.photo"
            />
          </VAvatar>

          <!-- 👉 User fullName -->
          <h3 class="mt-4">
            {{ item.firstname }}
          </h3>

          <!-- 👉 title chip -->
          <VChip
            label
            density="comfortable"
            class="text-capitalize mt-7 text-subtitle-1"
          >
          {{ item.firstname }}
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
                  {{ $t('Title ') }}:
                  <span class="text-capitalize text-body-2">{{ item.title?.title }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem v-if="locale === 'ar'">
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Bio') }}:
                  <span class="text-capitalize text-body-2">{{ item.bio?.ar }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem v-if="locale === 'en'">
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Bio') }}:
                  <span class="text-capitalize text-body-2">{{ item.bio?.en }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Main speciality') }}:
                  <span class="text-capitalize text-body-2">{{ item.main_speciality?.title }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem v-if="item.sub_speciality">
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Sub speciality') }}:
                  <span class="text-capitalize text-body-2">{{ item.sub_speciality?.title }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Created by') }}:
                  <span class="text-capitalize text-body-2">{{ item.created_by }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium d-flex">
                  <span class="me-3 mt-2">{{ $t('Practice certificate') }}:</span>
                  <div>
                    <div v-for="cert in item.attachments?.practice_cert" class="d-flex flex-column">
                      <VBtn variant="text" :href="cert" target="_blank" class="me-0 ms-0 ps-0 pe-0">
                        {{ $t('Certificate') }}
                      </VBtn>
                    </div>
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium d-flex">
                  <span class="me-3 mt-2">{{ $t('National id') }}:</span>
                  <div>
                    <div v-for="cert in item.attachments?.national_id" class="d-flex flex-column">
                      <VBtn variant="text" :href="cert" target="_blank" class="me-0 ms-0 ps-0 pe-0">
                        {{ $t('National id image') }}
                      </VBtn>
                    </div>
                  </div>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Ratio voice call type') }}:
                  <span class="text-capitalize text-body-2">{{ item.ratio?.voice_call?.price_type }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Ratio voice call value') }}:
                  <span class="text-capitalize text-body-2">{{ item.ratio?.voice_call?.value }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Ratio video call type') }}:
                  <span class="text-capitalize text-body-2">{{ item.ratio?.video_call?.price_type }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Ratio video call value') }}:
                  <span class="text-capitalize text-body-2">{{ item.ratio?.video_call?.value }}</span>
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
                  {{ $t('Email') }}:
                  <span class="text-body-2">{{ item.email }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Mobile') }}:
                  <span class="text-body-2">
                    {{ item.mobile }}
                  </span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem v-if="item.phone">
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Phone') }}:
                  <span class="text-body-2">{{ item.phone }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Birth day') }}:
                  <span class="text-body-2">{{ item.dob }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Gender') }}:
                  <span class="text-body-2">{{ item.gender }}</span>
                </h6>
              </VListItemTitle>
            </VListItem>

            <VListItem>
              <VListItemTitle>
                <h6 class="text-sm font-weight-medium">
                  {{ $t('Language') }}:
                  <span class="text-body-2">{{ item.default_language?.name }}</span>
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
      <hospitals class="mt-4" />
    </VCol>
  </VRow>
</template>
