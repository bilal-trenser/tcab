import { createContext, useCallback, useMemo } from 'react'

import { UserRoleName } from '../../models/userRoleName'
import { RouteContextProps, RouteProperties, RouteConfig } from './interface'
import ROUTE_CONFIG from './routeConfig'

export const RouteConfigContext = createContext(
  {} as {
    /* An object containing array of routes which are enabled for the currently logged in user and isRootMenuDisplayed flag to decide wether or not to show side menu */
    routeConfig: RouteConfig
  }
)

export function RouteConfigProvider(props: RouteContextProps) {
  const { children, userRole } = props

  /* Callback function which checks if a route contains the role of the logged in user */
  const isRouteHasUserRole = useCallback(
    (roles: UserRoleName[]) => roles.some((role) => role === userRole),
    [userRole]
  )

  /* Callback function which checks if a route url is enabled for the currently logged in user */
  const isRouteEnabled = useCallback((route: RouteProperties) => {
    if (typeof route.enabled === 'boolean') return route.enabled

    return isRouteHasUserRole(route.enabled.roles!)
  }, [])

  /** Callback function to find the sub routes are enabled for a user, it return the filtered route config with sub routes that are enabled for the logged in user. */
  const isSubRoutesEnabled = useCallback(
    (routeConfig: RouteProperties) =>
      routeConfig.children?.filter((route) => {
        if (isRouteEnabled(routeConfig)) {
          const filetedRoute = routeConfig
          filetedRoute.children = routeConfig.children?.filter((subRoutes) => {
            if (
              subRoutes.children === undefined ||
              subRoutes.children.length === 0
            ) {
              return isRouteEnabled(route)
            }
            return isSubRoutesEnabled(subRoutes)
          })
          return filetedRoute
        }
        return false
      }),
    [userRole]
  )

  /* Selecting the routes which are enabled for the currently logged in user */
  const routes = useMemo(
    () =>
      ROUTE_CONFIG.children?.filter((route) => {
        if (route.children === undefined || route.children.length === 0) {
          return isRouteEnabled(route)
        }
        return isSubRoutesEnabled(route)
      }),
    [isRouteEnabled, userRole]
  )

  const usersRoutes: RouteConfig = {
    children: routes,
    isRootMenuDisplayed: ROUTE_CONFIG.isRootMenuDisplayed,
  }

  const contextValues = useMemo(
    () => ({
      routeConfig: usersRoutes,
    }),
    [ROUTE_CONFIG, userRole]
  )

  return (
    <RouteConfigContext.Provider value={contextValues}>
      {children}
    </RouteConfigContext.Provider>
  )
}
