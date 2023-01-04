import Drawer from '@mui/material/Drawer'
import { DiReact } from 'react-icons/di'
import { useLocation } from 'react-router-dom'

import RouteConfig from '../../config/routes/routes'
import getDisplayMessage from '../../i18n/displayMessage'
import color from '../../theme/color'
import dimensions from '../../theme/dimensions'
import { spacingScale } from '../../theme/spacing'
import SidebarContent from './sidebarContent'

export default function Sidebar() {
  const { pathname } = useLocation()

  const drawer = {
    flexShrink: 'unset',
    '& .MuiDrawer-paper': {
      width: `${dimensions.drawerWidth}px`,
      background: color.background,
      whiteSpace: 'nowrap',
      height: window.innerHeight,
      cursor: 'pointer',
      zIndex: 5,
      left: 0,
      overflow: 'hidden',
      transitionProperty: 'width',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'linear',
      transitionDelay: '0',
      border: 'none',
    },
  }

  const checkPath = () =>
    Object.values(RouteConfig).find((path) => path === pathname)

  return (
    <Drawer
      data-testid="drawerSidebar"
      style={checkPath() ? { display: 'block' } : { display: 'none' }}
      variant="permanent"
      sx={drawer}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          fontFamily: 'montserrat,helvetica neue,Arial,sans-serif',
          fontSize: `${spacingScale(2)}px`,
          margin: `${spacingScale(0)}px ${spacingScale(1.5)}px`,
          padding: `${spacingScale(2)}px ${spacingScale(1)}px`,
          borderBottom: `1px solid ${color.borderDark}`,
        }}
      >
        <DiReact
          style={{
            marginRight: `${spacingScale(2)}px`,
            fontSize: '1.7rem',
            color: `${color.palette.tertiary}`,
          }}
        />
        {getDisplayMessage('titles.tCab')}
      </div>
      <SidebarContent isHideText={false} />
    </Drawer>
  )
}
