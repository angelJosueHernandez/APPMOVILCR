import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Alert, TextInput } from 'react-native';
import { NativeBaseProvider, Center, Box, Text, Button, HStack } from 'native-base';
import { useAuth } from '../../Context/authcontext';
import { useRouter } from 'expo-router';
import { ActivityIndicator } from 'react-native';


export default function DoubleFactorScreen() {
  const router = useRouter(); 

  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  
  const length = 6; // Longitud del OTP
  const [code, setCode] = useState(Array(length).fill(''));
  const [timeLeft, setTimeLeft] = useState(60); // Temporizador inicial
  const [isResendEnabled, setIsResendEnabled] = useState(false);
  const [hasExpiredOnce, setHasExpiredOnce] = useState(false); // Verifica si el token ya expiró una vez
  const inputRefs = useRef<TextInput[]>([]);
  const { setIsAuthenticated, correoGuardar } = useAuth();
  // Manejador de cambios en los inputs
  const handleInputChange = (value: string, index: number) => {
    if (isNaN(Number(value))) return;

    const newCode = [...code];
    newCode[index] = value; // Actualizar el valor en el índice
    setCode(newCode);

    // Enfocar en el siguiente input automáticamente
    if (value && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Manejo de retroceso (Backspace)
  const handleKeyDown = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Enfocar el input anterior
    }
  };

  // Temporizador y lógica de expiración del token
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !hasExpiredOnce) {
      setIsResendEnabled(true);
      setHasExpiredOnce(true);

      // Expirar el token llamando a la API
      fetch('https://api-beta-mocha-59.vercel.app/actualizarToken', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo: correoGuardar }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Token expirado y actualizado:', data);
        })
        .catch((error) => {
          console.error('Error al expirar el token:', error);
        });
    }
  }, [timeLeft, hasExpiredOnce]);

  // Reenvío del token
  const handleResend = async () => {
    setIsResendEnabled(false);
    setTimeLeft(60); // Reinicia el temporizador
    setHasExpiredOnce(false); // Permitir la expiración nuevamente

    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/enviarverificacionCorreo/${encodeURIComponent(correoGuardar)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ correo: correoGuardar }),
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

  // Verificar token
  const handleVerify = async () => {

    setIsLoading(true);
    const tokenUsuario = code.join('');
    console.log(tokenUsuario);
    console.log(correoGuardar);
  
    if (tokenUsuario.length !== length) {
      Alert.alert('Error', 'Por favor, ingresa el código completo.');
      setIsLoading(false);
      return;
    }
  
    const requestBody = {
      correo: correoGuardar,
      tokenUsuario: tokenUsuario,
    };
  
    console.log('Request body:', requestBody); // Asegúrate de que sea un objeto plano
  
    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/verificacionTokenIdentificacion/${encodeURIComponent(correoGuardar)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );
  
      const data = await response.json(); // Verifica si la respuesta se puede serializar
      console.log('Response data:', data); // Esto ayudará a depurar
  
      if (data.mensaje === 'El token de verificación es válido') {
       
        setIsAuthenticated(true); // Usuario autenticado
          // Mostrar la alerta después de 3 segundos y luego navegar
          setTimeout(() => {
              Alert.alert('Éxito', 'Verificación exitosa', [
                  { 
                      text: "OK", onPress: () => router.replace('/(tabs)') // Navega cuando el usuario toca 'OK'
                  }
              ]);
              setIsLoading(false);
          }, 3000); // Espera 3 segundos antes de ejecutar

    
      } else {
        Alert.alert('Error', data.mensaje || 'Error al verificar el token.');
        setIsLoading(false);
      }
    } catch (error) {
      setIsLoading(false);
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
            Ingresa el código enviado a tu correo. Si no lo recibiste, revisa tu carpeta de spam.
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
                onKeyPress={(e) => handleKeyDown(e, index)}
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
          {isLoading ? (
                        <ActivityIndicator color="white" /> // Mostrar DotLoading
                      ) : (
                        <Text color="white" fontWeight="bold">Verificar</Text>
                      )}
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
