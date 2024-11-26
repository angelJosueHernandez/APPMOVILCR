import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import AnimatedSplashScreen from './screens/AnimatedSplashScreen'; // Importa tu Splash Screen personalizado
import { AuthProvider } from '../Context/authcontext'; // Asegúrate de que la ruta sea correcta
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { StripeProvider } from '@stripe/stripe-react-native';

Sentry.init({
  dsn: "https://3638ca84d74f8b1f2e4a75369e04e303@o4508289853947904.ingest.us.sentry.io/4508290003304448",
  tracesSampleRate: 1.0,
  debug: true,
  release: Constants.expoConfig?.version,  // Usa la versión de tu app
});


// Asegúrate de que el Splash Screen nativo no se oculte automáticamente
SplashScreen.preventAutoHideAsync(); 

 function RootLayout() {


  const [isAppReady, setIsAppReady] = useState(false); // Control de si la app está lista
  const [showCustomSplash, setShowCustomSplash] = useState(true); // Control de splash personalizado

  const prepareApp = async () => {
    try {
      // Aquí puedes cargar recursos si lo deseas
      // Simula un tiempo de carga si es necesario
      await new Promise(resolve => setTimeout(resolve, 1000));
      await SplashScreen.hideAsync(); // Oculta el SplashScreen nativo de Expo
      setIsAppReady(true); // Marca la app como lista
    } catch (e) {
      console.warn(e);
    }
  };
  
  useEffect(() => {
    prepareApp();
  }, []);
  
  // Mostrar el Splash Screen personalizado mientras la app se prepara
  if (!isAppReady) {
    return null; // Espera a que la app esté lista antes de mostrar algo
  }

  return (
    <StripeProvider publishableKey='pk_test_51QJQ5uDIWznX38uOqRNbGsjduSvo12H8NQBCqVdIMS3U28yXBQyk6TW8NReNgcZMWfQWayD2i2pXtFIvYJoIUsZf00eIziHzHG'>
    <AuthProvider>
      {showCustomSplash ? (
        <AnimatedSplashScreen onAnimationEnd={() => setShowCustomSplash(false)} /> // Esconde el splash personalizado al terminar
      ) : (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="screens/enviarToken" options={{ headerShown: false }} />
          <Stack.Screen name="screens/ingresarToken" options={{ headerShown: false }} />
          <Stack.Screen name="screens/registro" options={{ headerShown: false }} />
          <Stack.Screen name="screens/servicios2" options={{ headerShown: false }} />
          <Stack.Screen name="screens/donaciones2" options={{ headerShown: false }} />
          <Stack.Screen name="screens/doblefactor" options={{ headerShown: false }} />
        </Stack>
      )}
    </AuthProvider>
    </StripeProvider>
  );
}

export default Sentry.wrap(RootLayout);
