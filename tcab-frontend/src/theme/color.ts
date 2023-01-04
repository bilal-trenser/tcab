import palette from './palette'

const color = {
  palette,

  background: palette.primary,
  backgroundLight: palette.secondary,
  backgroundDark: palette.primaryContrast,

  border: palette.secondary,
  borderLight: palette.supplementaryColor1,
  borderDark: palette.secondaryContrast,
  borderBlue: palette.tertiaryContrast,

  buttonDefault: palette.tertiary,
  buttonDisable: palette.accentContrast,
  buttonNatural: palette.primary,
  buttonInfo: palette.info,
  buttonDanger: palette.danger,
  buttonWarning: palette.warning,

  fontPrimary: palette.primaryContrast,
  fontSecondary: palette.secondary,
  fontHover: palette.accent,
  placeholder: palette.accentContrast,

  error: palette.dangerDark,
}

export default color
