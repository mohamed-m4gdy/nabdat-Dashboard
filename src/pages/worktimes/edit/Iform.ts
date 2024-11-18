import type dayType from '@/components/form/inputs/slotItem'
interface medicinesForm {
  title: string
  type: 'visit' | 'call' | null
  first_come: boolean
  time_interval: number | null
  doctor_id: number | null,
  workspace_id:number | null,
  data: dayType[]
}

export default medicinesForm
