import { StyleSheet, Image, Platform } from 'react-native';
import { NativeBaseProvider,Center,Box,Heading,VStack,FormControl,Input,Link,Button,HStack,Text} from 'native-base';
import { useRouter } from 'expo-router'; // Importa el hook para navegación
import { LinearGradient } from 'expo-linear-gradient';
import { View, TextInput } from 'react-native';
import LottieView from 'lottie-react-native';
import React, { useState, useRef } from 'react';


export default function IngresarToken() {
    const router = useRouter(); // Hook de navegación

    const [token, setToken] = useState(["", "", "", ""]);
    const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];

    const handleInputChange = (text, index) => {
      const newToken = [...token];
      newToken[index] = text;
      setToken(newToken);
  
      // Mueve el foco al siguiente input si hay un caracter ingresado
      if (text && index < 3) {
        inputRefs[index + 1].current.focus();
      }
    };

    return (
        <NativeBaseProvider>
            <LinearGradient
                colors={['#E5415C', '#E05C73']}
                style={styles.header}
                >
                <View style={styles.headerContent}>
                    <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
                </View>
            </LinearGradient>
        <Center w="100%">
            <Box safeArea p="2" py="8" w="90%" maxW="290">
                <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                color: "warmGray.50"
            }}>
                Token
                </Heading>
                <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Ingresa el Token que acabamos de enviar a tu correo!
                </Heading>
                <View style={styles.email}>
                  <LottieView
                      source={require('../../assets/animations/token.json')} // Ruta del archivo Lottie
                      autoPlay
                      loop
                      style={styles.animation}
                  />
                </View>
                

                <VStack space={3} mt="5">

                <View style={styles.inputContainer}>
                  {token.map((value, index) => (
                    <TextInput
                      key={index}
                      ref={inputRefs[index]}
                      value={value}
                      onChangeText={(text) => handleInputChange(text, index)}
                      style={styles.input}
                      maxLength={1} // Limita el input a 1 caracter
                      keyboardType="numeric" // Solo números
                    />
                  ))}
                </View>
                
                <Button mt="2" colorScheme="red">
                    Verificar Token
                </Button>
                <Button mt="2" colorScheme="red" onPress={() => router.push('../screens/enviarToken') }>
                    Regresar
                </Button>
                
                </VStack>
            </Box>
        </Center>
        </NativeBaseProvider>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffffff',
      
    },
    email:{
      justifyContent: 'center',
      alignItems: 'center',
    },
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
    animation: {
      width: 250,
      height: 250,
    },
    inputContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
    },
    input: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 18,
    },
    floatingButton: {
      position: 'absolute',
      bottom: 120,
      right: 30,
      backgroundColor: '#E5415C',
      width: 60,
      height: 60,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
      zIndex: 100,
    },
    floatingButtonText: {
      color: '#fff',
      fontSize: 24,
      fontWeight: 'bold',
    },
    
  });