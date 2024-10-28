import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function DonacionesScreen() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    correo: '',
    montoDonacion: '',
  });

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = () => {
    // Navegar a la siguiente pantalla
    router.push('../screens/donaciones2'); // Reemplaza '/rutaDeLaSiguientePantalla' con la ruta real
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Donaciones</Text>
      <Text style={styles.subtitle}>Haz la diferencia hoy</Text>
      <Text style={styles.description}>
        Tu generosidad puede salvar vidas. Únete a nuestra misión y ayuda a aquellos que más lo necesitan.
      </Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Nombre"
          style={styles.input}
          value={formData.nombre}
          onChangeText={(text) => handleInputChange('nombre', text)}
        />
        <TextInput
          placeholder="Apellido Paterno"
          style={styles.input}
          value={formData.apellidoPaterno}
          onChangeText={(text) => handleInputChange('apellidoPaterno', text)}
        />
        <TextInput
          placeholder="Apellido Materno"
          style={styles.input}
          value={formData.apellidoMaterno}
          onChangeText={(text) => handleInputChange('apellidoMaterno', text)}
        />
        <TextInput
          placeholder="Teléfono"
          style={styles.input}
          keyboardType="phone-pad"
          value={formData.telefono}
          onChangeText={(text) => handleInputChange('telefono', text)}
        />
        <TextInput
          placeholder="Correo"
          style={styles.input}
          keyboardType="email-address"
          value={formData.correo}
          onChangeText={(text) => handleInputChange('correo', text)}
        />
        <TextInput
          placeholder="Monto de la donación"
          style={styles.input}
          keyboardType="numeric"
          value={formData.montoDonacion}
          onChangeText={(text) => handleInputChange('montoDonacion', text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continuar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 5,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
