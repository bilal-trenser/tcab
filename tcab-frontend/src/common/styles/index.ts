import styled from 'styled-components'

import color from '../../theme/color'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'
import { ImageProps } from './interface'

export const AppContainer = styled.div`
  color: ${color.background} !important;
`

export const Image = styled.img<ImageProps>`
  width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  height: ${(props) => (props.height ? `${props.height}px` : 'auto')};
  margin-bottom: ${(props) =>
    props.nomargin ? `${spacingScale(0)}px` : `${spacingScale(1)}px`};
`
export const TitleText = styled.label`
  font-family: ${typography.fontFamily};
  color: ${color.fontPrimary};
  font-size: ${spacingScale(3)}px;
  font-weight: bold;
  margin-top: 10px;
`
