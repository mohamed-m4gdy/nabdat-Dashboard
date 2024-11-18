<script setup lang="ts">
import DoctorForm from './components/doctorForm/index.vue'
import ClinicForm from './components/clinicForm/index.vue'
import CostForm from './components/costForm/index.vue'
import CalenderForm from './components/calenderForm/index.vue'

const {t: $t} = useI18n()

const numberedSteps = [
  {
    title: $t('Doctor Details')
  },
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

const doctorId = ref<number>();
const specialityId = ref<number>();
const doctorWorkspaceId = ref<number>();

const currentStep = ref(0)
const isCurrentStepValid = ref(true)


const completeDoctor = (id: number, sId: number) => {   
  currentStep.value++
  doctorId.value = id
  specialityId.value = sId
  isCurrentStepValid.value = true
}

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
  router.push('/doctors/doctors/list')
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
          title: $t('Add doctor with clinic')
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
            <DoctorForm @onSuccess="completeDoctor"/>
        </VWindowItem>
        <VWindowItem>
            <ClinicForm @onSuccess="completeClinic" :doctorId="doctorId" :specialityId="specialityId" />
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
