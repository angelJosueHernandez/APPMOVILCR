import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable } from 'react-native';
import { Calendar, LocaleConfig, DateObject } from 'react-native-calendars';
import Evillcons from 'react-native-vector-icons/EvilIcons';
import AntDesing from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import 'moment/locale/es';  // Importa el locale español para moment.js

// Configuración de la localización en español para el calendario
LocaleConfig.locales['es'] = {
  monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

// Definición de tipos para el estado de los campos
interface FormState {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
}

export default function RegistroCitas() {
  // Configurar moment en español
  moment.locale('es');

  const [formState, setFormState] = useState<FormState>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado para controlar la visibilidad del modal
  const [modalMessage, setModalMessage] = useState<string>(''); // Estado para el mensaje del modal

  const handleNombreChange = (text: string) => {
    setFormState({ ...formState, nombre: text });
  };

  const handleApellidoPaternoChange = (text: string) => {
    setFormState({ ...formState, apellidoPaterno: text });
  };

  const handleApellidoMaternoChange = (text: string) => {
    setFormState({ ...formState, apellidoMaterno: text });
  };

  const validarCampos = (): boolean => {
    if (!formState.nombre || !formState.apellidoPaterno || !formState.apellidoMaterno || !formState.correo) {
      setModalMessage('Todos los campos son obligatorios');
      setModalVisible(true);
      return false;
    }
    return true;
  };

  const registrarCita = () => {
    if (validarCampos()) {
      setModalMessage('Cita registrada con éxito');
      setModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contratación de Ambulancias</Text>

      <Text style={styles.note}>
        Nota: Si no sabe cómo llenar un campo, coloque el cursor sobre el símbolo de interrogación para obtener más información.
      </Text>
      <Text style={styles.instruction}>
        Para la contratación de eventos, en "Inicio Traslado" coloque el lugar del evento y en "Escala" y "Destino Traslado" coloque "No Aplica".
      </Text>

      <Text style={styles.sectionTitle}>Información de la Contratación</Text>

      {/* Inputs de texto */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formState.nombre}
        onChangeText={handleNombreChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={formState.apellidoPaterno}
        onChangeText={handleApellidoPaternoChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={formState.apellidoMaterno}
        onChangeText={handleApellidoMaternoChange}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo de Contratación"
      />

      <TextInput
        style={styles.input}
        placeholder="Motivo"
      />

      {/* Botón de registrar cita */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={registrarCita}
      >
        <Text style={styles.registerButtonText}>Continuar con el Registro</Text>
      </TouchableOpacity>

      {/* Modal para mostrar los mensajes de error */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
            <Pressable
              style={styles.modalButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40, // Aumentamos el padding superior
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginBottom: 30, // Más espacio debajo del título
  },
  note: {
    color: 'black',
    fontSize: 14,
    marginBottom: 15, // Más espacio debajo de la nota
  },
  instruction: {
    color: 'black',
    fontSize: 14,
    marginBottom: 30, // Más espacio debajo de la instrucción
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'black',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15, // Más espacio entre inputs
    fontSize: 16,
  },
  registerButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30, // Más espacio encima del botón
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
