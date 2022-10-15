import { NavigationContainer, DefaultTheme  } from "@react-navigation/native";
import React from "react";
import Routes from "./src/routes";
import { ThemeProvider } from "styled-components/native";
import { theme, themeNavigation } from "./src/global/styles/theme";
import { useFonts } from "expo-font";


export default function App() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('./src/assets/fonts/Inter-Regular.ttf'),
    'Inter-Bold': require('./src/assets/fonts/Inter-Bold.ttf'),
    'Inter-Medium': require('./src/assets/fonts/Inter-Medium.ttf')
  })

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={themeNavigation}>
        <Routes />
      </NavigationContainer>
    </ThemeProvider>
  );
}