import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Picker } from '@react-native-picker/picker';
import moment from 'moment';
import 'moment/locale/es';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/Context/authcontext';
import { useRouter } from 'expo-router';
import { err } from 'react-native-svg';
import { ActivityIndicator } from 'react-native';



LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
  ],
  monthNamesShort: ['Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.', 'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'],
  dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
  dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
  today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

export default function RegistroCitas() {


  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const router = useRouter();
  const { correoGuardar, isAuthenticated } = useAuth();

  const [formState, setFormState] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    correo: '',
  });

  const [selectedDate, setSelectedDate] = useState<string>('');
  const [availableHorarios, setAvailableHorarios] = useState([]);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const [servicios, setServicios] = useState([]);
const [selectedServicio, setSelectedServicio] = useState<string>('');

  const [indicacionesPrevias, setIndicacionesPrevias] = useState<string>('');

  const [errors, setErrors] = useState({
    fecha: '',
    horario: '',
    servicio: '',
  });

  // Estados para feedback
  const [isFeedbackModalVisible, setIsFeedbackModalVisible] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState(0);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);

  const hoy = moment().format('YYYY-MM-DD');

  
  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api-beta-mocha-59.vercel.app/usuario2/${correoGuardar}`)
        .then((response) => response.json())
        .then((data) => {
          setFormState({
            nombre: data.nombre,
            apellidoPaterno: data.apellidoP,
            apellidoMaterno: data.apellidoM,
            correo: correoGuardar,
          });
        })
        .catch((error) => console.error('Error fetching user data:', error));
    };
  
    // Llama a la función inmediatamente
    fetchData();
  
    // Configura el intervalo
    const intervalId = setInterval(fetchData, 2000);
  
    // Limpia el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, [correoGuardar]);
  

  useEffect(() => {
    // Fetch available services
    const fetchServicios = async () => {
      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/servicios-excluidos');
        if (!response.ok) throw new Error('Error al obtener los datos');
        const data = await response.json();
        setServicios(data);
        setSelectedServicio(data[0]?.tipo_Servicio || '');
        setIndicacionesPrevias(data[0]?.indicaciones_previas || '');
      } catch (error) {
        console.error('Error fetching services data:', error);
      }
    };
    fetchServicios();
  }, []);

  useEffect(() => {
    // Fetch available hours when date is selected
    if (selectedDate) {
      const fetchAvailableHorarios = async () => {
        try {
          const response = await fetch(
            `https://api-beta-mocha-59.vercel.app/horas-disponibles/${selectedDate}`
          );
          if (!response.ok) throw new Error('Error al obtener los horarios disponibles');
          const data = await response.json();
          setAvailableHorarios(data);
          setSelectedHorario(null);
          setIsFormDisabled(data.length === 0);
        } catch (error) {
         // console.error('Error fetching available hours:', error);
          setIsFormDisabled(true);
        }
      };
      fetchAvailableHorarios();
    }
  }, [selectedDate]);

  useEffect(() => {
    // Update available hours every 15 seconds
    const fetchAvailableHorarios = async () => {
      try {
        const response = await fetch(
          `https://api-beta-mocha-59.vercel.app/horas-disponibles/${selectedDate}`
        );
        if (!response.ok) throw new Error('Error al obtener los horarios disponibles');
        const data = await response.json();
        setAvailableHorarios(data);
        setSelectedHorario(null);
        setIsFormDisabled(data.length === 0);
      } catch (error) {
        //console.error('Error fetching available hours:', error);
        setIsFormDisabled(true);
      }
    };
    fetchAvailableHorarios();
    const intervalId = setInterval(fetchAvailableHorarios, 15000);
    return () => clearInterval(intervalId);
  }, [selectedDate]);


  const validarCampos = (): boolean => {
    const newErrors = {
      fecha: '',
      horario: '',
      servicio: '',
    };
    let isValid = true;
  console.log(newErrors.servicio)
    if (!selectedDate) {
      newErrors.fecha = 'Seleccione una fecha.';
      setIsLoading(false);
      isValid = false;
    }

    if (!selectedHorario) {
      newErrors.horario = 'Seleccione un horario.';
      setIsLoading(false);
      isValid = false;
    }



    if (!selectedServicio || selectedServicio === null) {
      newErrors.servicio = 'Seleccione un servicio.';
      setIsLoading(false);
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const registrarCita = async () => {

   

    if (!isAuthenticated) {
      Alert.alert('Warning', 'Para solicitar este servicio inicie sesión en su cuenta');
      router.push('/login');
      return;
    }

    setIsLoading(true);

    if (validarCampos()) {
      const citaData = {
        nombre: formState.nombre,
        apellido_Paterno: formState.apellidoPaterno,
        apellido_Materno: formState.apellidoMaterno,
        fecha: selectedDate,
        horario: selectedHorario,
        ID_Servicio: selectedServicio,
        correo: formState.correo,
      };

      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/crearCita', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(citaData),
        });

        if (response.ok) {
          setTimeout(() => {
            Alert.alert('Éxito', 'Cita registrada exitosamente');
            setIsLoading(false);
            setSelectedServicio('');
            setSelectedDate('');
            setSelectedHorario('');

        }, 3000); // Espera 3 segundos antes de ejecutar
        setTimeout(() => {
          showFeedbackModal(); // Mostrar el modal de feedback
          
      }, 6000); // Espera 3 segundos antes de ejecutar
        
        } else {
          const errorData = await response.json();
          setIsLoading(false);
          console.log(errorData);
          Alert.alert('Error', `Error: ${errorData.msg}`);
        }
      } catch (error) {
        console.error('Error al registrar la cita:', error);
        setIsLoading(false);
        Alert.alert('Error', 'Error al registrar la cita. Inténtelo más tarde.');
      }
    }
  };

  const showFeedbackModal = () => {
    setIsFeedbackModalVisible(true);
  };

  const handleFeedbackSubmit = async () => {
    setIsSubmittingFeedback(true);
    try {
      const feedbackData = {
        correo: formState.correo,
        rating: feedbackRating,
      };

      const response = await fetch('https://api-beta-mocha-59.vercel.app/registrarFeedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        Alert.alert('Gracias', '¡Gracias por tu calificación!');
        setIsFeedbackModalVisible(false);
        setFeedbackRating(0);
      } else {
        const errorData = await response.json();
        Alert.alert('Error', `Error: ${errorData.mensaje}`);
      }
    } catch (error) {
      console.error('Error al enviar el feedback:', error);
      Alert.alert('Error', 'Error al enviar el feedback. Inténtalo más tarde.');
    } finally {
      setIsSubmittingFeedback(false);
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={{ backgroundColor: '#fff', marginBottom: 100 }}>
        <LinearGradient colors={['#E5415C', '#E05C73']} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
            <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
          </View>
        </LinearGradient>
        <View style={styles.container}>
          <Text style={styles.title}>CITAS</Text>
          <Text style={styles.subtitle}>Para solicitar una cita Inicie Sesion en su Cuenta</Text>
          <View style={styles.row}>
            <View style={styles.column}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput style={styles.input} value={formState.nombre} editable={false} />
            </View>
            <View style={styles.column}>
              <Text style={styles.label}>Apellido Paterno</Text>
              <TextInput style={styles.input} value={formState.apellidoPaterno} editable={false} />
            </View>
          </View>
          <Text style={styles.label}>Apellido Materno</Text>
          <TextInput style={styles.input} value={formState.apellidoMaterno} editable={false} />
          <Text style={styles.label}>Correo</Text>
          <TextInput style={styles.input} value={formState.correo} editable={false} />
          <Text style={styles.label}>Seleccione una Fecha</Text>
          <Calendar
            style={styles.calendar}
            onDayPress={(day) => {
              const date = moment(day.dateString);
              if (date.isBefore(moment()) || date.isoWeekday() >= 6) {
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  fecha: 'Seleccione una fecha válida.',
                }));
                setSelectedDate('');
              } else {
                setSelectedDate(day.dateString);
                setErrors((prevErrors) => ({ ...prevErrors, fecha: '' }));
              }
            }}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: 'red' },
            }}
          />
          {errors.fecha ? <Text style={styles.errorText2}>{errors.fecha}</Text> : null}
          <Text style={styles.label}>Horarios disponibles</Text>
          <Picker
          style={{backgroundColor:'#fef6f5',}}
            selectedValue={selectedHorario}
            onValueChange={(value) => setSelectedHorario(value)}
            enabled={!isFormDisabled}
          >
            <Picker.Item label="Seleccione un horario" value="" />
            {availableHorarios.map((horario, index) => (
              <Picker.Item key={index} label={horario.time} value={horario.time} />
            ))}
          </Picker>
          {errors.horario ? <Text style={styles.errorText}>{errors.horario}</Text> : null}
          <Text style={styles.label}>Servicios</Text>
          <Picker
            selectedValue={selectedServicio}
            style={{backgroundColor:'#fef6f5',}}
            onValueChange={(value) => {
              setSelectedServicio(value);
              const servicioSeleccionado = servicios.find(
                (servicio) => servicio.ID_Servicio === value
              );
              setIndicacionesPrevias(servicioSeleccionado?.indicaciones_previas || '');
            }}
          >
             <Picker.Item label="Seleccione un servicio" value='' />
            {servicios.map((servicio) => (
              <Picker.Item key={servicio.ID_Servicio} label={servicio.tipo_Servicio} value={servicio.ID_Servicio} />
            ))}
          </Picker>

          {errors.servicio ? <Text style={styles.errorText}>{errors.servicio}</Text> : null}

          <Text style={styles.label2}>Indicaciones Previas</Text>
          <TextInput
            style={styles.textArea}
            value={indicacionesPrevias}
            editable={false}
            multiline={true}
            numberOfLines={4}
          />
          <TouchableOpacity style={styles.registrarButton} onPress={registrarCita}>
          {isLoading ? (
                        <ActivityIndicator color="white" /> // Mostrar DotLoading
                      ) : (
                        <Text style={styles.registrarButtonText}>Registrar Cita</Text>
                      )}
            
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Modal de feedback */}
      <Modal visible={isFeedbackModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Califica tu experiencia</Text>
            <View style={styles.feedbackOptions}>
              {[1, 2, 3, 4, 5].map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.feedbackButton,
                    feedbackRating === rating && styles.feedbackButtonSelected,
                  ]}
                  onPress={() => setFeedbackRating(rating)}
                  disabled={isSubmittingFeedback}
                >
                  <Text style={styles.feedbackButtonText}>{rating}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.submitFeedbackButton}
              onPress={handleFeedbackSubmit}
              disabled={isSubmittingFeedback}
            >
              <Text style={styles.submitFeedbackButtonText}>
                {isSubmittingFeedback ? 'Enviando...' : 'Enviar'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'red', marginBottom: 20 },
  subtitle: { marginTop: -5, fontSize: 12, color: 'gray', textAlign: 'center', marginBottom:30 },
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  column: { flex: 1, marginHorizontal: 5 },
  label: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#333' },
  label2: { fontSize: 14, fontWeight: 'bold', marginBottom: 10, color: '#333', marginTop: 10,},
  input: { height: 50, color:'black', borderColor: '#ccc', borderWidth: 1, borderRadius: 10, paddingLeft: 10, fontSize: 14, marginBottom: 10 },
  calendar: { marginBottom: 40, borderRadius: 10, borderColor: '#ccc', borderWidth: 1, padding: 10 },
  textArea: { borderColor: '#ccc', color:'black', borderWidth: 1, borderRadius: 10, padding: 10, fontSize: 14, textAlignVertical: 'top', marginBottom: 10 },
  registrarButton: { backgroundColor: 'red', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  registrarButtonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  errorText: { color: 'red', fontSize: 12, marginTop: 5 },
  errorText2: { color: 'red', fontSize: 12, marginTop: -20, marginBottom:20, },
  header: { height: 90, width: '100%', borderBottomLeftRadius: 1000, borderBottomRightRadius: 1000, overflow: 'hidden' },
  headerContent: { position: 'absolute', top: 30, left: 0, right: 0, alignItems: 'center' },
  headerText: { fontSize: 15, color: '#fff', textAlign: 'center', top: 15 },
  bellIcon: { position: 'absolute', right: 35, top: 15 },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' },
  modalContent: { width: 300, padding: 20, backgroundColor: '#fff', borderRadius: 10, alignItems: 'center' },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center', fontWeight: 'bold', color: '#333' },
  feedbackOptions: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20,  },
  feedbackButton: {margin:5, width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 20, backgroundColor: '#f0f0f0' , },
  feedbackButtonSelected: { backgroundColor: 'red',  },
  feedbackButtonText: { color: '#333', fontWeight: 'bold',  },
  submitFeedbackButton: { backgroundColor: 'red', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10 },
  submitFeedbackButtonText: { color: '#fff', fontWeight: 'bold' },
});
