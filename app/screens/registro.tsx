import React from 'react';
import { StyleSheet } from 'react-native';
import { NativeBaseProvider, Center, Box, Heading, VStack, FormControl, Input, Button, HStack, Text, Switch, Icon } from 'native-base';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Registro() {
  const router = useRouter();

  return (
    <NativeBaseProvider>
      <Center w="100%" style={styles.container}>
        
        {/* Encabezado con fondo rojo y título */}
        <Box style={styles.header}>
          <Heading style={styles.headerText}>Registro</Heading>
        </Box>
        
        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Rellena los campos con sus datos reales
        </Text>

        {/* Formulario de Registro */}
        <Box safeArea p="2" py="6" w="90%" maxW="350" style={styles.formContainer}>
          <VStack space={3}>
            {/* Campos de entrada de datos */}
            <HStack space={3}>
              <FormControl w="48%">
                <FormControl.Label><Text>Nombre</Text></FormControl.Label>
                <Input placeholder="Nombre" style={styles.inputField} />
              </FormControl>
              <FormControl w="48%">
                <FormControl.Label><Text>Apellido Paterno</Text></FormControl.Label>
                <Input placeholder="Apellido paterno" style={styles.inputField} />
              </FormControl>
            </HStack>
            <HStack space={3}>
              <FormControl w="48%">
                <FormControl.Label><Text>Apellido Materno</Text></FormControl.Label>
                <Input placeholder="Apellido materno" style={styles.inputField} />
              </FormControl>
              <FormControl w="48%">
                <FormControl.Label><Text>Teléfono</Text></FormControl.Label>
                <Input placeholder="Teléfono" style={styles.inputField} />
              </FormControl>
            </HStack>
            <FormControl>
              <FormControl.Label><Text>Correo</Text></FormControl.Label>
              <Input placeholder="Correo" style={[styles.inputField, styles.reducedWidthInput]} />
            </FormControl>
            <FormControl>
              <FormControl.Label><Text>Contraseña</Text></FormControl.Label>
              <Input placeholder="Contraseña" secureTextEntry style={[styles.inputField, styles.reducedWidthInput]} />
            </FormControl>
            <FormControl>
              <FormControl.Label><Text>Confirmar Contraseña</Text></FormControl.Label>
              <Input placeholder="Contraseña" secureTextEntry style={[styles.inputField, styles.reducedWidthInput]} />
            </FormControl>

            {/* Switch para términos y condiciones */}
            <HStack alignItems="center" mt={1} space={0.5}>
              <Switch size="sm" />
              <Text style={styles.switchText}>Acepta nuestra política de privacidad</Text>
            </HStack>
            <HStack alignItems="center" space={0.5} mt={-1}>
              <Switch size="sm" />
              <Text style={styles.switchText}>Acepta nuestros términos y condiciones</Text>
            </HStack>

            {/* Botón de Registro */}
            <Button mt="4" style={styles.registerButton}>
              <Text style={{ color: 'white' }}>Registrarse</Text>
            </Button>

            {/* Botón de Inicio de Sesión con Google */}
            <Button mt="2" variant="outline" style={styles.googleButton} leftIcon={<Icon as={FontAwesome} name="google" size={5} color="black" />}>
              <Text>Iniciar sesión con Google</Text>
            </Button>

            {/* Enlace para iniciar sesión */}
            <HStack mt="6" justifyContent="center">
              <Text style={styles.loginText}>
                ¿Ya tienes una cuenta?{" "}
              </Text>
              <Button variant="link" onPress={() => router.push('/login')} style={styles.loginLink}>
                <Text style={{ color: 'blue' }}>Inicia Sesión</Text>
              </Button>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

// Estilos del componente
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  header: {
    backgroundColor: '#FF4C4C',
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 90, // Baja el título dentro del encabezado
  },
  subtitle: {
    marginTop: 10,
    paddingTop: 10,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  formContainer: {
    marginTop: -50,
  },
  inputField: {
    borderRadius: 20,
    height: 40, // Altura de los Input
    fontSize: 14,
    paddingHorizontal: 8,
  },
  reducedWidthInput: {
    width: "65%", // Reduce el ancho de los campos de correo y contraseñas
    alignSelf: 'center', // Centra el input
  },
  switchText: {
    fontSize: 12,
    color: 'gray',
  },
  registerButton: {
    backgroundColor: 'red',
    borderRadius: 25,
    height: 45,
    width: "80%",
    justifyContent: 'center',
    alignSelf: 'center', // Centrado horizontal
  },
  googleButton: {
    borderRadius: 25,
    height: 45,
    width: "80%",
    justifyContent: 'center',
    alignSelf: 'center', // Centrado horizontal
    borderColor: 'black',
  },
  loginText: {
    fontSize: 12,
    color: 'gray',
    marginTop: -10,
  },
  loginLink: {
    fontWeight: 'medium',
    marginTop: -20,
  },
});
