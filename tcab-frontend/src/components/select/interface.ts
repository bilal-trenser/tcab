interface SelectInterface {
  value: string
  label: string
}

export interface SelectCompInterface {
  options: Array<SelectInterface>
  error: boolean
  onChange: (val: SelectInterface) => void
  value: string | undefined
  dataTestId?: string
  type?: string
  name?: string
  placeholder?: string
}

export default SelectInterface
