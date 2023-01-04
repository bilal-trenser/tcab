import { StatusModes } from '../../models/statusModes'

export type Data = {
  name: string
}

export interface IntialState {
  data: Data | null
  status: StatusModes
}
