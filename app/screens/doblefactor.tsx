import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Alert, TextInput } from 'react-native';
import { NativeBaseProvider, Center, Box, Text, Button, HStack } from 'native-base';
import { useAuth } from '../../Context/authcontext';

export default function DoubleFactorScreen() {
  const [code, setCode] = useState(Array(6).fill(''));
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const { setIsAuthenticated, correoGuardar } = useAuth();

  const handleInputChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < code.length - 1) inputRefs.current[index + 1]?.focus();
  };

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setIsResendEnabled(true);
    }
  }, [timeLeft]);

  const handleResend = async () => {
    if (!correoGuardar) {
      Alert.alert("Error", "Correo no disponible para el envío de verificación");
      return;
    }

    setIsResendEnabled(false);
    setTimeLeft(60); // Reinicia el temporizador

    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/enviarverificacionCorreo/${encodeURIComponent(correoGuardar)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (response.ok) {
        Alert.alert('Éxito', 'El token ha sido reenviado a tu correo');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.mensaje || 'No se pudo reenviar el token. Inténtalo más tarde.');
      }
    } catch (error) {
      console.error('Error al reenviar el token:', error);
      Alert.alert('Error', 'Error de red. Intenta de nuevo.');
    }
  };

  const handleVerify = async () => {
    if (!correoGuardar) {
      Alert.alert("Error", "Correo no disponible para la verificación");
      return;
    }

    const tokenUsuario = code.join('');
    if (tokenUsuario.length !== 6) {
      Alert.alert('Error', 'Por favor, ingresa el código completo.');
      return;
    }
    

    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/verificacionTokenIdentificacion/${encodeURIComponent(correoGuardar)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tokenUsuario }),
        }
      );

      const data = await response.json();
      if (data.mensaje === 'El token de verificación es válido') {
        setIsAuthenticated(true); // Marca al usuario como autenticado
        Alert.alert('Éxito', 'Verificación exitosa');
      } else {
        Alert.alert('Error', data.mensaje || 'Error al verificar el token.');
      }
    } catch (error) {
      console.error('Error al verificar el token:', error);
      Alert.alert('Error', 'Hubo un problema con la verificación.');
    }
  };

  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Box style={styles.container}>
          <Text style={styles.headerText}>Verificación Doble Factor</Text>
          <Text style={styles.description}>
            Favor de introducir el Token que fue enviado a tu correo. En caso de que no le haya llegado, revisa tu carpeta de spam.
          </Text>
          <HStack space={2} justifyContent="center" style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                style={styles.input}
                keyboardType="numeric"
                maxLength={1}
                onChangeText={(value) => handleInputChange(value, index)}
                value={digit}
              />
            ))}
          </HStack>
          <Text style={styles.resendText}>
            {isResendEnabled ? (
              <Text onPress={handleResend} style={styles.resendLink}>Reenviar token</Text>
            ) : (
              `Reenviar token en 0:${timeLeft < 10 ? `0${timeLeft}` : timeLeft}`
            )}
          </Text>
          <Button style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyButtonText}>VERIFICAR</Text>
          </Button>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', borderRadius: 15, padding: 25, alignItems: 'center', width: '90%' },
  headerText: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  description: { textAlign: 'center', marginBottom: 20, fontSize: 14 },
  codeContainer: { flexDirection: 'row', justifyContent: 'center' },
  input: { width: 40, height: 50, borderWidth: 1, textAlign: 'center', fontSize: 18 },
  resendText: { fontSize: 13, color: '#888', marginTop: 15 },
  resendLink: { color: '#007bff', textDecorationLine: 'underline' },
  verifyButton: { backgroundColor: '#ff0000', width: '100%', height: 50, borderRadius: 8, justifyContent: 'center', marginTop: 20 },
  verifyButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
});
