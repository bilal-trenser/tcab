import { useContext, useEffect, useState } from 'react'

import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { List, ListItem } from '@mui/material'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

import { RouteConfig, RouteProperties } from '../../config/routes/interface'
import { RouteConfigContext } from '../../config/routes/routeConfigContext'
import color from '../../theme/color'
import { spacingScale } from '../../theme/spacing'
import Menus from './menus'
import { AnimationEffect, BoxStyle, SubMenuTitle } from './styles'

export default function SidebarContent(props: { isHideText: boolean }) {
  const { isHideText } = props
  const { routeConfig } = useContext(RouteConfigContext)
  const [navigationItems, setNavigationItems] =
    useState<RouteConfig>(routeConfig)
  const [previousPath, setPreviousPath] = useState<string>('')
  let NavigationList: RouteConfig = routeConfig
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const findPath = (): RouteConfig => {
    let menu: RouteConfig = routeConfig
    routeConfig.children?.forEach((parent) => {
      if (parent.path === pathname && parent.isRootMenuDisplayed) {
        menu = routeConfig
        setPreviousPath(pathname)
      }
      if (parent.children !== undefined && !parent.isRootMenuDisplayed) {
        parent.children?.forEach((firstChild) => {
          if (firstChild.path === pathname || parent.path === pathname) {
            menu = parent || []
            if (firstChild?.isDefault) {
              navigate(firstChild.path)
            }
          }
          firstChild.children?.forEach((secondChild) => {
            if (secondChild.path === pathname) {
              menu = firstChild || []
              if (firstChild?.isDefault) {
                navigate(secondChild.path)
              }
            }
          })
        })
      }
    })
    return menu
  }

  useEffect(() => {
    NavigationList = findPath()
    setNavigationItems(NavigationList)
  }, [pathname])

  return (
    <BoxStyle isHideText={isHideText} className="box">
      <AnimationEffect
        className={
          navigationItems?.isRootMenuDisplayed ? 'slide-left' : 'slide-right'
        }
      >
        {navigationItems?.isBack && (
          <List style={{ overflow: 'hidden' }}>
            <NavLink to={previousPath} style={{ textDecoration: 'none' }}>
              <ListItem
                style={{
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  style={{
                    color: color.fontPrimary,
                    margin: `${spacingScale(0)}px ${spacingScale(1)}px`,
                  }}
                />
                <div>
                  {!isHideText && (
                    <SubMenuTitle>
                      {navigationItems?.title
                        ? navigationItems?.title.toUpperCase()
                        : ''}
                    </SubMenuTitle>
                  )}
                </div>

                {/* </ListItemIcon> */}
              </ListItem>
            </NavLink>
          </List>
        )}
        <List style={{ position: 'relative' }}>
          {navigationItems?.children?.map(
            (item: RouteProperties) =>
              !item.isHidden && (
                <Menus key={item.title} item={item} isHideText={isHideText} />
              )
          )}
        </List>
      </AnimationEffect>
    </BoxStyle>
  )
}
