import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Modal, Pressable, Image, ScrollView } from 'react-native';
import moment from 'moment';
import 'moment/locale/es';  
import Icon from 'react-native-vector-icons/FontAwesome';

interface FormState {
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
}

export default function RegistroCitas() {
  moment.locale('es');

  const [formState, setFormState] = useState<FormState>({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
  });

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<string>('');
  const [errors, setErrors] = useState({ nombre: '', apellidoPaterno: '', apellidoMaterno: '' });

  const soloLetras = (text: string) => /^[a-zA-Z\s]+$/.test(text);

  const handleNombreChange = (text: string) => {
    setFormState({ ...formState, nombre: text });

    if (text === '') {
      setErrors({ ...errors, nombre: '' });
    } else if (!soloLetras(text)) {
      setErrors({ ...errors, nombre: 'El nombre solo debe contener letras' });
    } else {
      setErrors({ ...errors, nombre: '' });
    }
  };

  const handleApellidoPaternoChange = (text: string) => {
    setFormState({ ...formState, apellidoPaterno: text });

    if (text === '') {
      setErrors({ ...errors, apellidoPaterno: '' });
    } else if (!soloLetras(text)) {
      setErrors({ ...errors, apellidoPaterno: 'El apellido paterno solo debe contener letras' });
    } else {
      setErrors({ ...errors, apellidoPaterno: '' });
    }
  };

  const handleApellidoMaternoChange = (text: string) => {
    setFormState({ ...formState, apellidoMaterno: text });

    if (text === '') {
      setErrors({ ...errors, apellidoMaterno: '' });
    } else if (!soloLetras(text)) {
      setErrors({ ...errors, apellidoMaterno: 'El apellido materno solo debe contener letras' });
    } else {
      setErrors({ ...errors, apellidoMaterno: '' });
    }
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

      {/* Aquí se ajusta el bloque del formulario */}
      <View style={styles.formContainer}>
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Nombre</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={formState.nombre}
              onChangeText={handleNombreChange}
            />
            {formState.nombre ? (
              soloLetras(formState.nombre) ? (
                <Icon name="check" size={20} color="green" style={styles.icon} />
              ) : (
                <Icon name="times" size={20} color="red" style={styles.icon} />
              )
            ) : null}
          </View>
          {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Apellido Paterno</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Apellido Paterno"
              value={formState.apellidoPaterno}
              onChangeText={handleApellidoPaternoChange}
            />
            {formState.apellidoPaterno ? (
              soloLetras(formState.apellidoPaterno) ? (
                <Icon name="check" size={20} color="green" style={styles.icon} />
              ) : (
                <Icon name="times" size={20} color="red" style={styles.icon} />
              )
            ) : null}
          </View>
          {errors.apellidoPaterno ? <Text style={styles.errorText}>{errors.apellidoPaterno}</Text> : null}
        </View>

        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Apellido Materno</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Apellido Materno"
              value={formState.apellidoMaterno}
              onChangeText={handleApellidoMaternoChange}
            />
            {formState.apellidoMaterno ? (
              soloLetras(formState.apellidoMaterno) ? (
                <Icon name="check" size={20} color="green" style={styles.icon} />
              ) : (
                <Icon name="times" size={20} color="red" style={styles.icon} />
              )
            ) : null}
          </View>
          {errors.apellidoMaterno ? <Text style={styles.errorText}>{errors.apellidoMaterno}</Text> : null}
        </View>

        {/* Ajuste del TextArea para el Motivo */}
        <View style={styles.inputWrapper}>
          <Text style={styles.label}>Motivo</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea} // Aplicamos estilos especiales para el textArea
              placeholder="Motivo"
              value={formState.correo}
              multiline={true} // Permite varias líneas de texto
              numberOfLines={4} // Especifica el número de líneas visibles en el TextInput
              onChangeText={text => setFormState({ ...formState, correo: text })}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={registrarCita}
        >
          <Text style={styles.registerButtonText}>Continuar con el Registro</Text>
        </TouchableOpacity>
      </View>

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
    marginLeft: 40, // Mueve solo el formulario hacia la derecha
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
    color: '#9b9b9b'
  },
  icon: {
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginLeft: 10,
  },
  textAreaContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    maxWidth: 250
  },
  textArea: {
    height: 80,
    justifyContent: 'flex-start',
    textAlignVertical: 'top', // Alinea el texto al inicio del área
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
