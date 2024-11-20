import React, { useState } from 'react';
import { StyleSheet, ScrollView, KeyboardAvoidingView, Platform, View, Alert, TouchableOpacity } from 'react-native';
import { NativeBaseProvider, Center, Box, VStack, FormControl, Input, Button, HStack, Text, Switch, Icon as NBIcon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import IconIon from 'react-native-vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';



export default function Registro() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [telefono, setTelefono] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Validación del correo
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Validación del teléfono
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Solo acepta 10 dígitos
    return phoneRegex.test(phone);
  };

  // Manejo de cambio en el campo de teléfono
  const handlePhoneChange = (phone) => {
    const sanitizedPhone = phone.replace(/[^0-9]/g, ''); // Elimina caracteres no numéricos
    setTelefono(sanitizedPhone.slice(0, 10)); // Limita a 10 dígitos
  };

  const handleRegister = async () => {
    // Validar campos antes de enviar la solicitud
    if (!nombre || !apellidoPaterno || !apellidoMaterno || !correo || !contraseña || !telefono) {
      Alert.alert("Error", "Por favor, rellena todos los campos.");
      return;
    }

    if (!validateEmail(correo)) {
      Alert.alert("Error", "Correo electrónico no válido.");
      return;
    }

    if (!validatePhone(telefono)) {
      Alert.alert("Error", "Teléfono no válido. Debe contener exactamente 10 dígitos.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }

    if (!termsAccepted || !privacyAccepted) {
      Alert.alert("Error", "Debes aceptar los términos y condiciones y la política de privacidad.");
      return;
    }

    try {
      const response = await fetch('http://192.168.1.178:3000/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido_Paterno: apellidoPaterno,
          apellido_Materno: apellidoMaterno,
          correo,
          contraseña,
          telefono,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Registro exitoso", "Te has registrado correctamente");
        router.push('/login');
      } else {
        switch (response.status) {
          case 400:
            Alert.alert("Error de registro", data.msg || "Por favor, verifica todos los campos.");
            break;
          case 409:
            Alert.alert("Error de registro", "El correo ya está registrado. Intenta con otro correo.");
            break;
          case 500:
            Alert.alert("Error en el servidor", "Ocurrió un problema en el servidor. Inténtalo más tarde.");
            break;
          default:
            Alert.alert("Error de registro", "No se pudo completar el registro. Inténtalo más tarde.");
        }
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      Alert.alert("Error", "No se pudo completar el registro. Revisa tu conexión e inténtalo nuevamente.");
    }
  };

  return (
    <NativeBaseProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -150}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Center w="100%" style={styles.container}>
          <LinearGradient
          colors={['#E5415C', '#E05C73']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
            <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
          </View>
        </LinearGradient>
            <Text style={styles.subtitle}>
              Rellena los campos con sus datos reales
            </Text>
            <Box safeArea p="2" py="6" w="90%" maxW="350" style={styles.formContainer}>
              <VStack space={3}>
                <HStack space={3}>
                  <FormControl w="48%">
                    <FormControl.Label><Text>Nombre</Text></FormControl.Label>
                    <Input placeholder="Nombre" style={styles.inputField} value={nombre} onChangeText={setNombre} />
                  </FormControl>
                  <FormControl w="48%">
                    <FormControl.Label><Text>Apellido Paterno</Text></FormControl.Label>
                    <Input placeholder="Apellido paterno" style={styles.inputField} value={apellidoPaterno} onChangeText={setApellidoPaterno} />
                  </FormControl>
                </HStack>
                <HStack space={3}>
                  <FormControl w="48%">
                    <FormControl.Label><Text>Apellido Materno</Text></FormControl.Label>
                    <Input placeholder="Apellido materno" style={styles.inputField} value={apellidoMaterno} onChangeText={setApellidoMaterno} />
                  </FormControl>
                  <FormControl w="48%">
                    <FormControl.Label><Text>Teléfono</Text></FormControl.Label>
                    <Input 
                      placeholder="Teléfono" 
                      style={styles.inputField} 
                      value={telefono} 
                      onChangeText={handlePhoneChange} 
                      keyboardType="numeric" 
                      maxLength={10} 
                    />
                  </FormControl>
                </HStack>
                <FormControl>
                  <FormControl.Label><Text>Correo</Text></FormControl.Label>
                  <Input placeholder="Correo" style={styles.inputField} value={correo} onChangeText={setCorreo} />
                </FormControl>
                <FormControl>
                  <FormControl.Label><Text>Contraseña</Text></FormControl.Label>
                  <Input
                    placeholder="Contraseña"
                    secureTextEntry={!showPassword}
                    style={styles.inputField}
                    value={contraseña}
                    onChangeText={setContraseña}
                    InputRightElement={
                      <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <IconIon
                          name={showPassword ? 'eye' : 'eye-off'}
                          size={20}
                          color="gray"
                          style={{ marginRight: 10 }}
                        />
                      </TouchableOpacity>
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormControl.Label><Text>Confirmar Contraseña</Text></FormControl.Label>
                  <Input
                    placeholder="Confirmar contraseña"
                    secureTextEntry={!showConfirmPassword}
                    style={styles.inputField}
                    value={confirmarContraseña}
                    onChangeText={setConfirmarContraseña}
                    InputRightElement={
                      <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                        <IconIon
                          name={showConfirmPassword ? 'eye' : 'eye-off'}
                          size={20}
                          color="gray"
                          style={{ marginRight: 10 }}
                        />
                      </TouchableOpacity>
                    }
                  />
                </FormControl>
                <HStack alignItems="center" mt={1} space={0.5}>
                  <Switch size="sm" isChecked={privacyAccepted} onToggle={() => setPrivacyAccepted(!privacyAccepted)} />
                  <Text style={styles.switchText}>Acepta nuestra política de privacidad</Text>
                </HStack>
                <HStack alignItems="center" space={0.5} mt={-1}>
                  <Switch size="sm" isChecked={termsAccepted} onToggle={() => setTermsAccepted(!termsAccepted)} />
                  <Text style={styles.switchText}>Acepta nuestros términos y condiciones</Text>
                </HStack>
                <Button mt="4" style={styles.registerButton} onPress={handleRegister}>
                  <Text style={{ color: 'white' }}>Registrarse</Text>
                </Button>
                <Button mt="2" variant="outline" style={styles.googleButton} leftIcon={<NBIcon as={FontAwesome} name="google" size={5} color="black" />}>
                  <Text>Iniciar sesión con Google</Text>
                </Button>
                <HStack mt="4" justifyContent="center" alignItems="center">
                  <Text style={styles.loginText}>
                    ¿Ya tienes una cuenta?{" "}
                  </Text>
                  <Button variant="link" onPress={() => router.push('/login')} style={styles.loginLink}>
                    <Text style={styles.loginLinkText}>Inicia Sesión</Text>
                  </Button>
                </HStack>
              </VStack>
            </Box>
          </Center>
        </ScrollView>
      </KeyboardAvoidingView>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#FFF', flex: 1, marginBottom:20,},
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFF', },
  subtitle: { marginTop: 20, paddingTop: 10, fontSize: 16, color: 'gray', textAlign: 'center' },
  formContainer: { marginTop: -50 },
  inputField: { borderRadius: 20, height: 40, fontSize: 14, paddingHorizontal: 8 },
  switchText: { fontSize: 12, color: 'gray' },
  registerButton: { backgroundColor: 'red', borderRadius: 25, height: 45, width: "80%", justifyContent: 'center', alignSelf: 'center' },
  googleButton: { borderRadius: 25, height: 45, width: "80%", justifyContent: 'center', alignSelf: 'center', borderColor: 'black' },
  loginText: { fontSize: 12, color: 'gray' },
  loginLink: { marginTop: -3 },
  loginLinkText: { color: 'blue', fontSize: 12, fontWeight: 'bold' },
  header: {
    height: 90,
    width: '100%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    overflow: 'hidden',
  },
  headerContent: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
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
});
