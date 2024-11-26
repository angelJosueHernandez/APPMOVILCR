import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { useAuth } from '../../Context/authcontext';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

interface TipoContratacion {
  ID_Tipo_Contratacion: string; // O `number` si es numérico
  tipo: string;
}

interface Ambulancia {
  AmbulanciaID: string; // O `number` si el ID es numérico
  NumeroAmbulancia: string;
}

export default function ContratacionForm() {



  const { isAuthenticated, correoGuardar, idUsuario } = useAuth();
  const router = useRouter();

  const [nombre, setNombre] = useState('');
  const [apellidoPaterno, setApellidoPaterno] = useState('');
  const [apellidoMaterno, setApellidoMaterno] = useState('');
  const [inicioTraslado, setInicioTraslado] = useState('');
  const [escala, setEscala] = useState('');
  const [destinoTraslado, setDestinoTraslado] = useState('');
  const [motivo, setMotivo] = useState('');
  const [materialEspecifico, setMaterialEspecifico] = useState('');
  const [fecha, setFecha] = useState<Date | null>(null);
  const [horario, setHorario] = useState<Date | null>(null);
  const [fechaError, setFechaError] = useState(''); // Para manejar el error de fecha  
  const [ID_Tipo_Contratacion, setID_Tipo_Contratacion] = useState('');
  const [ambulanciaSeleccionada, setAmbulanciaSeleccionada] = useState('');
  const [ambulanciasDisponibles, setAmbulanciasDisponibles] = useState<Ambulancia[]>([]);

  const [tipoContratacionOptions, setTipoContratacionOptions] = useState<TipoContratacion[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  
  const [noAmbulancias, setNoAmbulancias] = useState(false);


  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api-beta-mocha-59.vercel.app/usuario2/${correoGuardar}`)
        .then((response) => response.json())
        .then((data) => {
          setNombre(data.nombre);
          setApellidoPaterno(data.apellidoP);
          setApellidoMaterno(data.apellidoM);
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
    const fetchTipoContratacion = async () => {
      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/tipoContratacion');
        const data = await response.json();
        setTipoContratacionOptions(data); // Establece los datos en el estado correspondiente
      } catch (error) {
        console.error('Error fetching tipoContratacion:', error);
      }
    };
  
    const fetchAmbulanciasDisponibles = async () => {
      try {
        const response = await fetch('https://api-beta-mocha-59.vercel.app/ambulancias-disponibles');
        const data = await response.json();
  
        if (Array.isArray(data) && data.length > 0) {
          setAmbulanciasDisponibles(data);
          setNoAmbulancias(false);
        } else {
          setAmbulanciasDisponibles([]); // Asegura que sea un arreglo vacío si no hay datos
          setNoAmbulancias(true);
        }
      } catch (error) {
        console.error('Error fetching ambulanciasDisponibles:', error);
        setAmbulanciasDisponibles([]); // Maneja el error estableciendo un arreglo vacío
        setNoAmbulancias(true);
      }
    };
  
    // Llama a ambas funciones al cargar el componente
    fetchTipoContratacion();
    fetchAmbulanciasDisponibles();
  
    // Configura intervalos para actualizaciones periódicas
    const intervalIdAmbulancias = setInterval(fetchAmbulanciasDisponibles, 10000); // Cada 10 segundos
    const intervalIdTipos = setInterval(fetchTipoContratacion, 30000); // Cada 30 segundos (o el tiempo que prefieras)
  
    // Limpia los intervalos al desmontar
    return () => {
      clearInterval(intervalIdAmbulancias);
      clearInterval(intervalIdTipos);
    };
  }, []);
  
  
  

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  
  const formatTime = (time: Date) => {
    const hours = time.getHours().toString().padStart(2, '0');
    const minutes = time.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const validateFields = () => {
    if (
      !nombre.trim() ||
      !apellidoPaterno.trim() ||
      !apellidoMaterno.trim() ||
      !inicioTraslado.trim() ||
      !destinoTraslado.trim() ||
      !motivo.trim() ||
      !ID_Tipo_Contratacion ||
      !ambulanciaSeleccionada
    ) {
      Alert.alert('Error', 'Por favor, complete todos los campos correctamente.');
      return false;
    }

    if (!fecha) {
      setFechaError('Seleccione una fecha válida.');
      return false;
    }
  
    if (!horario) {
      Alert.alert('Error', 'Seleccione un horario válido.');
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {

    if (noAmbulancias) {
      Alert.alert('Error', 'Por el momento no hay ambulancias disponibles.');
      return;
    }

    if (!isAuthenticated) {
      Alert.alert(
        'No autenticado',
        'Debe iniciar sesión para enviar una solicitud.',
        [
          {
            text: 'Ir al login',
            onPress: () =>  router.push('/login'),
            
          },
        ],
      );
      return;
    }

    if (!validateFields()) return;

    setLoading(true);

    const requestBody = {
      nombre,
      apellido_Paterno: apellidoPaterno,
      apellido_Materno: apellidoMaterno,
      inicio_Traslado: inicioTraslado,
      escala,
      destino_Traslado: destinoTraslado,
      motivo,
      material_especifico: materialEspecifico,
      fecha: formatDate(fecha),
      horario: formatTime(horario),
      ID_Usuario: idUsuario,
      ID_Tipo_Contratacion,
      ambulanciaSeleccionada,
      correo: correoGuardar,
    };

    try {
      const response = await fetch(
        'https://api-beta-mocha-59.vercel.app/CrearContratacion',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        },
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.msg || 'Error al registrar la contratación.');
      }

      await fetch('https://api-beta-mocha-59.vercel.app/enviar-correo-contratacion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre,
          apellido_Paterno: apellidoPaterno,
          apellido_Materno: apellidoMaterno,
          correo: idUsuario,
        }),
      });


      setTimeout(() => {
        Alert.alert(
          'Éxito',
          'Solicitud enviada correctamente a revisión. Por favor, revise su correo para llevar el seguimiento del proceso de contratación.',
        );


          // Limpia los campos del formulario
    setInicioTraslado('');
    setEscala('');
    setDestinoTraslado('');
    setMotivo('');
    setMaterialEspecifico('');
    setFecha(null);
    setHorario(null);
    setID_Tipo_Contratacion('');
    setAmbulanciaSeleccionada('');
    
        
      router.replace('/(tabs)') // Redirigir a la pantalla de inicio de sesión
    }, 3000); // Espera 3 segundos antes de ejecutar



    } catch (error) {
      Alert.alert('Error', error.message || 'Ocurrió un problema al procesar su solicitud.');
    } finally {
      setLoading(false);
    }
  };



  const handleDateChange = (event: any, selectedDate: Date | undefined) => {
    setShowDatePicker(false);
    if (selectedDate) {
      // Obtén la fecha actual en la zona horaria de México
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Ajusta a medianoche
      const mexicoTimeZoneOffset = -6; // UTC-6
      const nowInMexico = new Date(today.getTime() + mexicoTimeZoneOffset * 60 * 60 * 1000);
  
      // Calcula la fecha mínima permitida (3 días después de hoy)
      const minDate = new Date(nowInMexico);
      minDate.setDate(minDate.getDate() + 2);
  
      // Limpia la hora de la fecha seleccionada para la comparación
      selectedDate.setHours(0, 0, 0, 0);
  
      // Valida la fecha seleccionada
      if (selectedDate < minDate) {
        setFechaError(`La fecha debe ser  posterior a la fecha actual, con al menos 3 dias de antelacion.`);
        setFecha(null); // Limpia el estado de fecha si es inválida
      } else {
        setFecha(selectedDate); // Establece la fecha seleccionada
        setFechaError(''); // Limpia el mensaje de error
      }
    }
  };
  
    

  

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient colors={['#E5415C', '#E05C73']} style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
            <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
          </View>
        </LinearGradient>
      <View style={styles.container}>
    
      {noAmbulancias ? (
        <>
        
          <Text style={styles.title}>CONTRATACION AMBULANCIAS</Text>
          <Text style={styles.subtitle}>Para solicitar este servicio necesita Iniciar Sesion en su Cuneta</Text>
          <Text style={styles.errorText}>
            Por el momento no hay ambulancias disponibles. Intente más tarde.
          </Text>
  
        </>
    
          
        ) : (
              <>
          <Text style={styles.title}>CONTRATACION AMBULANCIAS</Text>
          <Text style={styles.subtitle}>Para solicitar este servicio necesita Iniciar Sesion en su Cuneta</Text>
  
  
            <View style={styles.row}>
            <TextInput
              style={[styles.input2, styles.halfWidth]}
              placeholder="Nombre"
              value={nombre}
              editable={false} // Deshabilita la edición
            />
            <TextInput
              style={[styles.input2, styles.halfWidth]}
              placeholder="Apellido Paterno"
              value={apellidoPaterno}
              editable={false} // Deshabilita la edición
            />
          </View>
          <TextInput
            style={styles.input3}
            placeholder="Apellido Materno"
            value={apellidoMaterno}
            editable={false} // Deshabilita la edición
          />
  
  
        <Text style={styles.subtitle2}>En caso de la solicitud sea para un evento colocar no aplica</Text>
  
          <TextInput
            style={styles.input}
            placeholder="Inicio del Traslado"
            value={inicioTraslado}
            onChangeText={setInicioTraslado}
          />
          <TextInput
            style={styles.input}
            placeholder="Escala"
            value={escala}
            onChangeText={setEscala}
          />
          <TextInput
            style={styles.input}
            placeholder="Destino del Traslado"
            value={destinoTraslado}
            onChangeText={setDestinoTraslado}
          />
         
  
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Motivo"
            value={motivo}
            onChangeText={setMotivo}
            multiline={true} // Convierte el input en un TextArea
            numberOfLines={4} // Establece la altura inicial del área
          />
  
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Material Específico (Opcional)"
            value={materialEspecifico}
            onChangeText={setMaterialEspecifico}
            multiline={true} // Convierte el input en un TextArea
            numberOfLines={4} // Establece la altura inicial del área
          />
         
         
         <View style={styles.row}>
  
  
          <TouchableOpacity
            style={[styles.input4, styles.halfWidth]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{fecha ? `Fecha: ${formatDate(fecha)}` : 'Seleccione una fecha'}</Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={fecha || new Date()} // Si no hay fecha, usa la fecha actual
              mode="date"
              display="calendar"
              onChange={handleDateChange}
            />
          )}
  
  
  
  
          <TouchableOpacity
          style={[styles.input4, styles.halfWidth]}
          onPress={() => setShowTimePicker(true)}
        >
          <Text>{horario ? `Horario: ${formatTime(horario)}` : 'Seleccione un horario'}</Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={horario || new Date()} // Si no hay horario, usa la fecha actual
            mode="time"
            display="clock"
            onChange={(event, selectedTime) => {
              setShowTimePicker(false);
              if (selectedTime) setHorario(selectedTime);
            }}
          />
        )}
        </View>
  
        {fechaError ? <Text style={styles.errorText2}>{fechaError}</Text> : null}
  
  
          <Picker
            selectedValue={ID_Tipo_Contratacion}
            style={styles.picker}
            onValueChange={setID_Tipo_Contratacion}
          >
            <Picker.Item label="Seleccione un tipo de contratación" value="" />
            {tipoContratacionOptions.map((tipo) => (
              <Picker.Item
                key={tipo.ID_Tipo_Contratacion}
                label={tipo.tipo}
                value={tipo.ID_Tipo_Contratacion}
              />
            ))}
          </Picker>



       <Picker
          selectedValue={ambulanciaSeleccionada}
          style={styles.picker}
          onValueChange={setAmbulanciaSeleccionada}
        >
          <Picker.Item label="Seleccione una ambulancia" value="" />
          {(ambulanciasDisponibles || []).map((ambulancia) => (
            <Picker.Item
              key={ambulancia.AmbulanciaID}
              label={ambulancia.NumeroAmbulancia}
              value={ambulancia.AmbulanciaID}
            />
          ))}
        </Picker>



          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Registrar Contratación</Text>
          </TouchableOpacity>
          </>
      )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 150,
    backgroundColor: '#FFFFFF',
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding:20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FF0000',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 200,
    marginBottom: 20,
    marginLeft:10,
    padding:20,

  },
  errorText2: {
    color: 'red',
    fontSize: 12,
    marginTop:-20,
    marginBottom: 20,
    marginLeft:10,
  },
  textArea: {
    textAlignVertical: 'top', // Asegura que el texto comience en la parte superior del TextArea
    height: 100, // Altura del área de texto
  },
  input2: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    color: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  input3: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    width:'50%',
    color: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  input4: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    height:'75%',
    color: 'gray',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FF0000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
header: { height: 90, width: '100%', borderBottomLeftRadius: 1000, borderBottomRightRadius: 1000, overflow: 'hidden' },
headerContent: { position: 'absolute', top: 30, left: 0, right: 0, alignItems: 'center' },
headerText: { fontSize: 15, color: '#fff', textAlign: 'center', top: 15 },
bellIcon: { position: 'absolute', right: 35, top: 15 },
subtitle: { marginTop: 0, fontSize: 12, color: 'gray', textAlign: 'center', marginBottom:30 },
subtitle2: { marginTop: 0, fontSize: 12, color: 'red', textAlign: 'center', marginBottom:30 },
 // Estilo para el contenedor en fila
 row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 20,
},
// Estilo para inputs de media anchura
halfWidth: {
  flex: 1,
  marginHorizontal: 5, // Espaciado entre los inputs
},
});