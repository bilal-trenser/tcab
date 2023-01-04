import { lazy } from 'react'

import {
  faGear,
  faTaxi,
  faMapLocationDot,
  faRoute,
  faClipboardList,
  faUserCircle,
} from '@fortawesome/free-solid-svg-icons'

import getDisplayMessage from '../../i18n/displayMessage'
import { RouteProperties, RouteConfig } from './interface'
import ROUTES from './routes'

const About = lazy(() => import('../../pages/about/About'))
const Home = lazy(() => import('../../pages/home/Home'))
const routes: Array<RouteProperties> = [
  {
    title: getDisplayMessage('titles.routeMapPlanner'),
    path: ROUTES.HOME,
    component: About,
    isRootMenuDisplayed: true,
    icon: faMapLocationDot,
    enabled: {
      roles: ['super-admin', 'admin'],
    },
  },
  {
    title: getDisplayMessage('titles.routePlanner'),
    path: ROUTES.ROUTE_PLANNER,
    component: About,
    isRootMenuDisplayed: true,
    icon: faRoute,
    enabled: {
      roles: ['super-admin', 'admin'],
    },
  },
  {
    title: getDisplayMessage('titles.employeeDetails'),
    path: ROUTES.EMPLOYEE_DETAILS,
    component: About,
    isRootMenuDisplayed: false,
    icon: faUserCircle,
    enabled: {
      roles: ['super-admin', 'admin', 'user', 'driver'],
    },
    isBack: true,
    children: [
      {
        title: 'General',
        path: ROUTES.EMPLOYEE_DETAILS_GENERAL,
        component: About,
        isDefault: true,
        isRootMenuDisplayed: false,
        icon: faRoute,
        enabled: {
          roles: ['super-admin', 'admin', 'user', 'driver'],
        },
      },
    ],
  },
  {
    title: getDisplayMessage('titles.cabDefinition'),
    path: ROUTES.CAB_DEFINITION,
    component: Home,
    isRootMenuDisplayed: true,
    icon: faTaxi,
    enabled: {
      roles: ['super-admin', 'admin'],
    },
  },
  {
    title: getDisplayMessage('titles.cabScheduler'),
    path: ROUTES.CAB_SCHEDULER,
    component: About,
    isRootMenuDisplayed: true,
    icon: faClipboardList,
    enabled: {
      roles: ['super-admin', 'admin'],
    },
  },
  {
    title: getDisplayMessage('titles.workFlow'),
    path: ROUTES.WORKFLOW,
    component: About,
    isRootMenuDisplayed: true,
    icon: faGear,
    enabled: {
      roles: ['admin', 'super-admin'],
    },
  },
]

const ROUTE_CONFIG: RouteConfig = {
  children: routes,
  isRootMenuDisplayed: true,
}

export default ROUTE_CONFIG
