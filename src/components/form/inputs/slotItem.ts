export interface slotItem {
    start_time: string
    end_time: string
    type: 'visit'
    enabled: boolean
}

export interface dayType {
    day: string
    slots: slotItem[]
}

export default dayType