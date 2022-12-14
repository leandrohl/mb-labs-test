import { DefaultTheme } from "@react-navigation/native";

export const theme = {
  colors: {
    primary: '#d8532a',
    secondary: '#0096C7',
    background: '#0d0d0d',
    text: "#fafafa",
    card: "#121212",
    borderInput: '#7d7d7d',
    placeHolderInput: '#5f5f5f',
    white: "#fff",
    icon: '#878686',
    link: '#1877f2',
    error: '#CE0D30'
  },
  fonts: {
    interRegular: 'Inter-Regular',
    interBold: 'Inter-Bold',
    interMedium: 'Inter-Medium',
  }
}


export const themeNavigation: typeof DefaultTheme = {
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    ...theme.colors
  }
};