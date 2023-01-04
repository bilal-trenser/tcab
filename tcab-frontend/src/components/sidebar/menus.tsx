import { useState } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ListItemIcon } from '@mui/material'
import ListItemText from '@mui/material/ListItemText'
import { NavLink, useLocation } from 'react-router-dom'

import { RouteProperties } from '../../config/routes/interface'
import color from '../../theme/color'
import dimensions from '../../theme/dimensions'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'
import { DropDownMenuItem, FillCaretLeft, StyledListItem } from './styles'

export default function Menus(props: {
  item: RouteProperties
  isHideText: boolean
}) {
  const location = useLocation()
  const { isHideText, item } = props
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseEnter = () => {
    setIsHovering(true)
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
  }

  const navLinkStyle =
    location.pathname === item.path
      ? {
          color: color.fontHover,
          margin: `${spacingScale(1.5)}px ${spacingScale(1)}px`,
          borderRadius: dimensions.borderRadius,
          display: 'flex',
          FlexDirection: 'row',
          textDecoration: 'none',
          alignItems: 'center',
          fontSize: typography.normal,
          overflow: 'hidden',
        }
      : {
          color: color.fontPrimary,
          margin: `${spacingScale(1.5)}px ${spacingScale(1)}px`,
          borderRadius: dimensions.borderRadius,
          display: 'flex',
          FlexDirection: 'row',
          textDecoration: 'none',
          alignItems: 'center',
          fontSize: typography.normal,
          overflow: 'hidden',
        }

  return (
    <DropDownMenuItem
      key={item.title}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink to={item.path} style={navLinkStyle}>
        <StyledListItem>
          <ListItemIcon
            style={{ minWidth: `${spacingScale(5)}px` }}
            title={isHideText ? item.title : ''}
          >
            <FontAwesomeIcon
              icon={item.icon}
              style={{
                color:
                  location.pathname === item.path || isHovering
                    ? color.fontHover
                    : color.fontPrimary,
                fontSize: typography.subtitle,
              }}
            />
          </ListItemIcon>
          {!isHideText && (
            <ListItemText
              primary={item.title.toUpperCase()}
              primaryTypographyProps={{
                fontFamily: typography.fontFamily,
                overflow: 'hidden',
                fontSize: `${spacingScale(1.5)}px`,
                color:
                  location.pathname === item.path || isHovering
                    ? color.fontHover
                    : color.placeholder,
              }}
            />
          )}
        </StyledListItem>
        {location.pathname === item.path && <FillCaretLeft />}
      </NavLink>
    </DropDownMenuItem>
  )
}
