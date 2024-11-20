import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useAuth } from '@/Context/authcontext'; // Importar el contexto de autenticación
import { useStripe } from '@stripe/stripe-react-native';
import { ActivityIndicator } from 'react-native';


export default function DonacionesScreen() {




  const API_URL = 'https://api-beta-mocha-59.vercel.app'

  
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Number(formData.montoDonacion) * 100,
      }),
    });
    const { paymentIntent, ephemeralKey, customer } = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };


  const initializePaymentSheet = async () => {
    const {
      paymentIntent,
      ephemeralKey,
      customer,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      merchantDisplayName: "Cruz Roja",
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
      defaultBillingDetails: {
        name: 'Cruz Roja',
      }
    });
    if (!error) {
      setLoading(true);
    }
  };


  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`Error code: ${error.code}`, error.message);
      setLoading(true);
    } else {
      //Alert.alert('Éxito', '¡Su donación ha sido confirmada!');
      setIsLoading(false);
      await registrarDonacion();
      resetForm(); // Limpia los campos después de un pago exitoso
    }
  };




  const router = useRouter();
  const { isAuthenticated, correoGuardar } = useAuth(); // Obtener el estado de autenticación y el correo guardado

  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    correo: '',
    montoDonacion: '',
  });

  const [errors, setErrors] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    telefono: '',
    correo: '',
    montoDonacion: '',
  });


  const [isLoading, setIsLoading] = useState(false); // Estado de carga


  const registrarDonacion = async () => {
    try {
      const response = await fetch("https://api-beta-mocha-59.vercel.app/registrarDonacion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: correoGuardar, // El correo del usuario autenticado
          monto:  Number(formData.montoDonacion), // El monto de la donación
        }),
      });
  
      if (response.ok) {
        Alert.alert("Donación registrada exitosamente");
        setIsLoading(false);
      } else {
        const errorData = await response.json();
        setIsLoading(false);
       Alert.alert(`Error al registrar la donación: ${errorData.mensaje}`);
      }
    } catch (error) {
      console.error("Error al registrar la donación:", error);
      setIsLoading(false);
     Alert.alert("Error al registrar la donación. Inténtalo más tarde.");
    }
  };

  
  // useEffect para obtener los datos del usuario
  useEffect(() => {
    const fetchData = () => {
      fetch(`https://api-beta-mocha-59.vercel.app/usuario/${correoGuardar}`)
        .then((response) => response.json())
        .then((data) => {
          setFormData((prevFormData) => ({
            ...prevFormData,
            nombre: data.nombre || '',
            apellidoPaterno: data.apellidoP || '',
            apellidoMaterno: data.apellidoM || '',
            correo: correoGuardar,
          }));
        })
        .catch((error) => console.error('Error fetching user data:', error));
    };

    // Llama a la función inmediatamente
    fetchData();

    // Configura el intervalo para actualizar cada 2 segundos
    const intervalId = setInterval(fetchData, 2000);

    // Limpia el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, [correoGuardar]);

  const handleInputChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Limpiar el error correspondiente
  };

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es obligatorio.';
      isValid = false;
    }
    if (!formData.apellidoPaterno.trim()) {
      newErrors.apellidoPaterno = 'El apellido paterno es obligatorio.';
      isValid = false;
    }
    if (!formData.apellidoMaterno.trim()) {
      newErrors.apellidoMaterno = 'El apellido materno es obligatorio.';
      isValid = false;
    }
    if (!formData.telefono.trim() || !/^\d{10}$/.test(formData.telefono)) {
      newErrors.telefono = 'Ingrese un número de teléfono válido de 10 dígitos.';
      isValid = false;
    }
    if (!formData.correo.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.correo)) {
      newErrors.correo = 'Ingrese un correo electrónico válido.';
      isValid = false;
    }
    if (!formData.montoDonacion.trim() || isNaN(Number(formData.montoDonacion)) || Number(formData.montoDonacion) <= 0) {
      newErrors.montoDonacion = 'Ingrese un monto de donación válido.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleContinue = async () => {
    if (!isAuthenticated) {
      Alert.alert('Acción requerida', 'Para realizar una donación, inicie sesión en su cuenta.');
      router.push('/login'); // Redirigir a la pantalla de inicio de sesión
      return;
    }
    setIsLoading(true);
    if (!validateInputs()) {
      setIsLoading(false);
        return; // Validar los campos antes de continuar
    }

    try {
      // Inicializar el pago
      await initializePaymentSheet().then(async ()=>{
        await openPaymentSheet();
        setLoading(true);
      });


    } catch (error) {
      console.error('Error al procesar el pago:', error);
      Alert.alert('Error', 'Hubo un problema al procesar el pago. Inténtalo nuevamente.');
      setIsLoading(false);
    }

  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      telefono: '',
      correo: '',
      montoDonacion: '',
    });
    setErrors({}); // Limpiar errores también
    setIsLoading(false);
  };
  

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <LinearGradient colors={['#E5415C', '#E05C73']} style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerText}>CRUZ ROJA HUEJUTLA</Text>
          <Icon name="notifications" size={20} color="#fff" style={styles.bellIcon} />
        </View>
      </LinearGradient>
      <View style={styles.container}>
        <Text style={styles.subtitle}>Donaciones</Text>
        <Text style={styles.description}>
          Tu generosidad puede salvar vidas. Únete a nuestra misión y ayuda a aquellos que más lo necesitan.
        </Text>
        <Image
          source={require('../../assets/file.png')}
          style={styles.image}
          resizeMode="contain"
        />

        <View style={styles.form}>
        <Text style={styles.description2}>
         Rellene los campos faltantes
        </Text>
          {/* Primera fila */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Nombre</Text>
              <TextInput
                placeholder="Nombre"
                editable={false} // Campo no editable
                style={styles.input}
                value={formData.nombre}
                onChangeText={(text) => handleInputChange('nombre', text)}
              />
              {errors.nombre ? <Text style={styles.errorText}>{errors.nombre}</Text> : null}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Apellido Paterno</Text>
              <TextInput
                placeholder="Apellido paterno" editable={false} // Campo no editable
                style={styles.input}
                value={formData.apellidoPaterno}
                onChangeText={(text) => handleInputChange('apellidoPaterno', text)}
              />
              {errors.apellidoPaterno ? <Text style={styles.errorText}>{errors.apellidoPaterno}</Text> : null}
            </View>
          </View>

          {/* Segunda fila */}
          <View style={styles.row}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Apellido Materno</Text>
              <TextInput
                placeholder="Apellido materno"
                style={styles.input} editable={false} // Campo no editable
                value={formData.apellidoMaterno}
                onChangeText={(text) => handleInputChange('apellidoMaterno', text)}
              />
              {errors.apellidoMaterno ? <Text style={styles.errorText}>{errors.apellidoMaterno}</Text> : null}
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Teléfono</Text>
              <TextInput
                placeholder="Teléfono"
                style={styles.input}
                keyboardType="phone-pad"
                value={formData.telefono}
                onChangeText={(text) => handleInputChange('telefono', text)}
              />
              {errors.telefono ? <Text style={styles.errorText}>{errors.telefono}</Text> : null}
            </View>
          </View>

          {/* Campos individuales */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Correo</Text>
            <TextInput
              placeholder="Correo"
              style={styles.input}
              keyboardType="email-address" editable={false} // Campo no editable
              value={formData.correo}
              onChangeText={(text) => handleInputChange('correo', text)}
            />
            {errors.correo ? <Text style={styles.errorText}>{errors.correo}</Text> : null}
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Monto de la donación en MXN</Text>
            <TextInput
              placeholder="$"
              style={styles.input2}
              keyboardType="numeric"
              value={formData.montoDonacion}
              onChangeText={(text) => handleInputChange('montoDonacion', text)}
            />
            {errors.montoDonacion ? <Text style={styles.errorText}>{errors.montoDonacion}</Text> : null}
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
        {isLoading ? (
                        <ActivityIndicator color="white" /> // Mostrar DotLoading
                      ) : (
                        <Text style={styles.buttonText}>Realizar donacion</Text>
                      )}

        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingBottom: 20,
  },
  container: {
    borderTopLeftRadius: 20, // Ejemplo de radio para la esquina superior izquierda
    borderTopRightRadius: 0, // Ejemplo de radio para la esquina superior derecha
    borderBottomLeftRadius: 20, // Ejemplo de radio para la esquina inferior izquierda
    borderBottomRightRadius: 0, // Ejemplo de radio para la esquina inferior derecha
    flex: 1,
    paddingHorizontal: 15, // Reduce el padding lateral para mejor distribución
    backgroundColor: '#fff',
    paddingBottom: 20,
    marginBottom: 100,
  },
  header: {
    height: 90,
    width: '100%',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    marginBottom: 20,
  },
  headerContent: {
    position: 'absolute',
    top: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 15,
    color: '#fff',
    textAlign: 'center',
    top: 15,
  },
  bellIcon: {
    position: 'absolute',
    right: 35,
    top: 15,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    color: 'gray',
    textAlign: 'center',
    marginBottom: -40,
    marginTop:20,
  },
  description2: {
    fontSize: 15,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:10,
  },
  image: {
    width: '100%',
    height: 300,
    marginBottom: -40,
  },
  form: {
    width: '100%',
    marginTop: -20,
    },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  inputGroup: {
    marginBottom: 10,
    flex: 1, // Los inputs ocuparán espacio igual
    marginHorizontal: 5, // Ajusta el espacio entre inputs en una fila
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#fbfcfc',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#6B6B6B',
  },
  input2: {
    backgroundColor: '#fbfcfc',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    fontSize: 14,
    color: '#6B6B6B',
    width:'30%',
  },
  button: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
