/* eslint-disable react/require-default-props */

import { useEffect, useState } from 'react'

import { OnKeyDown, OnKeyPress } from '../../helpers/inputKeyEvents'
import { Input, LabelWrapper, Wrapper } from './style'

interface InputProps {
  label: string
  name: string
  value: string
  onChange: (val: string) => void
  dataTestId?: string
  type?: 'text' | 'number' | 'email'
  autoComplete?: 'off' | 'on'
  min?: string
}

function FloatingInput({
  label,
  name,
  value,
  type = 'text',
  onChange,
  dataTestId = '',
  autoComplete = 'on',
  min = '0',
}: InputProps): JSX.Element {
  const [hasValue, setHasValue] = useState(false)

  useEffect(() => {
    if (value === '' || value === undefined) {
      return setHasValue(false)
    }
    return setHasValue(true)
  }, [value])

  function onChangeValue(val: string) {
    onChange(val)
    if (val === '' || val === undefined) {
      return setHasValue(false)
    }
    return setHasValue(true)
  }

  return (
    <Wrapper>
      <Input
        type={type}
        name={name}
        autoComplete={autoComplete}
        value={value}
        data-testid={dataTestId}
        onChange={(event) => onChangeValue(event.target.value)}
        onKeyPress={(e) => {
          OnKeyPress(e, type)
        }}
        onKeyDown={(e) => {
          OnKeyDown(e, type)
        }}
        min={min}
      />
      <LabelWrapper hasValue={hasValue}>{label}</LabelWrapper>
    </Wrapper>
  )
}

export default FloatingInput
