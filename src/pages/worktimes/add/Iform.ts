import type dayType from '@/components/form/inputs/slotItem'
interface medicinesForm {
  workspase_id: number | null
  doctor_id: number | null
  cost: number | null
  follow_up_cost: number | null
  allow_online_pay: number | null
  waiting_time: number | null
  first_come: boolean
  type: 'visit' | 'call' | null
  time_interval: number | null
  data: dayType[]
}

export default medicinesForm
