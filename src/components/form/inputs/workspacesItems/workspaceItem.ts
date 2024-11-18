export default interface workspaceItem {
  branch_id: number | null
  branch: {
    name: string
  }
  workspace_id: number | null
  workspace: {
    name: string
  }
  cost: number | null
  follow_up_cost: number | null
  allow_online_pay: number
  waiting_time: number | null
  calendar_temp_id: number | null
  calendar: {
    name: string
  }
}