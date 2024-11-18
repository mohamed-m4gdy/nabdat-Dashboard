import type dayType from '@/components/form/inputs/slotItem'
interface medicinesForm {
  first_come: boolean
  time_interval: number | null
  waiting_time: number | null,
  doctor_id: number | null,
  workspace_id:number | null,
  data: dayType[]
}

export default medicinesForm
