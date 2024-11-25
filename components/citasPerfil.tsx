import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import { useAuth } from '../Context/authcontext';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Picker } from '@react-native-picker/picker';


type CitaData = {
  ID_Cita: number;
  fecha: string;
  horario: string;
  estado: string;
  tipo_Servicio: string;
  ID_Servicio?: string;
};



const CitasScreen = () => {
  const [citasData, setCitasData] = useState<CitaData[]>([]);
  const [tiposServicios, setTiposServicios] = useState<{ ID_Servicio: string; tipo_Servicio: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editCitaData, setEditCitaData] = useState<Partial<CitaData & { showDatePicker?: boolean; showTimePicker?: boolean }>>({});
  const { correoGuardar } = useAuth(); // Correo del usuario autenticado
  //const [showDatePicker, setShowDatePicker] = useState(false);
  //const [showTimePicker, setShowTimePicker] = useState(false);


  useEffect(() => {
    let isMounted = true; // Para evitar actualizaciones de estado en componentes desmontados
  
    const fetchCitas = async () => {
      if (!correoGuardar) return;
  
      try {
        const response = await fetch(
          `https://api-beta-mocha-59.vercel.app/citasPagina/correo?correo=${correoGuardar}`
        );
        const data = await response.json();
  
        if (Array.isArray(data) && isMounted) {
          setCitasData(data); // Actualiza el estado solo si el componente sigue montado
        } else {
          console.error('Error: La respuesta no es un array', data);
          if (isMounted) setCitasData([]);
        }
      } catch (error) {
        console.error('Error fetching citas:', error);
      }
    };
  
    // Llamar por primera vez
    fetchCitas();
  
    // Configurar el intervalo
    const intervalId = setInterval(() => {
      fetchCitas();
    }, 10000);
  
    // Limpiar el intervalo y evitar actualizaciones si el componente se desmonta
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [correoGuardar]);



  // Fetch citas del usuario autenticado
  useEffect(() => {
    if (correoGuardar) {
      const fetchCitas = async () => {
        try {
          const response = await fetch(
            `https://api-beta-mocha-59.vercel.app/citasPagina/correo?correo=${correoGuardar}`
          );
          const data = await response.json();
          if (Array.isArray(data)) {
            setCitasData(data);
          } else {
            console.error('Error: La respuesta no es un array', data);
            setCitasData([]);
          }
        } catch (error) {
          console.error('Error fetching citas:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchCitas();
    } else {
      console.log('No se encontró el correo del usuario.');
      setIsLoading(false);
    }
  }, [correoGuardar]);

  // Fetch tipos de servicios
  useEffect(() => {
    const fetchTiposServicios = async () => {
      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/servicios-excluidos');
        const data = await response.json();
        if (Array.isArray(data)) {
          setTiposServicios(data);
        } else {
          console.error('Error: La respuesta no es un array', data);
        }
      } catch (error) {
        console.error('Error fetching tipos de servicios:', error);
      }
    };

    fetchTiposServicios();
  }, []);

  const handleEditCita = (cita: CitaData) => {
    setEditCitaData({
      ...cita,
      fecha: moment(cita.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      horario: moment(cita.horario, 'hh:mm A').format('HH:mm'),
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const { fecha, horario, ID_Cita , ID_Servicio  } = editCitaData;

    if (!fecha || !horario || !ID_Cita || !ID_Servicio ) {
      Alert.alert('Error', 'Por favor selecciona una fecha y una hora válidas.');
      return;
    }

    try {
      const horarioFormateado = moment(horario, 'HH:mm').format('HH:mm:ss');
      console.log('Datos enviados:', { fecha, horario: horarioFormateado, ID_Cita, ID_Servicio });
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/actualizarFechaCitas/${ID_Cita}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ fecha, horario: horarioFormateado, ID_Servicio }),
        }
      );

      if (response.ok) {
        setCitasData((prev) =>
          prev.map((cita) =>
            cita.ID_Cita === ID_Cita
              ? {
                  ...cita,
                  fecha: moment(fecha).format('DD/MM/YYYY'),
                  horario: moment(horarioFormateado, 'HH:mm:ss').format('hh:mm A'),
                  tipo_Servicio: tiposServicios.find((servicio) => servicio.ID_Servicio === ID_Servicio)?.tipo_Servicio || '',
                }
              : cita
          )
        );
        setEditModalOpen(false);
        Alert.alert('Éxito', 'La cita fue actualizada correctamente.');
      } else {
        Alert.alert('Error', 'No se pudo actualizar la cita.');
      }
    } catch (error) {
      console.error('Error updating cita:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar la cita.');
    }
  };

  // Cancelar cita
  const handleCancel = async (ID_Cita: number) => {
    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/cancelarCitas/${ID_Cita}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado: 'Cancelado' }),
        }
      );

      if (response.ok) {
        setCitasData((prev) =>
          prev.map((cita) =>
            cita.ID_Cita === ID_Cita ? { ...cita, estado: 'Cancelado' } : cita
          )
        );
        Alert.alert('Cita Cancelada', 'La cita fue cancelada correctamente.');
      } else {
        console.error('Error cancelando cita');
        Alert.alert('Error', 'No se pudo cancelar la cita.');
      }
    } catch (error) {
      console.error('Error cancelando cita:', error);
      Alert.alert('Error', 'Hubo un problema al cancelar la cita.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5415C" />
        <Text>Cargando citas...</Text>
      </View>
    );
  }

  if (citasData.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.noDataText}>No hay datos de citas.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 20 }}>
      <View style={styles.headerContainer}>
        <Image
          source={require('../assets/images/cita.png')} 
          style={styles.headerImage}
        />
        <Text style={styles.header}>Citas</Text>
      </View>
      <FlatList
        data={citasData}
        keyExtractor={(item) => item.ID_Cita.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              item.estado === 'Cancelado' && styles.canceledCard,
            ]}
          >
            <Text style={styles.label}>Fecha:</Text>
            <Text style={styles.value}>{item.fecha}</Text>

            <Text style={styles.label}>Hora:</Text>
            <Text style={styles.value}>{item.horario}</Text>

            <Text style={styles.label}>Estado:</Text>
            <Text style={styles.value}>{item.estado}</Text>

            <Text style={styles.label}>Servicio:</Text>
            <Text style={styles.value}>{item.tipo_Servicio}</Text>

            <View style={styles.buttonContainer}>
              {/* <TouchableOpacity
                style={[styles.button, styles.editButton]}
                onPress={() => handleEditCita(item)}
              >
               <Text style={styles.buttonText}>Editar</Text> 
              </TouchableOpacity>*/}
              <TouchableOpacity
                style={[
                  styles.button,
                  item.estado === 'Cancelado' && styles.disabledButton,
                ]}
                onPress={() => handleCancel(item.ID_Cita)}
                disabled={item.estado === 'Cancelado'}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal visible={isEditModalOpen} transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Editar Cita</Text>

            <Text style={styles.dateTimeLabel}>Fecha:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() =>
                setEditCitaData({ ...editCitaData, showDatePicker: true })
              }
            >
              <Text>
                {editCitaData.fecha
                  ? moment(editCitaData.fecha).format('YYYY-MM-DD')
                  : 'Selecciona una fecha'}
              </Text>
            </TouchableOpacity>
            {editCitaData.showDatePicker && (
              <DateTimePicker
                value={
                  editCitaData.fecha
                    ? new Date(editCitaData.fecha)
                    : new Date()
                }
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setEditCitaData({
                    ...editCitaData,
                    fecha: selectedDate?.toISOString().split('T')[0],
                    showDatePicker: false,
                  });
                }}
              />
            )}
            <Text style={styles.dateTimeLabel}>Hora:</Text>
            <TouchableOpacity
              style={styles.input}
              onPress={() =>
                setEditCitaData({ ...editCitaData, showTimePicker: true })
              }
            >
              <Text>
                {editCitaData.horario
                  ? moment(editCitaData.horario, 'HH:mm:ss').format('HH:mm')
                  : 'Selecciona una hora'}
              </Text>
            </TouchableOpacity>
            {editCitaData.showTimePicker && (
              <DateTimePicker
                value={
                  editCitaData.horario
                    ? moment(editCitaData.horario, 'HH:mm:ss').toDate()
                    : new Date()
                }
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  const formattedTime = moment(selectedTime).format('HH:mm:ss');
                  setEditCitaData({
                    ...editCitaData,
                    horario: formattedTime,
                    showTimePicker: false,
                  });
                }}
              />
            )}


            <Text style={styles.dateTimeLabel}>Tipo de Servicio:</Text>
            <Picker
              selectedValue={editCitaData.ID_Servicio}
              onValueChange={(value) => {
                const selectedService = tiposServicios.find(
                  (servicio) => servicio.ID_Servicio === value
                );
                setEditCitaData({
                  ...editCitaData,
                  ID_Servicio: value,
                  tipo_Servicio: selectedService?.tipo_Servicio || '',
                });
              }}
            >
              <Picker.Item label="Selecciona un servicio" value="" />
              {tiposServicios.map((servicio) => (
                <Picker.Item
                  key={servicio.ID_Servicio}
                  label={servicio.tipo_Servicio}
                  value={servicio.ID_Servicio}
                />
              ))}
            </Picker>


            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton2}
                onPress={() => setEditModalOpen(false)}
              >
                <Text style={styles.buttonText2}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E5415C',
    //marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  
  card: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  
  canceledCard: {
    backgroundColor: '#f0f0f0',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#555',
  },
  value: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: '#2f3e46',
  },
  button: {
    backgroundColor: '#E5415C',
    padding: 10,
    borderRadius: 5,
    marginLeft:250,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
   
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  modalHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#E5415C',
    textAlign: 'center',
  },
  dateTimeLabel: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  cancelButton2: {
    backgroundColor: '#E5415C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
  },
  buttonText2: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CitasScreen;
