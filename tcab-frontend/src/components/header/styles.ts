import styled from 'styled-components'

import color from '../../theme/color'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'

export const HeadWrapper = styled.div<{ marginLeft: number }>`
  margin-left: ${(props) =>
    props.marginLeft ? props.marginLeft : spacingScale(0)}px;
  border-bottom: 1px solid ${color.borderLight};
  vertical-align: middle;
  font-family: ${typography.fontFamily};
  position: fixed;
  width: 100%;
  background: ${color.backgroundLight};
  overflow: hidden;
  transition-property: width;
  transition-duration: 0.2s;
  transition-timing-function: linear;
  transition-delay: 0;
  color: ${color.fontPrimary} !important;
`

export const HeadItems = styled.div<{ margin?: string }>`
  margin: ${spacingScale(0)}px ${spacingScale(1.5)}px;
  padding: ${spacingScale(2.5)}px;
  display: inline-block;
  vertical-align: middle;
  & span {
    font-size: ${typography.heading}px;
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`

export const HeadItemsRight = styled.div<{
  margin?: string
}>`
  @media (min-width: 1600px) {
    width: 77% !important;
  }

  width: 78%;
  display: inline-block;
  vertical-align: middle;
  float: right;
  & span {
    font-size: ${typography.heading}px;
  }
  input:focus,
  textarea:focus,
  select:focus {
    outline: none;
  }
`
