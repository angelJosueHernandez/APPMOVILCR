import React from 'react';
import { Image, StyleSheet, TextInput, View, Text, ScrollView, TouchableOpacity, Platform } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Header con logo y texto */}
      <View style={styles.header}>
        <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
        <Image source={require('../../assets/images/ambu.png')} style={styles.avatar} />
      </View>

      {/* Barra de búsqueda */}
      <View style={styles.searchContainer}>
        <TextInput placeholder="Buscar" style={styles.searchInput} />
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
        {/* Aquí iría un carrusel real */}
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

      {/* Botón flotante */}
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#E5415C',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 20,
  },
  searchInput: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
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
    fontSize: 18,
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
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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
  },
  floatingButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
