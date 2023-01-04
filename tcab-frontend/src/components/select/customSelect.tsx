/* eslint-disable @typescript-eslint/no-unused-vars */
import Select from 'react-select'

import getDisplayMessage from '../../i18n/displayMessage'
import colors from '../../theme/color'
import dimensions from '../../theme/dimensions'
import { spacingScale } from '../../theme/spacing'
import typography from '../../theme/typography'
import { SelectCompInterface } from './interface'

function CustomSelect({
  options,
  error,
  onChange,
  value,
  dataTestId,
  type,
  name,
  placeholder = `${getDisplayMessage('common.select')}`,
}: SelectCompInterface) {
  let selectBorder = colors.palette.info
  if (error) {
    selectBorder = colors.error
  }
  const customStyles = {
    option: (provided: {}) => ({
      height: dimensions.formItems.height,
      ...provided,
      color: colors.fontPrimary,
      backgroundColor: colors.background,
      '&:hover': {
        backgroundColor: colors.palette.info,
      },
      border: `1px solid ${colors.border}`,
      padding: `${spacingScale(1)}px`,
    }),
    control: (base: {}) => ({
      height: dimensions.formItems.height,
      fontSize: `${typography.fontSize}px`,
      padding: `6px`,
      ...base,
      backgroundColor: colors.palette.info,
      color: colors.fontPrimary,
      border: `1px solid ${selectBorder}`,
      '&:hover': {
        // borderColor: error ? colors.error : colors.borderBlue,
      },
      // newStyle
      borderRadius: dimensions.borderRadius,
    }),
    Select: (provided: {}) => ({
      ...provided,

      backgroundColor: colors.background,
      color: colors.fontPrimary,
    }),
    singleValue: (provided: {}) => {
      const fontSize = `${typography.fontSize}px`
      const color = colors.fontPrimary
      const borderColor = colors.border

      return { ...provided, color, borderColor, fontSize }
    },
    menuList: (base: {}) => ({
      ...base,
      padding: `${spacingScale(0)}px`,
      fontSize: `${typography.fontSize}px`,
      color: colors.fontPrimary,
    }),
    dropdownIndicator: (base: {}) => ({
      ...base,
      color: colors.palette.info,
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
    placeholder: (base: {}) => ({
      ...base,
      color: colors.placeholder,
    }),
  }

  return (
    <div>
      <Select
        placeholder={placeholder}
        name={name}
        maxMenuHeight={200}
        value={options.filter((option) => option.value === value)}
        options={options}
        styles={customStyles}
        onChange={(val) => {
          if (val) onChange({ value: val?.value, label: val?.label })
          else onChange({ value: '', label: '' })
        }}
      />
    </div>
  )
}

export default CustomSelect
