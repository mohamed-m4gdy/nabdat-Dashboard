<script setup lang="ts">
import ClinicForm from './components/clinicForm/index.vue'
import CostForm from './components/costForm/index.vue'
import CalenderForm from './components/calenderForm/index.vue'

const {t: $t} = useI18n()

const numberedSteps = [
  {
    title: $t('Clinic Info')
  },
  {
    title: $t('Cost details')
  },
  {
    title: $t('Calender')
  },
]

const doctorWorkspaceId = ref<number>();

const currentStep = ref(0)
const isCurrentStepValid = ref(true)


const completeClinic = (id: number) => {
  currentStep.value++
  doctorWorkspaceId.value = id
  isCurrentStepValid.value = true
}

const completeCost = () => {   
  currentStep.value++
  isCurrentStepValid.value = true
}

const router = useRouter()
const completeCalender = () => {
  router.push('/clinics/workspace/list')
}

</script>

<template>
  <div>
    <Breadcrubs
      :links="[
        {
          title: $t('Home'),
          link: '/'
        },
        {
          title: $t('forms')
        },
        {
          title: $t('Add clinic')
        }
      ]"
    />

  <VCard>
    <VCardText>
      <!-- 👉 Stepper -->
      <AppStepper
        v-model:current-step="currentStep"
        :items="numberedSteps"
        :is-active-step-valid="isCurrentStepValid"
      />
    </VCardText>

    <VDivider />

    <VCardText>
      <!-- 👉 stepper content -->

      <VWindow
        v-model="currentStep"
        class="disable-tab-transition"
      >
        <VWindowItem>
            <ClinicForm @onSuccess="completeClinic" />
        </VWindowItem>
        <VWindowItem>
            <CostForm @onSuccess="completeCost" :doctorWorkspaceId="doctorWorkspaceId" />
        </VWindowItem>
        <VWindowItem>
            <CalenderForm @onSuccess="completeCalender" :doctorWorkspaceId="doctorWorkspaceId" />
        </VWindowItem>
      </VWindow>
    </VCardText>
  </VCard>
  </div>
</template>
