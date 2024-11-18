<script setup lang="ts">
const props = defineProps(['items'])

// get route
const route = useRoute()
</script>

<template>
  <div>
    <VCard class="py-5 px-5 mb-5 d-flex">
      <div
        v-for="item in props.items"
        :key="item.id"
      >
        <div class="mb-2">
          {{ $t('Title') }}:
          {{ item.title }}
        </div>
        <div class="mb-2">
          {{ $t('Status') }}:
          <VChip
            v-if="item.status"
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
        </div>
        <div class="mb-2">
          {{ $t('Required to reserve') }}:
          <VChip
            v-if="item.required_to_reserve"
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
        </div>
        <div class="mb-2">
          {{ $t('Questions count') }}:
          {{ item.questions_count }}
        </div>
        <div class="mb-2">
          {{ $t('Created at') }}:
          {{ item.created_at }}
        </div>
      </div>
      <VSpacer />
      <div>
        <VBtn :to="`/doctors/specialities/${route.params.specialityId}/survey/list/answers/${props.items[0].id}`">
          {{ $t('answers') }}
      </VBtn>
      </div>
    </VCard>
  </div>
</template>

<style lang="scss">
.no-wrap {
  text-wrap: nowrap;
  font-size: 13px;
}
</style>
