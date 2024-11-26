import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { useAuth } from '../Context/authcontext'; // Ajusta el contexto según tu estructura
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';

type ContratacionData = {
    ID_Contratacion: number;
    motivo: string;
    destino_Traslado: string;
    fecha: string;
    horario: string;
    estado: string;
};

const ContratacionScreen = () => {
  const [contratacionData, setContratacionData] = useState<ContratacionData[]>([]);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editContratacionData, setEditContratacionData] = useState<Partial<ContratacionData>& { showDatePicker?: boolean; showTimePicker?: boolean }>({});
  const [isLoading, setIsLoading] = useState(true);
  const { correoGuardar,idUsuario } = useAuth(); // Obtén el ID del usuario autenticado



  
  useEffect(() => {
    let interval: number | undefined;
  
    if (idUsuario) {
      // Llama a la función inmediatamente
      fetchContratacionData();
  
      // Configura el intervalo para ejecutar fetchContratacionData cada 2 segundos
      interval = setInterval(() => {
        fetchContratacionData();
      }, 2000);
    }
  
    // Limpia el intervalo al desmontar el componente
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [idUsuario]); // Dependencia idUsuario asegura que el intervalo se ajuste según corresponda

  

  useEffect(() => {
    fetchContratacionData();
  }, [idUsuario]);

  const fetchContratacionData = async () => {
    if (idUsuario) {
      try {
        const response = await fetch(
          `https://api-beta-mocha-59.vercel.app/Contratacion/${idUsuario}`
        );
        const data = await response.json();
        setContratacionData(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error fetching contratacion data:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleEditContratacion = (item: ContratacionData) => {
    setEditContratacionData({
      fecha: moment(item.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD'),
      horario: moment(item.horario, 'hh:mm A').format('HH:mm'),
      ID_Contratacion: item.ID_Contratacion,
    });
    setEditModalOpen(true);
  };

  const handleSaveEdit = async () => {
    const { fecha, horario, ID_Contratacion } = editContratacionData;

    if (!fecha || !horario || !ID_Contratacion) {
        Alert.alert('Error', 'Faltan datos para actualizar la contratación.');
        return;
    }
    

    try {
      const horarioFormateado = moment(horario, 'HH:mm').format('HH:mm:ss');
    
      // Logs para depuración
        console.log('Datos enviados:', { fecha, horario: horarioFormateado });
        console.log('ID de contratación:', ID_Contratacion);

      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/actualizarFechaContratacion/${ID_Contratacion}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({ fecha, horario: horarioFormateado }),
          
        }
      );

      const data = await response.json();
      

      if (response.ok) {
        setContratacionData((prev) =>
          prev.map((item) =>
            item.ID_Contratacion === ID_Contratacion
              ? {
                  ...item,
                  fecha: moment(fecha).format('DD/MM/YYYY'),
                  horario: moment(horarioFormateado, 'HH:mm:ss').format(
                    'hh:mm A'
                  ),
                }
              : item
          )
        );
        setEditModalOpen(false);
        Alert.alert('Éxito', 'La contratación ha sido actualizada.');
      } else {
        console.error('Error en la respuesta de la API:', data);
        Alert.alert('Error', 'No se pudo actualizar la contratación.');
      }
    } catch (error) {
      console.error('Error en handleSaveEdit:', error);
      Alert.alert('Error', 'Hubo un problema al actualizar la contratación.');
    }
  };

  const handleCancel = async (ID_Contratacion: number) => {
    try {
      const response = await fetch(
        `https://api-beta-mocha-59.vercel.app/cancelarContratacion/${ID_Contratacion}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ estado: 'Cancelado' }),
        }
      );

      if (response.ok) {
        setContratacionData((prev) =>
          prev.map((item) =>
            item.ID_Contratacion === ID_Contratacion
              ? { ...item, estado: 'Cancelado' }
              : item
          )
        );
        Alert.alert('Éxito', 'La contratación ha sido cancelada.');
      } else {
        Alert.alert('Error', 'No se pudo cancelar la contratación.');
      }
    } catch (error) {
      console.error('Error cancelling contratacion:', error);
      Alert.alert('Error', 'Hubo un problema al cancelar la contratación.');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5415C" />
        <Text>Cargando contrataciones...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        <View style={styles.container}>
        <View style={styles.headerContainer}>
            <Image
            source={require('../assets/images/ambulancia.png')} 
            style={styles.headerImage}
            />
            <Text style={styles.header}>Contratación de Ambulancias</Text>
        </View>
            <FlatList
                data={contratacionData}
                keyExtractor={(item) => item.ID_Contratacion.toString()}
                renderItem={({ item }) => (
                <View style={[styles.card, item.estado === 'Cancelado' && styles.canceledCard]}>
                    <Text style={styles.label}>Motivo:</Text>
                    <Text style={styles.value}>{item.motivo}</Text>

                    <Text style={styles.label}>Destino:</Text>
                    <Text style={styles.value}>{item.destino_Traslado}</Text>

                    <Text style={styles.label}>Fecha:</Text>
                    <Text style={styles.value}>{item.fecha}</Text>

                    <Text style={styles.label}>Horario:</Text>
                    <Text style={styles.value}>{item.horario}</Text>

                    <Text style={styles.label}>Estado:</Text>
                    <Text style={styles.value}>{item.estado}</Text>

                    <View style={styles.buttonContainer}>
                   {/* <TouchableOpacity
                        style={[styles.button, styles.editButton]}
                        onPress={() => handleEditContratacion(item)}
                    >
                        <Text style={styles.buttonText}>Editar</Text>

                    </TouchableOpacity>*/}
                    <TouchableOpacity
                        style={[styles.button, styles.cancelButton]}
                        onPress={() => handleCancel(item.ID_Contratacion)}
                        disabled={item.estado === 'Cancelado'}
                    >
                        <Text style={styles.buttonText}>Cancelar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
                )}
                ListEmptyComponent={
                <Text style={styles.noDataText}>
                    No hay datos de contratación de ambulancias.
                </Text>
                }
            />

            <Modal visible={isEditModalOpen} transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <Text style={styles.modalHeader}>Editar Contratación</Text>

                {/* Selector de Fecha */}
                <Text style={styles.dateTimeLabel}>Fecha:</Text>
                <TouchableOpacity
                    onPress={() => setEditContratacionData({ ...editContratacionData, showDatePicker: true })}
                    style={styles.input}
                >
                    <Text>
                    {editContratacionData.fecha
                        ? moment(editContratacionData.fecha).format('YYYY-MM-DD')
                        : 'Selecciona una fecha'}
                    </Text>
                </TouchableOpacity>
                {editContratacionData.showDatePicker && (
                    <DateTimePicker
                    value={
                        editContratacionData.fecha
                        ? new Date(editContratacionData.fecha)
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        setEditContratacionData({
                        ...editContratacionData,
                        fecha: selectedDate?.toISOString().split('T')[0],
                        showDatePicker: false,
                        });
                    }}
                    />
                )}

                {/* Selector de Hora */}
                <Text style={styles.dateTimeLabel}>Hora:</Text>
                <TouchableOpacity
                    onPress={() => setEditContratacionData({ ...editContratacionData, showTimePicker: true })}
                    style={styles.input}
                >
                    <Text>
                    {editContratacionData.horario
                        ? moment(editContratacionData.horario, 'HH:mm:ss').format('HH:mm')
                        : 'Selecciona una hora'}
                    </Text>
                </TouchableOpacity>
                {editContratacionData.showTimePicker && (
                    <DateTimePicker
                    value={
                        editContratacionData.horario
                        ? moment(editContratacionData.horario, 'HH:mm:ss').toDate()
                        : new Date()
                    }
                    mode="time"
                    display="default"
                    onChange={(event, selectedTime) => {
                        const formattedTime = moment(selectedTime).format('HH:mm:ss');
                        setEditContratacionData({
                        ...editContratacionData,
                        horario: formattedTime,
                        showTimePicker: false,
                        });
                    }}
                    />
                )}

                {/* Botones del Modal */}
                <View style={styles.modalButtons}>
                    <TouchableOpacity
                    style={[styles.button, styles.saveButton]}
                    onPress={handleSaveEdit}
                    >
                    <Text style={styles.buttonText2}>Guardar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={ styles.cancelButton2}
                    onPress={() => setEditModalOpen(false)}
                    >
                    <Text style={styles.buttonText2}>Cancelar</Text>
                    </TouchableOpacity>
                </View>
                </View>
            </View>
            </Modal>

        </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
},
    scrollContent: {
    paddingBottom: 20, // Espacio adicional para el contenido al final
},
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
  button: {
    padding: 10,
    borderRadius: 5,
    marginLeft:245,
  },
  editButton: {
    backgroundColor: '#2f3e46',
  },
  cancelButton: {
    backgroundColor: '#E5415C',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  
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
  noDataText: {
    textAlign: 'center',
    color: '#555',
    marginTop: 20,
  },
  loadingContainer: {
    flex: 1, // Ocupa todo el espacio disponible
    justifyContent: 'center', // Centra el contenido verticalmente
    alignItems: 'center', // Centra el contenido horizontalmente
    backgroundColor: '#fff', // Fondo blanco (opcional)
  },
});

export default ContratacionScreen;
