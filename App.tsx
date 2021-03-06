import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider} from 'styled-components';

import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';

import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';

// import { Home } from './src/screens/Home';
// import { CarDetails } from './src/screens/CarDetails';
// import { Scheduling } from './src/screens/Scheduling';
// import { SchedulingDetails } from './src/screens/SchedulingDetails';
// import { SchedulingComplete } from './src/screens/SchedulingComplete';
// import { Splash } from './src/screens/Splash';

import { Routes } from './src/routes';

import theme from './src/styles/theme';

export default function App() {
  // Carregando as fontes no hook useFonts.
  const [ fontsLoaded ] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });
  
  // Caso ainda n tenha carregado as fontes, exibe o loading.
  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider
      theme={theme}
    >
      {/* <Home /> */}
      {/* <CarDetails /> */}
      {/* <Scheduling /> */}
      {/* <SchedulingDetails /> */}
      {/* <SchedulingComplete /> */}
      {/* <Splash /> */}
      <Routes />
    </ThemeProvider>
    
  );
}
