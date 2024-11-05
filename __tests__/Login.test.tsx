import React from 'react';
import { render } from '@testing-library/react-native';
import LoginScreen from '@/app/(tabs)/login';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Mock del SafeAreaProvider para evitar problemas de contexto
jest.mock('react-native-safe-area-context', () => {
  const SafeAreaProvider = ({ children }) => <>{children}</>;
  return {
    SafeAreaProvider,
    SafeAreaConsumer: ({ children }) => children({}),
    useSafeAreaInsets: () => ({ top: 0, left: 0, right: 0, bottom: 0 }),
  };
});

describe('LoginScreen', () => {
  // Helper function para renderizar el componente con NativeBaseProvider
  const renderComponent = () =>
    render(
      <NativeBaseProvider>
        <LoginScreen />
      </NativeBaseProvider>
    );

  it('debe tener un campo de entrada para correo', async () => {
    const { findByPlaceholderText, debug } = renderComponent();
    debug(); // Muestra la salida del renderizado
    const emailInput = await findByPlaceholderText('Ingrese su correo');
    expect(emailInput).toBeTruthy();
  });

  it('debe tener un campo de entrada para contraseña', async () => {
    const { findByPlaceholderText, debug } = renderComponent();
    debug(); // Muestra la salida del renderizado
    const passwordInput = await findByPlaceholderText('Ingrese su contrasea');
    expect(passwordInput).toBeTruthy();
  });
});
