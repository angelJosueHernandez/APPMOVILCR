import React from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Image, Platform } from 'react-native'; 
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Encabezado con curva y degradado */}
        <LinearGradient
          colors={['#E5415C', '#E05C73']} // Degradado de rojo oscuro a claro
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
            <Text style={styles.helpButtonText}>BOTON DE AYUDA</Text>
            <Text style={styles.helpButtonDescription}>
              Un Clic para la Ayuda Vital! Con nuestro botón de emergencia, la Cruz Roja está a tu lado en segundos.
            </Text>
            <TouchableOpacity style={styles.helpActionButton}>
              <Text style={styles.actionButtonText}>AYUDA</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Carrusel de imágenes */}
        <View style={styles.carouselContainer}>
          <Image source={require('../../assets/images/ambu.png')} style={styles.carouselImage} />
          <Image source={require('../../assets/images/ambu.png')} style={styles.carouselImage} />
        </View>

        {/* Sección de más opciones */}
        <View style={styles.optionsContainer}>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>SOLICITAR CITA</Text>
            <Text style={styles.optionDescription}>
              Selebra tu cita fácil y rápido aquí.
            </Text>
          </View>
          <View style={styles.optionCard}>
            <Text style={styles.optionTitle}>CONTRATACION DE SERVICIOS</Text>
            <Text style={styles.optionDescription}>
              Requieres trasladar a alguien en la Cruz Roja, agenda tu cita aquí.
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Botón flotante */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    height: 90, // Ajusta la altura según lo necesario
    width: '100%',
    borderBottomLeftRadius: 1000, // Borde redondeado en la esquina inferior izquierda
    borderBottomRightRadius: 1000, // Borde redondeado en la esquina inferior derecha
    overflow: 'hidden', // Ocultar cualquier desbordamiento
  },
  headerContent: {
    position: 'absolute',
    top: 30, // Ajustado para que el texto y la campana estén bien alineados
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15, // Tamaño del texto reducido
    color: '#fff',
    textAlign: 'center',
    top:15,
  },
  bellIcon: {
    position: 'absolute',
    right: 35, // Alinea la campana a la derecha
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
    backgroundColor: '#EAF0FB', // Color de fondo suave
    borderRadius: 35, // Bordes redondeados
    paddingHorizontal: 30,
    height: 40, // Altura ajustada al tamaño de la imagen
    width: 340, // Ancho ajustado
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10, // Espacio entre el icono y el texto
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
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  helpActionButton: {
    backgroundColor: '#E5415C',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width:90,
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
    bottom: 30,
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
    zIndex: 100, // Para asegurarse de que esté siempre por encima del contenido
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
