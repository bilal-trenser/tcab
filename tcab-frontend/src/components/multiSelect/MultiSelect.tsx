/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useState } from 'react'

import Select, { components } from 'react-select'

import getDisplayMessage from '../../i18n/displayMessage'
import colors from '../../theme/color'
import dimensions from '../../theme/dimensions'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'
import SelectInterface from '../select/interface'
import { SelectCompInterface } from './interface'

export default function MultiSelect({
  value,
  options,
  error,
  onChange,
  placeholder = `${getDisplayMessage('common.select')}`,
  borderColor = colors.border,
  hasCheckBox = false,
}: SelectCompInterface) {
  let selectBorder = String(borderColor)
  if (error) {
    selectBorder = colors.error
  }

  const [valueSel, setvalueSel] = useState<Array<SelectInterface>>(value)

  useEffect(() => {
    if (value.length === 0) setvalueSel(value)
  }, [value])

  const customStyles = {
    placeholder: (styles: {}) => ({
      ...styles,
      color: colors.palette.info,
      fontWeight: 500,
      fontSize: typography.fontSize,
    }),
    option: (provided: {}) => ({
      height: dimensions.formItems.height,
      ...provided,
      color: colors.fontPrimary,
      backgroundColor: colors.backgroundLight,
      '&:hover': {
        backgroundColor: colors.borderBlue,
      },
      border: `1px solid ${colors.border}`,
      padding: `${spacingScale(1.5)}px`,
      fontSize: hasCheckBox ? `${spacingScale(1.5)}px` : `14px`,
    }),
    control: (base: {}) => ({
      fontSize: hasCheckBox
        ? `${spacingScale(1.5)}pxpx`
        : `${typography.fontSize}px`,
      padding: hasCheckBox ? `${spacingScale(1)}px 1px` : `6px`,
      ...base,
      backgroundColor: colors.background,
      color: colors.fontPrimary,
      border: `1px solid ${selectBorder}`,
      borderRadius: dimensions.borderRadius,
      '&:hover': {
        borderColor: error ? colors.error : colors.borderBlue,
      },
      overflow: 'hidden',
    }),
    Select: (provided: {}) => ({
      ...provided,
      backgroundColor: colors.background,
      color: colors.fontPrimary,
    }),
    multiValue: (provided: {}) => {
      const color = colors.fontPrimary
      const backgroundColor = colors.fontHover
      return {
        ...provided,
        color,
        backgroundColor,
      }
    },
    multiValueLabel: (styles: {}) => ({
      ...styles,
      color: colors.fontPrimary,
    }),
    multiValueRemove: (styles: {}) => ({
      ...styles,
      color: colors.fontPrimary,
      ':hover': {
        backgroundColor: colors.fontPrimary,
        color: colors.fontHover,
      },
    }),
    menuList: (base: {}) => ({
      ...base,
      padding: `${spacingScale(0)}px`,
      fontSize: `${typography.fontSize}px`,
      color: colors.fontPrimary,
    }),
    dropdownIndicator: (base: {}) => ({
      ...base,
      color: hasCheckBox ? colors.palette.info : colors.border,
      padding: `${spacingScale(0.25)}px`,
    }),
    indicatorSeparator: (base: {}) => ({
      ...base,
      backgroundColor: colors.border,
    }),
    input: (base: {}) => ({
      ...base,
      fontSize: `${typography.fontSize}px`,
      color: colors.fontPrimary,
    }),
  }

  function Option({ children, ...rest }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { isSelected, label }: { isSelected: boolean; label: String } = {
      ...rest,
    }
    return (
      <div>
        <components.Option {...rest}>
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => null}
            style={{
              width: typography.heading,
              height: typography.heading,
              verticalAlign: 'middle',
              marginRight: `${spacingScale(0.25)}px`,
            }}
          />{' '}
          <span>{String(label)}</span>
        </components.Option>
      </div>
    )
  }

  function MultiValue({ children, ...rest }: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const {
      selectProps,
      data,
    }: {
      selectProps: { value: Array<{ label: String }> }
      data: { label: String }
    } = { ...rest }
    let lab: JSX.Element = <span />
    const values = selectProps.value
    const lastValue = values[values.length - 1]
    let { label } = data
    if (lastValue.label !== label) {
      label += ', '
    }

    if (label !== 'All, ') {
      lab = <span>{label}</span>
    }
    return lab
  }

  let classNamePrefix = ''
  let hideSelectedOptions = true
  let closeMenuOnSelect = true
  let isClearable = true
  let customCompo = {}
  let optionsUp = [...options]

  const selectAllOption = { value: 'All', label: 'All' }
  if (hasCheckBox === true) {
    classNamePrefix = 'CustomSelect'
    hideSelectedOptions = false
    closeMenuOnSelect = false
    isClearable = false

    customCompo = { Option, MultiValue }

    optionsUp = [selectAllOption, ...options]
  }

  return (
    <div data-testid="multi-select-component">
      <Select
        classNamePrefix={classNamePrefix}
        hideSelectedOptions={hideSelectedOptions}
        closeMenuOnSelect={closeMenuOnSelect}
        isClearable={isClearable}
        maxMenuHeight={200}
        value={hasCheckBox ? valueSel : value}
        options={optionsUp}
        placeholder={String(placeholder)}
        styles={customStyles}
        onChange={(val, actionMeta) => {
          if (hasCheckBox === true) {
            let ArrVal: Array<SelectInterface> = []
            const { option, action } = actionMeta
            if (option?.value === 'All') {
              if (action === 'select-option') {
                ArrVal = [...optionsUp]
              } else {
                ArrVal = []
              }
            } else if (action === 'deselect-option') {
              ArrVal = val.filter((v) => v.value !== 'All')
            } else {
              ArrVal = [...val]
            }
            setvalueSel(ArrVal)
            ArrVal = ArrVal.filter((v) => v.value !== 'All')
            onChange(ArrVal)
          } else {
            onChange([...val])
          }
        }}
        isMulti
        components={customCompo}
      />
    </div>
  )
}
