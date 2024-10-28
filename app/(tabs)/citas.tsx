import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
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
  const [currentDate, setCurrentDate] = useState<moment.Moment>(moment()); // Estado para manejar el mes actual
  const [selectedDate, setSelectedDate] = useState<string>(moment().format('YYYY-MM-DD')); // Fecha seleccionada

  const [nombreError, setNombreError] = useState<string>('');
  const [apellidoPaternoError, setApellidoPaternoError] = useState<string>('');
  const [apellidoMaternoError, setApellidoMaternoError] = useState<string>('');

  const regexLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;

  const handleNombreChange = (text: string) => {
    if (!regexLetras.test(text) && text !== '') {
      setNombreError('El nombre solo puede contener letras');
    } else {
      setNombreError('');
    }
    setFormState({ ...formState, nombre: text });
  };

  const handleApellidoPaternoChange = (text: string) => {
    if (!regexLetras.test(text) && text !== '') {
      setApellidoPaternoError('El apellido solo puede contener letras');
    } else {
      setApellidoPaternoError('');
    }
    setFormState({ ...formState, apellidoPaterno: text });
  };

  const handleApellidoMaternoChange = (text: string) => {
    if (!regexLetras.test(text) && text !== '') {
      setApellidoMaternoError('El apellido solo puede contener letras');
    } else {
      setApellidoMaternoError('');
    }
    setFormState({ ...formState, apellidoMaterno: text });
  };

  const validarCampos = (): boolean => {
    const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formState.nombre || !formState.apellidoPaterno || !formState.apellidoMaterno || !formState.correo) {
      setModalMessage('Todos los campos son obligatorios');
      setModalVisible(true);
      return false;
    }
    if (!regexCorreo.test(formState.correo)) {
      setModalMessage('El correo no es válido');
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

  // Verifica si todos los campos están completos
  const todosCamposLlenos: boolean = !!(formState.nombre && formState.apellidoPaterno && formState.apellidoMaterno && formState.correo);

  // Función para cambiar el mes cuando el usuario navega por el calendario
  const handleMonthChange = (month: DateObject) => {
    const newDate = moment(`${month.year}-${month.month}`, 'YYYY-MM');
    setCurrentDate(newDate);
  };

  // Función para poner la primera letra en mayúscula
  const capitalizeFirstLetter = (string: string): string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const hoy = moment().format('YYYY-MM-DD'); // Fecha de hoy

  return (
<ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ marginBottom: 50 }}>
    <View style={styles.container}>
    
      <Text style={styles.title}>Registro de Citas</Text>
       
      {/* Inputs de texto */}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={formState.nombre}
        onChangeText={handleNombreChange}
        autoCapitalize="words"
      />
      {nombreError ? <Text style={styles.errorText}>{nombreError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Apellido Paterno"
        value={formState.apellidoPaterno}
        onChangeText={handleApellidoPaternoChange}
        autoCapitalize="words"
      />
      {apellidoPaternoError ? <Text style={styles.errorText}>{apellidoPaternoError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Apellido Materno"
        value={formState.apellidoMaterno}
        onChangeText={handleApellidoMaternoChange}
        autoCapitalize="words"
      />
      {apellidoMaternoError ? <Text style={styles.errorText}>{apellidoMaternoError}</Text> : null}

      <TextInput
        style={styles.input}
        placeholder="Correo"
        value={formState.correo}
        onChangeText={(text: string) => setFormState({ ...formState, correo: text })}
        keyboardType="email-address"
      />

      {/* Calendario */}
      <Calendar
        style={styles.calendar}
        markedDates={{
          [hoy]: { selected: true, marked: true, selectedColor: 'red', textColor: 'white' }, // Marca la fecha de hoy con un círculo rojo y texto en blanco
        }}
        theme={{
          selectedDayBackgroundColor: 'red',
          todayTextColor: 'red',
          textDayFontWeight: 'bold', // Estilo para días activos
          arrowColor: 'red',
          textDisabledColor: 'gray',
        }}
        monthFormat={'MMMM yyyy'} // Formato del mes en español
        onMonthChange={handleMonthChange} // Evento para detectar cambio de mes
        // Renderizar el encabezado del calendario con el mes en español (primera letra mayúscula)
        renderHeader={() => (
          <Text style={styles.monthHeader}>
            {capitalizeFirstLetter(currentDate.format('MMMM yyyy'))}
          </Text>
        )}
        // Deshabilitar sábados y domingos
        dayComponent={({ date, state }) => {
          const isWeekend = moment(date.dateString).isoWeekday() === 6 || moment(date.dateString).isoWeekday() === 7;
          return (
            <TouchableOpacity
              disabled={isWeekend} // Deshabilitar la selección de sábados y domingos
              onPress={() => setSelectedDate(date.dateString)} // Actualiza la fecha seleccionada
            >
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    color: state === 'disabled' || isWeekend ? 'gray' : date.dateString === hoy ? 'white' : 'black',
                    fontWeight: date.dateString === selectedDate || date.dateString === hoy ? 'bold' : 'normal',
                    backgroundColor: date.dateString === hoy ? 'red' : 'transparent',
                    borderRadius: date.dateString === hoy ? 15 : 0,
                    padding: 5,
                  }}
                >
                  {date.day}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        disableAllTouchEventsForDisabledDays={true} // No permitir interacción en días deshabilitados
        firstDay={1} // Comienza la semana en lunes
      />

      <View style={styles.noCitasContainer}>
        <Evillcons name="calendar" size={30} />
        <Text style={styles.noCitasText}>No hay citas para hoy</Text>
        <AntDesing name="arrowright" size={25} style={styles.arrowIcon} />
      </View>

      {/* Botón de registrar cita */}
      <TouchableOpacity
        style={[styles.registrarButton, { backgroundColor: todosCamposLlenos ? 'red' : 'gray' }]} // Deshabilitar botón si no están todos los campos llenos
        onPress={registrarCita}
        disabled={!todosCamposLlenos}
      >
        <Text style={styles.registrarButtonText}>Registrar Cita</Text>
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
   </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  calendar: {
    marginBottom: 20,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
  },
  monthHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red',
  },
  noCitasContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  noCitasText: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  arrowIcon: {
    marginLeft: 120,
  },
  registrarButton: {
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  registrarButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
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
