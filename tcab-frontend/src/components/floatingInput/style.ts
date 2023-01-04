import styled from 'styled-components'

import color from '../../theme/color'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'

export const Wrapper = styled.div`
  position: relative;
`

export const Input = styled.input`
  display: flex;
  font-size: ${typography.fontSize};
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: ${spacingScale(1)}px ${spacingScale(2)}px;
  position: static;
  height: ${spacingScale(6)}px;
  background: ${color.backgroundLight};
  border: 1px solid ${color.border};
  box-sizing: border-box;
  border-radius: ${spacingScale(1)}px;
  padding-top: ${spacingScale(2.5)}px;
  width: 100%;
  color: ${color.fontPrimary};
  &:focus {
    outline: none;
    border: 1px solid ${color.border};
  }
  &:focus + :active {
    border: ${spacingScale(0.25)}px solid ${color.border};
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: ${spacingScale(0)};
  }
  -moz-appearance: textfield;
`

export const LabelWrapper = styled.div<{ hasValue?: boolean }>`
  width: 70%;
  position: absolute;
  overflow: hidden;
  word-wrap: normal;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${color.fontPrimary};
  font-size: ${(props) => (props.hasValue ? '10' : '14')}px;
  font-weight: normal;
  pointer-events: none;
  margin-left: 16px;
  top: ${(props) => (props.hasValue ? '10' : '14')}px;
  transition: 0.2s ease all;
  ${Input}:focus ~ & {
    top: 10px;
    font-size: 10px;
  }
`
