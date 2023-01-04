import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import { UserRoleName } from '../../models/userRoleName'
import ROUTES from './routes'

export interface RouteProperties {
  title: string
  path: typeof ROUTES[keyof typeof ROUTES]
  children?: Array<RouteProperties>
  component: React.LazyExoticComponent<React.ComponentType<{}>>
  isRootMenuDisplayed: boolean
  isHidden?: boolean
  icon: IconDefinition
  isDefault?: boolean
  isBack?: boolean
  enabled:
    | {
        roles?: UserRoleName[]
      }
    | boolean
}
export interface RouteConfig {
  children?: Array<RouteProperties>
  isBack?: boolean
  title?: string
  isRootMenuDisplayed?: boolean
}

export interface RouteContextProps {
  userRole: UserRoleName
  children: React.ReactNode
}
