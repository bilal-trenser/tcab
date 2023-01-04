import SelectInterface from '../select/interface'

export interface SelectCompInterface {
  options: Array<SelectInterface>
  error: boolean
  onChange: (val: Array<SelectInterface>) => void
  value: Array<SelectInterface>
  placeholder?: string
  borderColor?: string
  hasCheckBox?: boolean
}
