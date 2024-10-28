import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { NativeBaseProvider, Center, Box, Heading, VStack, FormControl, Input, Link, Button, HStack, Text, IconButton, Icon } from 'native-base';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router'; // Importa el hook para navegación

export default function LoginScreen() {
  const router = useRouter(); // Hook de navegación

  return (
    <NativeBaseProvider>
      <Center w="100%" style={styles.container}>

        {/* Encabezado con fondo rojo y texto */}
        <Box style={styles.header}>
          {/* Título del encabezado */}
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
              <Link _text={{ fontSize: "xs", fontWeight: "500", color: "blue.500" }} alignSelf="flex-end" mt="1" onPress={() => router.push('../screens/enviarToken') } >
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
              <Link _text={{ color: "blue.500", fontWeight: "medium", fontSize: "sm" }} onPress={() => router.push('../screens/registro') }>
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
    marginTop: -100, // Ajuste del encabezado para mover todo el contenedor hacia arriba
  },
  header: {
    backgroundColor: '#FF4C4C',
    width: '100%',
    height: 100, // Altura del encabezado
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 45,
    borderBottomRightRadius: 45,
    paddingTop: 35, // Espacio dentro del header
  },
  subtitle: {
    marginTop: 15, // Espacio entre el header y el subtítulo
    fontSize: 16, // Tamaño de fuente del subtítulo
    color: 'gray',
    textAlign: 'center',
  },
  personImage: {
    width: 200, // Ancho de la imagen
    height: 200, // Alto de la imagen
    alignSelf: 'center', // Alineación en el centro
    marginTop: 20, // Espacio arriba de la imagen
  },
  // Círculos decorativos
  circle1: {
    width: 50, // Tamaño del círculo
    height: 50, // Tamaño del círculo
    borderRadius: 25, // Radio para hacer un círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 1, // Posición del círculo
    left: -20, // Posición del círculo
  },
  circle2: {
    width: 35, // Tamaño del círculo
    height: 35, // Tamaño del círculo
    borderRadius: 16, // Radio para hacer un círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 30, // Posición del círculo
    right: 15, // Posición del círculo
  },
  circle3: {
    width: 17, // Tamaño del círculo
    height: 17, // Tamaño del círculo
    borderRadius: 12.5, // Radio para hacer un círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 100, // Posición del círculo
    right: 220, // Posición del círculo
  },
  circle4: {
    width: 50, // Tamaño del círculo
    height: 50, // Tamaño del círculo
    borderRadius: 25, // Radio para hacer un círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 165, // Posición del círculo
    right: 140, // Posición del círculo
    zIndex: -1, // Círculo detrás de la imagen
  },  
  circle5: {
    width: 30, // Tamaño del círculo
    height: 30, // Tamaño del círculo
    borderRadius: 15, // Radio para hacer un círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 160, // Posición del círculo
    right: 15, // Posición del círculo
    zIndex: -1, // Círculo detrás de la imagen
  },
  circle6: {
    width: 17, // Tamaño del círculo
    height: 17, // Tamaño del círculo
    borderRadius: 12.5, // Radio para hacer un círculo
    backgroundColor: 'red',
    position: 'absolute',
    top: 100, // Posición del círculo
    right: 1, // Posición del círculo
  },
});
