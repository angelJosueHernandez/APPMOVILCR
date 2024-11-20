import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Modal, Linking, Pressable, Alert, ActivityIndicator } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import * as Location from 'expo-location';
import ImageCarousel from '@/components/CarouselComponent';
import { useRouter } from 'expo-router';

export default function HomeScreen() {


  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar la visibilidad del popover
  const [modalVisible2, setModalVisible2] = useState(false); // Estado para controlar la visibilidad del popover



  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [address, setAddress] = useState('');
  const [routeUrl, setRouteUrl] = useState('');

  const cruzRojaLocation = { latitude: 21.1435, longitude: -98.4197 };

  // Función para obtener la ubicación del usuario
  const getLocation = async () => {
    setIsLoading(true);
    try {
      // Solicita permisos para acceder a la ubicación
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permiso denegado',
          'No se puede acceder a la ubicación sin permisos.'
        );
        setIsLoading(false);
        return;
      }

      // Obtiene la ubicación actual
      const currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      getAddress(currentLocation.coords.latitude, currentLocation.coords.longitude);
      getRoute(cruzRojaLocation, {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo obtener la ubicación.');
    } finally {
      setIsLoading(false);
    }
  };

  const getAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`
      );
      const data = await response.json();
      if (data.address) {
        const formattedAddress = `${data.address.road || ''}, ${
          data.address.neighbourhood || ''
        }, ${data.address.city || ''}, ${data.address.state || ''}, ${
          data.address.country || ''
        }`;
        setAddress(formattedAddress);
        setModalVisible(true);
      } else {
        Alert.alert('Error', 'No se pudo obtener la dirección.');
      }
    } catch (error) {
      Alert.alert('Error', 'Error al obtener la dirección.');
    }
  };

  const getRoute = (start: { latitude: number; longitude: number }, end: { latitude: number; longitude: number }) => {
    const origin = `${start.latitude},${start.longitude}`;
    const destination = `${end.latitude},${end.longitude}`;
    const routeUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    setRouteUrl(routeUrl);
  };

  const handleConfirm = () => {
    setModalVisible(false);
    if (location) {
      const message = `Necesito ayuda. Mi ubicación es: ${address}. Coordenadas: https://www.google.com/maps?q=${location.coords.latitude},${location.coords.longitude}. Ruta: ${routeUrl}`;
      const whatsappLink = `https://wa.me/5535518659?text=${encodeURIComponent(message)}`;
      Linking.openURL(whatsappLink);
    } else {
      Alert.alert('Error', 'No se pudo obtener la ubicación. Intenta nuevamente.');
    }
  };

  const router = useRouter();

  const handlePressCitas = () => {
    router.push('/citas'); // Asegúrate de que '/citas' sea la ruta correcta en tu configuración de rutas
  };

  const handlePressServicios = () => {
    router.push('/servicios'); // Asegúrate de que '/servicios' sea la ruta correcta en tu configuración de rutas
  };


  return (
    <View style={styles.container}>
      <ScrollView style={{ marginBottom: 110 }}>
        <LinearGradient
          colors={['#E5415C', '#E05C73']}
          style={styles.header}
        >
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
            <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
          </View>
        </LinearGradient>

        {/* Barra de búsqueda */}
        <View style={styles.centerSearchContainer}>
          <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#809BD6" style={styles.searchIcon} />
            <TextInput
              placeholder="Buscar"
              placeholderTextColor="#809BD6"
              style={styles.searchInput}
            />
          </View>
        </View>

        {/* Sección de botones */}
        <View style={styles.buttonContainer}>
          <View style={styles.helpButton}>
            <Image source={require('../../assets/images/ambu.png')} style={styles.ambu} />
            <Text style={styles.helpButtonText}>BOTON DE AYUDA</Text>
            <Text style={styles.helpButtonDescription}>
              Un Clic para la Ayuda Vital! Con nuestro botón de emergencia, la Cruz Roja está a tu lado en segundos.
            </Text>

              <TouchableOpacity
              style={styles.helpActionButton}
              onPress={getLocation}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.actionButtonText}>AYUDA</Text>
              )}
            </TouchableOpacity>

            {/* Info con Popover */}
            <TouchableOpacity style={styles.infoButton} onPress={() => setModalVisible2(true)}>
              <View style={styles.infoContainer}>
                <FontAwesome6 name="circle-info" size={10} color="#E5415C" />
                <Text style={styles.Info}> Info</Text>
              </View>
            </TouchableOpacity>

            {/* Modal que actúa como popover */}
            <Modal
              transparent={true}
              visible={modalVisible2}
              animationType="fade"
              onRequestClose={() => setModalVisible2(false)}
            >
              <View style={styles.modalContainer}>
                <View style={styles.popover}>
                  <View style={styles.popoverHeader}>
                    <Text style={styles.popoverTitle}>Información</Text>
                    <TouchableOpacity onPress={() => setModalVisible2(false)}>
                      <FontAwesome name="close" size={16} color="#555" />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.popoverText}>
                    Aquí puedes obtener más información sobre el botón de ayuda y cómo funciona el sistema de emergencia.
                  </Text>

                  <View style={styles.popoverActions}>
                    <Pressable
                      style={[styles.button, styles.cancelButton]}
                      onPress={() => setModalVisible2(false)}
                    >
                      <Text style={styles.cancelButtonText}>Cerrar</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </View>

        {/* Carrusel de imágenes */}
        <View style={styles.carouselContainer}>
            <ImageCarousel/>
        </View>

        {/* Sección de más opciones */}
        <View style={styles.optionsContainer}>
      <View style={styles.optionCard}>
        <Text style={styles.optionTitle}>SOLICITAR CITA</Text>
        <Text style={styles.optionDescription}>
          Saca tu cita fácil y rápido aquí.
        </Text>
        <TouchableOpacity onPress={handlePressCitas} style={styles.button2}>
          <Text style={styles.buttonText}>Ir a Citas</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.optionCard}>
        <Text style={styles.optionTitle}>CONTRATACIÓN DE SERVICIOS</Text>
        <Text style={styles.optionDescription}>
          Requieres trasladar a alguien en la Cruz Roja podemos ayudarte, agenda tu cita aquí.
        </Text>
        <TouchableOpacity onPress={handlePressServicios} style={styles.button3}>
          <Text style={styles.buttonText}>Ir a Servicios</Text>
        </TouchableOpacity>
      </View>
    </View>


      </ScrollView>

      {/* Botón flotante 
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>*/}

<Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.popover}>
            <Text style={styles.popoverTitle}>Confirmación de Envío</Text>
            <Text style={styles.popoverText}>
              Estás a punto de enviar tu ubicación a nuestro número de Emergencia. Si realizas una petición falsa, podrías recibir una penalización ciudadana.
            </Text>
            <View style={styles.popoverActions}>
              <Pressable
                style={[styles.button, styles.cancelButton]}
                onPress={handleConfirm}
              >
                <Text style={styles.cancelButtonText}>Confirmar</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.closeButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
    fontSize: 12,
    color: '#555',
    marginBottom: 20,
    marginTop:10,
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
    marginBottom:20,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    width: '45%',
    height:'110%',
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
    bottom: 210,
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
  closeButton: {
    backgroundColor: '#ccc',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight:'bold'
  },
  button2: {
    backgroundColor: '#E5415C',
    padding: 5,
    borderTopLeftRadius: 20, // Ejemplo de radio para la esquina superior izquierda
    borderTopRightRadius: 0, // Ejemplo de radio para la esquina superior derecha
    borderBottomLeftRadius: 20, // Ejemplo de radio para la esquina inferior izquierda
    borderBottomRightRadius: 0, // Ejemplo de radio para la esquina inferior derecha
    alignItems: 'center',
    width: 120,
    marginLeft: 31,
    top: 45,
  },
  button3: {
    backgroundColor: '#E5415C',
    padding: 5,
    borderTopLeftRadius: 20, // Ejemplo de radio para la esquina superior izquierda
    borderTopRightRadius: 0, // Ejemplo de radio para la esquina superior derecha
    borderBottomLeftRadius: 20, // Ejemplo de radio para la esquina inferior izquierda
    borderBottomRightRadius: 0, // Ejemplo de radio para la esquina inferior derecha
    alignItems: 'center',
    width: 120,
    marginLeft: 31,
    top: 15,
  },
});
