<script setup lang="ts">
import workspaceItem from './workspaceItem'
import { useVuelidate } from '@vuelidate/core'
import { helpers, numeric, required } from '@vuelidate/validators'

defineProps(['specialtyId'])
const emit = defineEmits(['close', 'addItem'])

// get route
const route = useRoute()
const routeId = route.params.hospitalId

const rules = {
  branch_id: {
    required: helpers.withMessage('Branch is required', required),
  },
  workspace_id: {
    required: helpers.withMessage('Workspace is required', required),
  },

  // clinc data
  cost: {
    required: helpers.withMessage('Cost is required', required),
    numeric: helpers.withMessage('Cost must be number', numeric),
  },
  follow_up_cost: {
    required: helpers.withMessage('Follow up cost is required', required),
    numeric: helpers.withMessage('Follow up cost must be number', numeric),
  },
  calendar_temp_id: {
    required: helpers.withMessage('Calendar template is required', required)
  },
  waiting_time: {
    required: helpers.withMessage('Waiting time is required', required),
    numeric: helpers.withMessage('Waiting time must be number', numeric),
  },
}

const item = ref<workspaceItem>({
    branch_id: null,
    branch: {
      name: ''
    },
    workspace_id: null,
    workspace: {
      name: ''
    },
    cost: null,
    follow_up_cost: null,
    allow_online_pay: 0,
    waiting_time: null,
    calendar_temp_id: null,
    calendar: {
      name: ''
    }
})

// asign validation
const validate = useVuelidate(rules, item)

const saveItem = async(): Promise<void> => {
    // stop if not valid
    const valid = await validate.value.$validate()
    if (!valid) return 
    // logic hear
    emit('addItem', item.value)
    emit('close')

}
// get input error
const getInputError = (path: string) => validate.value.$errors.filter((el: any) => el.$propertyPath == path).map((el: any) => el.$message)

const UpdateBranch = (el: any) =>  item.value.branch.name = el.name
const UpdateWorkaspace = (el: any) =>  item.value.workspace.name = el.title
const UpdateCalender = (el: any) =>  item.value.calendar.name = el.title

const open = ref(true)
</script>
<template>
  <VDialog
    v-model="open"
    persistent
    width="500"
  >
    <!-- Dialog Content -->
    <VCard :title="$t('Add workspace')">
      <DialogCloseBtn
        variant="text"
        size="small"
        @click="$emit('close')"
      />
        <VCardText>
          <VRow>
            <VCol
              md="12"
              cols="12"
            >
              <Search
                v-model="item.branch.name"
                v-model:value="item.branch_id"
                :label-string="$t('Branches')"
                :fillter="{
                  // status: true,
                  organization_id: route.params.id ? route.params.id : routeId,
                  speciality: specialtyId
                }"
                paths="branches"
                :error-messages="getInputError('branch_id')"
                @change="UpdateBranch"
              />
            </VCol>
            <VCol
              md="12"
              cols="12"
            >
              <Search
                v-model="item.workspace.name"
                v-model:value="item.workspace_id"
                :disabled="!item.branch_id"
                :label-string="$t('Workspace')"
                title-param="title"
                :fillter="{
                  branch_id: item.branch_id,
                  speciality_id: specialtyId
                }"
                paths="workspace"
                :error-messages="getInputError('workspace_id')"
                @change="UpdateWorkaspace"
              />
            </VCol>
            <VCol
                cols="12"
            >
                <VTextField
                    v-model="item.cost"
                    type="number"
                    :label="$t('Cost')"
                    :error-messages="getInputError('cost')"
                    :suffix="$t('EGP')"
                    persistent-placeholder
                />
            </VCol>
            <VCol
                cols="12"
            >
                <VTextField
                    v-model="item.follow_up_cost"
                    :label="$t('Follow up cost')"
                    type="number"
                    :error-messages="getInputError('follow_up_cost')"
                    :suffix="$t('EGP')"
                    persistent-placeholder
                />
            </VCol>
            <VCol
                cols="12"
            >
                <VTextField
                    v-model="item.waiting_time"
                    :label="$t('Waiting time')"
                    type="number"
                    :error-messages="getInputError('waiting_time')"
                    :suffix="$t('Minutes')"
                    persistent-placeholder
                />
            </VCol>
            <VCol
              md="12"
              cols="12"
            >
              <Search
                v-model="item.calendar.name"
                v-model:value="item.calendar_temp_id"
                :label-string="$t('Calendar')"
                title-param="title"
                paths="calendar-templates"
                :error-messages="getInputError('calendar_temp_id')"
                @change="UpdateCalender"
              />
            </VCol>
            <VCol
                md="12"
                cols="12"
            >
                <VRow class="align-center">
                    <VCol
                        cols="6"
                    >
                    <VCheckbox
                        v-model="item.allow_online_pay"
                        :label="$t('Online Payment')"
                    />
                    </VCol>
                    
                </VRow>
            </VCol>
        </VRow>
      </VCardText>
      <VCardActions>
        <VSpacer />
        <VBtn
          @click="saveItem"
        >
          {{ $t('Save') }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
