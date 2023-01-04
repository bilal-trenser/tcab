import { ListItem } from '@mui/material'
import styled from 'styled-components'

import color from '../../theme/color'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'

export const BoxStyle = styled.div<{ isHideText?: boolean }>`
  color: ${color.fontSecondary} !important;
  font-family: ${typography.fontFamily} !important;
  padding: ${(props) =>
    props.isHideText
      ? `${spacingScale(1.5)}px`
      : `${spacingScale(1.5)}px ${spacingScale(0)}px`};
  position: relative;
`

export const IconButton = styled.button`
  border: none !important;
  background: ${color.background} !important;
  color: ${color.fontSecondary} !important;
  font-size: ${spacingScale(1)}px !important;
  font-weight: 500;
`
export const DropDownIcon = styled.span`
  margin-right: ${spacingScale(1.5)}px;
`

export const DropDownMenuItem = styled.div`
  position: relative;
`
export const SubMenuTitle = styled.label`
  font-style: normal;
  font-size: ${spacingScale(1.5)}px;
  line-height: ${spacingScale(3)}px px;
  align-items: center;
  letter-spacing: 0.1em;
  color: ${color.fontPrimary};
  flex: none;
  order: 1;
  flex-grow: ${spacingScale(0)};
  margin: 8px 12px 4px 12px;
`

export const AnimationEffect = styled.div``

export const FillCaretLeft = styled.div`
  border-right: 17px solid ${color.backgroundLight};
  border-top: 17px solid transparent;
  border-bottom: 17px solid transparent;
  right: -1px;
  top: 6px;
  position: absolute;
`

export const StyledListItem = styled(ListItem)<{ isHideText?: boolean }>`
  padding: ${spacingScale(1.5)};
`
