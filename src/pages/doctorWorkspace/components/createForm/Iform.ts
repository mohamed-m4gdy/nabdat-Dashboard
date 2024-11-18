import type dayType from '@/components/form/inputs/slotItem'
interface medicinesForm {
  first_come: boolean
  time_interval: number | null
  waiting_time: number | null,
  doctor_id: number | null,
  cost: number | null
  follow_up_cost: number | null
  allow_online_pay: boolean
  data: dayType[]
}

export default medicinesForm
