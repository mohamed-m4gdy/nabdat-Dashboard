import type dayType from '@/components/form/inputs/slotItem'
interface medicinesForm {
  title: string
  type: 'visit' | 'call' | null
  first_come: boolean
  time_interval: number | null
  data: dayType[]
}

export default medicinesForm
