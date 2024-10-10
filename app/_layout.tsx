/** 
 import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}
*/



import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplashScreen from './screens/AnimatedSplashScreen'; // Importa tu Splash Screen personalizado

// Asegúrate de que el Splash Screen nativo no se oculte automáticamente
SplashScreen.preventAutoHideAsync(); 

export default function RootLayout() {
  const [isAppReady, setIsAppReady] = useState(false); // Control de si la app está lista
  const [showCustomSplash, setShowCustomSplash] = useState(true); // Control de splash personalizado

  useEffect(() => {
    const prepareApp = async () => {
      try {
        // Aquí puedes cargar recursos si lo deseas
        setTimeout(async () => {
          await SplashScreen.hideAsync(); // Esconde el SplashScreen nativo de Expo
          setIsAppReady(true); // Marca la app como lista
        }, 500); // Añadir un pequeño retraso para asegurar que el splash nativo se oculte correctamente
      } catch (e) {
        console.warn(e);
      }
    };

    prepareApp();
  }, []); // El hook se ejecuta solo una vez al montar el componente

  // Mostrar el Splash Screen personalizado mientras la app se prepara
  if (!isAppReady) {
    return null; // Espera a que la app esté lista antes de mostrar algo
  }

  return (
    <>
      {showCustomSplash ? (
        <AnimatedSplashScreen onAnimationEnd={() => setShowCustomSplash(false)} /> // Esconde el splash personalizado al terminar
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      )}
    </>
  );
}