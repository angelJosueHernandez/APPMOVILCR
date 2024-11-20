import React, { useState, useRef } from 'react';
import { StyleSheet, Image, KeyboardAvoidingView, Platform, Dimensions, SafeAreaView, View, Modal, Alert } from 'react-native';
import { NativeBaseProvider, Center, Box, Heading, VStack, FormControl, Icon as NBIcon, Input, Link, Button, HStack, Text, IconButton } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView } from 'react-native';
import { useAuth } from '../../Context/authcontext';
import { LinearGradient } from 'expo-linear-gradient';
const { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const { setIsAuthenticated, setCorreoGuardar, isAuthenticated, correoGuardar, user } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado de carga
  



    // Estados de validación
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    // Función de validación
    const validateInputs = () => {
      let valid = true;
  
      // Validar correo
      if (!email) {
        setEmailError('El correo es obligatorio.');
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        setEmailError('El formato del correo no es válido.');
        valid = false;
      } else {
        setEmailError('');
      }
  
      // Validar contraseña
      if (!password) {
        setPasswordError('La contraseña es obligatoria.');
        valid = false;
      } else if (password.length < 6) {
        setPasswordError('La contraseña debe tener al menos 6 caracteres.');
        valid = false;
      } else {
        setPasswordError('');
      }
  
      return valid;
    };
  


  const verificacionCorreoTokenEnviar = async (email: string) => {
    try {
      const requestBody = { correo: email };

      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/enviarverificacionCorreo/${encodeURIComponent(email)}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error('Error al enviar el correo de verificación');
      }
      console.log('Correo de verificación enviado exitosamente');
      // Puedes agregar aquí cualquier manejo adicional después de enviar el correo
    } catch (error) {
      console.error('Error al enviar el correo de verificación:', error);
      Alert.alert('Error', 'Hubo un problema al enviar el correo de verificación.');
    }
  };

  const handleLogin = async () => {

    if (!validateInputs()) {
      return; // Detener el inicio de sesión si las validaciones fallan
    }


    setIsLoading(true); // Mostrar el componente de carga
    try {
      console.log('Iniciando sesión con:', { correo: email, contraseña: password });

      const response = await fetch('https://api-beta-mocha-59.vercel.app/user/authenticate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          correo: email,
          contraseña: password,
        }),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      if (response.ok && data.mensaje === 'Autenticación exitosa') {
        setIsAuthenticated(false); // Usuario no autenticado hasta que pase doble factor
        setCorreoGuardar(email);  // Guardar email para el doble factor

        // Llamada a la función de envío de correo de verificación
        await verificacionCorreoTokenEnviar(email);
        setEmail(''); // Limpiar el input de correo
        setPassword(''); // Limpiar el input de contraseña
  
        router.push('../screens/doblefactor');
        setIsLoading(false); 
      } else {
        Alert.alert('Error', data.mensaje || 'Error de inicio de sesión.');
        setIsLoading(false); 
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un problema con el inicio de sesión. Inténtalo nuevamente.');
      setIsLoading(false); 
    }
  };

  if (isAuthenticated) {
    return (
      <NativeBaseProvider>
          <LinearGradient
          colors={['#E5415C', '#E05C73']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
            <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
          </View>
        </LinearGradient>
        <View style={styles.container}>
          <Text style={styles.welcomeText}>Bienvenido, {user}</Text>
          <Text style={styles.emailText}>Correo guardado: {correoGuardar}</Text>
          <Button onPress={() => setIsAuthenticated(false)} title="Cerrar sesión" />
        </View>
      </NativeBaseProvider>
    );
  }


  return (
    <NativeBaseProvider>
      
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
          <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
            <View style={styles.innerContainer}>
              <Center w="100%" style={styles.centerContent}>
              <LinearGradient
          colors={['#E5415C', '#E05C73']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
            <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
          </View>
        </LinearGradient>
                <Text style={styles.subtitle}>Introduce tu Correo y Contraseña</Text>

                <Box position="relative" mt={3} style={styles.imageContainer}>
                  <Image source={require('@/assets/images/personal4.png')} style={styles.personImage} />
                  <Box style={styles.circle1}></Box>
                  <Box style={styles.circle2}></Box>
                  <Box style={styles.circle3}></Box>
                  <Box style={styles.circle4}></Box>
                  <Box style={styles.circle5}></Box>
                  <Box style={styles.circle6}></Box>
                </Box>
                <Box safeArea p="2" py="5" w="90%" maxW="350" style={styles.formContainer}>
                  <VStack space={3}>
                    <FormControl>
                      <FormControl.Label><Text style={styles.labelText}>Correo</Text></FormControl.Label>
                      <Input
                        placeholder="Ingrese su correo"
                        value={email}
                        onChangeText={setEmail}
                        InputLeftElement={<NBIcon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />}
                        h="50px"
                        p={3}
                        borderRadius="10px"
                      />
                       {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    </FormControl>
                    <FormControl>
                      <FormControl.Label><Text style={styles.labelText}>Contraseña</Text></FormControl.Label>
                      <Input
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChangeText={setPassword}
                        type={showPassword ? "text" : "password"}
                        InputRightElement={
                          <IconButton
                            icon={<NBIcon as={<MaterialIcons name={showPassword ? "visibility" : "visibility-off"} />} size={5} color="muted.400" />}
                            onPress={() => setShowPassword(!showPassword)}
                          />
                        }
                        h="50px"
                        p={3}
                        borderRadius="10px"
                      />
                       {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

                      <Link _text={{ fontSize: "xs", fontWeight: "500", color: "blue.500" }} alignSelf="flex-end" mt="1" onPress={() => router.push('../screens/enviarToken')}>
                        ¿Olvidaste tu contraseña?
                      </Link>
                    </FormControl>
                    <Button mt="4" colorScheme="red" borderRadius="25px" py={3} w="100%" h="55px" style={styles.loginButton} onPress={handleLogin}   isDisabled={isLoading} >
                    {isLoading ? (
                        <ActivityIndicator color="white" /> // Mostrar DotLoading
                      ) : (
                        <Text color="white" fontWeight="bold">Iniciar Sesión</Text>
                      )}
                    </Button>
                    <HStack mt="6" justifyContent="center">
                      <Text fontSize="sm" color="coolGray.600">¿No tienes una cuenta?{" "}</Text>
                      <Link _text={{ color: "blue.500", fontWeight: "medium", fontSize: "sm" }} onPress={() => router.push('../screens/registro')}>Regístrate</Link>
                    </HStack>
                  </VStack>
                </Box>
              </Center>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <Modal transparent={true} visible={modalVisible} animationType="slide" onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>¡Inicio de sesión exitoso!</Text>
            <Button onPress={() => setModalVisible(false)} colorScheme="blue">
              <Text color="white">Aceptar</Text>
            </Button>
          </View>
        </View>
      </Modal>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#E5415C' },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF' },
  innerContainer: { flex: 1, width: '100%', alignItems: 'center', paddingBottom: 30 },
  centerContent: { width: '100%', alignItems: 'center', backgroundColor: '#FFF' },
  
  subtitle: { marginTop: 30, fontSize: 16, color: 'gray', textAlign: 'center', marginBottom:30 },
  imageContainer: { alignItems: 'center', marginBottom: 20 },
  personImage: { width: width * 0.5, height: width * 0.5, alignSelf: 'center' },
  circle1: { width: width * 0.15, height: width * 0.15, borderRadius: (width * 0.15) / 2, backgroundColor: '#E5415C', position: 'absolute', top: 1, left: -20 },
  circle2: { width: width * 0.1, height: width * 0.1, borderRadius: (width * 0.1) / 2, backgroundColor: '#E5415C', position: 'absolute', top: 30, right: 15 },
  circle3: { width: width * 0.05, height: width * 0.05, borderRadius: (width * 0.05) / 2, backgroundColor: '#E5415C', position: 'absolute', top: 100, right: 220 },
  circle4: { width: width * 0.15, height: width * 0.15, borderRadius: (width * 0.15) / 2, backgroundColor: '#E5415C', position: 'absolute', top: 140, right: 140, zIndex: -1 },
  circle5: { width: width * 0.08, height: width * 0.08, borderRadius: (width * 0.08) / 2, backgroundColor: '#E5415C', position: 'absolute', top: 160, right: 15, zIndex: -1 },
  circle6: { width: width * 0.05, height: width * 0.05, borderRadius: (width * 0.05) / 2, backgroundColor: '#E5415C', position: 'absolute', top: 100, right: 1 },
  formContainer: { marginTop: -70 },
  labelText: { fontSize: 14, color: '#555' },
  loginButton: { marginTop: 15 },
  modalBackground: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContainer: { width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 18, fontWeight: 'bold', marginBottom: 20 },
  headerContent: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  header: {
    height: 90,
    width: '100%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    overflow: 'hidden',
  },
  headerText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    top: 15,
  },
  bellIcon: {
    position: 'absolute',
    right: 35,
    top: 15,
  },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeText: {
    fontSize: 20,
    marginBottom: 20
  },
  emailText: {
    fontSize: 16
  },
});
