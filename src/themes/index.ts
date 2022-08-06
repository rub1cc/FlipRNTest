import { createTheme } from "@shopify/restyle"

const palette = {
  orange: '#f76a37',
  mint: '#47be86',
  lightGrey: "#f5f9f8",

  black: 'black',
  white: 'white',
}

const colors = {
  primary: palette.orange,
  secondary: palette.mint,
  mainForeground: palette.black,
  mainBackground: palette.lightGrey,

  accentSuccess: palette.mint,
  accentPending: palette.orange,

  cardBackground: palette.white,
}

const spacing = {
  none: 0,
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24
}

const borderRadii = {
  none: 0,
  xs: 4,
  sm: 16,
  md: 24,
  lg: 64
}

const breakpoints = {
  phone: 0,
  tablet: 768,
}

const textVariants = {
  defaults: {
    color: 'mainForeground',
    fontSize: 16,
    lineHeight: 16 * 1.5
  }
}


const theme = createTheme({
  colors,
  spacing,
  borderRadii,
  breakpoints,
  textVariants
})

export type Theme = typeof theme
export default theme;

