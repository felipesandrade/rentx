import React from 'react';
import AppLoading from 'expo-app-loading';

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

import { Home } from './src/screens/Home';

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
    <Home />
  );
}
