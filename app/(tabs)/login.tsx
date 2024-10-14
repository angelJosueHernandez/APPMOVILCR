import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NativeBaseProvider, Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, IconButton, Icon } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function LoginScreen() {
  return (
    <NativeBaseProvider>
      <Center w="100%" style={styles.container}>

        {/* Encabezado con fondo rojo y texto */}
        <Box style={styles.header}>
          <Heading size="lg" fontWeight="600" color="white">
            Iniciar Sesión
          </Heading>
        </Box>

        {/* Subtítulo */}
        <Text style={styles.subtitle}>
          Introduce tu correo y contraseña
        </Text>

        {/* Botones de redes sociales */}
        <HStack space={4} justifyContent="center" mt={3}>
          <IconButton
            icon={<Icon as={FontAwesome} name="facebook" color="blue.500" />}
            borderRadius="full"
            _pressed={{ bg: "blue.200" }}
          />
          <IconButton
            icon={<Icon as={FontAwesome} name="google" color="red.500" />}
            borderRadius="full"
            _pressed={{ bg: "red.200" }}
          />
        </HStack>

        {/* Imagen de persona y círculos decorativos */}
        <Box position="relative" mt={3}>
          <Image source={require('@/assets/images/personal4.png')} style={styles.personImage} />
          <Box style={styles.circle1}></Box>
          <Box style={styles.circle2}></Box>
          <Box style={styles.circle3}></Box>
          <Box style={styles.circle4}></Box>
          <Box style={styles.circle5}></Box>
          <Box style={styles.circle6}></Box>
        </Box>

        {/* Formulario de correo y contraseña */}
        <Box safeArea p="2" py="5" w="100%" maxW="350" mt={-20}> {/* Ajustar mt para subir el formulario */}
          <VStack space={3}>
            <FormControl>
              <FormControl.Label>Correo</FormControl.Label>
              <Input
                placeholder="Ingrese su correo"
                InputLeftElement={
                  <Icon as={<MaterialIcons name="email" />} size={5} ml="2" color="muted.400" />
                }
                h="50px" // Ajuste de altura
                p={3}    // Padding interno
                borderRadius="10px" // Border radius agregado
              />
            </FormControl>
            <FormControl>
              <FormControl.Label>Contraseña</FormControl.Label>
              <Input
                placeholder="Ingrese su contraseña"
                type="password"
                InputRightElement={
                  <Icon as={<MaterialIcons name="visibility-off" />} size={5} mr="2" color="muted.400" />
                }
                h="50px" // Ajuste de altura
                p={3}    // Padding interno
                borderRadius="10px" // Border radius agregado
              />
              <Link _text={{ fontSize: "xs", fontWeight: "500", color: "blue.500" }} alignSelf="flex-end" mt="1">
                ¿Olvidaste tu contraseña?
              </Link>
            </FormControl>

            {/* Botón de iniciar sesión */}
            <Button mt="4" colorScheme="red" borderRadius="25px" py={3} w="100%" h="55px">
              Iniciar Sesión
            </Button>

            {/* Enlace para registrarse */}
            <HStack mt="6" justifyContent="center">
                
              <Text fontSize="sm" color="coolGray.600">
                ¿No tienes una cuenta?{" "}
              </Text>
              <Link _text={{ color: "blue.500", fontWeight: "medium", fontSize: "sm" }}>
                Registrate
              </Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    marginTop: -100, // Ajuste del encabezado
  },
  header: {
    backgroundColor: '#FF4C4C',
    width: '100%',
    height: 130, // Altura del encabezado
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    paddingTop: 35,
  },
  subtitle: {
    marginTop: 15,
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
  },
  personImage: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 20,
  },
  circle1: {
    width:50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'red',
    position: 'absolute',
    top: 1,
    left: -20,
  },
  circle2: {
    width: 35,
    height: 35,
    borderRadius: 16,
    backgroundColor: 'red',
    position: 'absolute',
    top: 30,
    right: 15,
  },
  circle3: {
    width: 17,
    height: 17,
    borderRadius: 12.5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 100,
    right: 220,
  },
  circle4: {
    width: 50, // Asegúrate de que el tamaño sea adecuado para cubrir la imagen
    height: 50, // Mantener el mismo tamaño para hacer un círculo perfecto
    borderRadius: 25, // Radio para hacer el círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 165, // Ajusta la posición para que esté detrás de la imagen
    right: 140,
    zIndex: -1, // Envía el círculo al fondo para que la imagen quede encima
  },  
  circle5: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
    position: 'absolute',
    top: 160,
    right: 15,
    zIndex: -1, 
  },
  circle6: {
    width: 17,
    height: 17,
    borderRadius: 12.5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 100,
    right: 1,
  },
});
