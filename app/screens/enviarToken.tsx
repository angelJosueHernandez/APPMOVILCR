import { StyleSheet, Image, Platform } from 'react-native';
import { NativeBaseProvider,Center,Box,Heading,VStack,FormControl,Input,Link,Button,HStack,Text} from 'native-base';
import { useRouter } from 'expo-router'; // Importa el hook para navegación
import { LinearGradient } from 'expo-linear-gradient';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';


export default function Recuperacion() {
    const router = useRouter(); // Hook de navegación

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
                Bienvenido
                </Heading>
                <Heading mt="1" _dark={{
                color: "warmGray.200"
            }} color="coolGray.600" fontWeight="medium" size="xs">
                Introduce tu correo para enviarte el Token!
                </Heading>
                <View style={styles.email}>
                  <LottieView
                      source={require('../../assets/animations/email.json')} // Ruta del archivo Lottie
                      autoPlay
                      loop
                      style={styles.animation}
                  />
                </View>
                

                <VStack space={3} mt="5">
                <FormControl>
                    <FormControl.Label>Correo</FormControl.Label>
                    <Input />
                </FormControl>
                
                <Button mt="2" colorScheme="red">
                    Enviar token
                </Button>
                <Button mt="2" colorScheme="red">
                    Volver al inicio
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
    bellIcon: {
      position: 'absolute',
      right: 35,
      top: 15,
    },
    centerSearchContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      marginVertical: 20,
    },
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#EAF0FB',
      borderRadius: 35,
      paddingHorizontal: 30,
      height: 40,
      width: 340,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    searchIcon: {
      marginRight: 10,
    },
    infoButton: {
      marginTop: -10,
      alignSelf: 'flex-start', // Alinea el botón a la izquierda
    },
    infoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 5,
      paddingHorizontal: 10, // Ajusta el área interactiva para que esté alrededor del ícono y la palabra "Info"
    },
    Info: {
      fontSize: 11,
      color: '#E5415C',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    popover: {
      width: 300,
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
      elevation: 5,
    },
    popoverHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    popoverTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#333',
    },
    popoverText: {
      fontSize: 14,
      color: '#555',
      marginBottom: 20,
    },
    popoverActions: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    button: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 5,
      marginLeft: 10,
    },
    cancelButton: {
      backgroundColor: '#E5415C',
    },
    cancelButtonText: {
      color: '#ffff',
      fontWeight: 'bold',
    },
    searchInput: {
      flex: 1,
      fontSize: 16,
      color: '#000',
    },
    buttonContainer: {
      padding: 20,
    },
    helpButton: {
      backgroundColor: '#fff',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    helpButtonText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: '#E5415C',
      marginBottom: 10,
    },
    helpButtonDescription: {
      fontSize: 13,
      color: '#555',
      marginBottom: 10,
      margin: 5,
      lineHeight: 18,
    },
    helpActionButton: {
      backgroundColor: '#E5415C',
      padding: 8,
      borderRadius: 5,
      alignItems: 'center',
      width: 90,
      marginLeft: 220,
      top: 15,
    },
    actionButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 12,
    },
    carouselContainer: {
      padding: 20,
    },
    carouselImage: {
      width: '100%',
      height: 150,
      borderRadius: 10,
      marginBottom: 10,
    },
    optionsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 20,
    },
    optionCard: {
      backgroundColor: '#fff',
      padding: 15,
      borderRadius: 10,
      width: '45%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    optionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#E5415C',
      marginBottom: 5,
    },
    optionDescription: {
      fontSize: 12,
      color: '#555',
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
    ambu: {
      width: 60,
      height: 60,
      position: 'absolute',
      marginLeft: 300,
      top: -20,
    },
  });