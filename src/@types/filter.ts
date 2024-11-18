export enum inputTypes {
  select,
  search,
  switch,
  date,
}
export interface selectItem {
  key: string
  value: string
}
export interface filterItem {
  type: inputTypes
  title: string
  change?: any
  prop: string
  path?: string
  cols?: number
  items?: selectItem[]
  titleNames?: string[]
  titleParam?: string
  dissabled?: boolean
  filterVal?: string
  filterName?: string
  noKeyFilter?: boolean
  clear?: boolean
}
