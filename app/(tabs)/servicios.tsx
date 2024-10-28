import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router'; // Importa el hook para navegación

export default function RegistroCitas() {
  const router = useRouter(); // Hook para la navegación de expo-router

  const [formState, setFormState] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
  });

  const registrarCita = () => {
    // Navegar a la siguiente pantalla para continuar el registro
    router.push('../screens/servicios2');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Contratación de Ambulancias</Text>

      <View style={styles.rowContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.note}>
            Nota: Si no sabe cómo llenar un campo, coloque el cursor sobre el símbolo de interrogación para obtener más información.
          </Text>
          <Text style={styles.instruction}>
            Para la contratación de eventos, en "Inicio Traslado" coloque el lugar del evento y en "Escala" y "Destino Traslado" coloque "No Aplica".
          </Text>
        </View>
        <Image source={require('../../assets/images/ambu.png')} style={styles.imageSmall} />
      </View>

      <Text style={styles.sectionTitle}>Información de la Contratación</Text>

      <View style={styles.formContainer}>
        {/* Campos de formulario */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={formState.nombre}
            onChangeText={(text) => setFormState({ ...formState, nombre: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Apellido Paterno</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido Paterno"
            value={formState.apellidoPaterno}
            onChangeText={(text) => setFormState({ ...formState, apellidoPaterno: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput
            style={styles.input}
            placeholder="Apellido Materno"
            value={formState.apellidoMaterno}
            onChangeText={(text) => setFormState({ ...formState, apellidoMaterno: text })}
          />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Motivo</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Motivo"
            value={formState.correo}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => setFormState({ ...formState, correo: text })}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.registerButton} onPress={registrarCita}>
          <Text style={styles.registerButtonText}>Continuar con el Registro</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 35,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  note: {
    color: 'black',
    fontSize: 13,
    lineHeight: 20,
    marginBottom: 10,
  },
  instruction: {
    color: 'black',
    fontSize: 13,
    lineHeight: 20,
  },
  imageSmall: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'black',
    paddingTop: -25,
    textAlign: 'center',
  },
  formContainer: {
    marginLeft: 40,
  },
  inputWrapper: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#646464',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 15,
    fontSize: 15,
    flex: 1,
    maxWidth: 250,
    color: '#9b9b9b',
  },
  textArea: {
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    maxWidth: 250,
    textAlignVertical: 'top',
  },
  buttonContainer: {
    alignItems: 'center',
  },
  registerButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: -5,
    width: '70%',
    maxWidth: 300,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
