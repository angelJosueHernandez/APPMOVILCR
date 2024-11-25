import React, { useState, useEffect } from 'react';
import { Stack } from 'expo-router';
import AnimatedSplashScreen from './screens/AnimatedSplashScreen';
import { AuthProvider } from '../Context/authcontext'; // Asegúrate de que la ruta sea correcta
import * as Sentry from '@sentry/react-native';
import Constants from 'expo-constants';
import { StripeProvider } from '@stripe/stripe-react-native';

Sentry.init({
  dsn: "https://3638ca84d74f8b1f2e4a75369e04e303@o4508289853947904.ingest.us.sentry.io/4508290003304448",
  tracesSampleRate: 1.0,
  debug: true,
  release: Constants.expoConfig?.version, // Usa la versión de tu app
});

function RootLayout() {
  const [showCustomSplash, setShowCustomSplash] = useState(true); // Control del splash personalizado

  useEffect(() => {
    // Captura de un error de prueba en Sentry
    Sentry.captureException(new Error("Prueba de error en Sentry"));

    const prepareApp = () => {
      setTimeout(() => {
        setShowCustomSplash(false); // Oculta el splash personalizado después del tiempo
      }, 1500); // Tiempo de espera para el splash personalizado
    };

    prepareApp();
  }, []); // Hook que se ejecuta solo una vez

  return (
    <StripeProvider publishableKey="pk_test_51QJQ5uDIWznX38uOqRNbGsjduSvo12H8NQBCqVdIMS3U28yXBQyk6TW8NReNgcZMWfQWayD2i2pXtFIvYJoIUsZf00eIziHzHG">
      <AuthProvider>
        {showCustomSplash ? (
          <AnimatedSplashScreen /> // Mostrar el splash personalizado
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
