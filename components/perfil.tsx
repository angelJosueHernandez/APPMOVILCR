import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, ActivityIndicator } from 'react-native';
import { useAuth } from '../Context/authcontext';

// Define el tipo para los datos del usuario
type UserData = {
    nombre: string;
    apellidoP: string;
    apellidoM: string;
    correo: string;
    telefono: string;
};

const ProfileScreen = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { correoGuardar,setIdUsuario } = useAuth(); // Obtén el correo del usuario desde el contexto

  useEffect(() => {
    console.log('Valor de correo:', correoGuardar); // Verifica qué valor tiene correoGuardar
    if (correoGuardar) {
      const fetchUserData = async () => {
        try {
          const response = await fetch(
            `https://api-beta-mocha-59.vercel.app/MiPerfil/correo/${correoGuardar}`
          ); // Usa la ruta por correo
          const data = await response.json();
          console.log('Datos del usuario:', data); // Verifica la respuesta de la API
          setUserData(data);
          if (data.ID_Usuario) {
            setIdUsuario(data.ID_Usuario); // Guarda el ID del usuario en el contexto
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchUserData();
    } else {
      console.log('No se encontró un correo autenticado.');
      setIsLoading(false);
    }
  }, [correoGuardar,setIdUsuario]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E5415C" />
        <Text>Cargando información del usuario...</Text>
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.errorContainer}>
        <Text>No se pudo cargar la información del usuario.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.header}>Información Personal</Text>
        <Text style={styles.label}>Nombre:</Text>
        <Text style={styles.value}>
          {userData.nombre} {userData.apellidoP} {userData.apellidoM}
        </Text>

        <Text style={styles.label}>Correo:</Text>
        <Text style={styles.value}>{userData.correo}</Text>

        <Text style={styles.label}>Teléfono:</Text>
        <Text style={styles.value}>{userData.telefono}</Text>
      </View>
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%', // Ocupar todo el ancho disponible
      padding: 20,
      backgroundColor: '#fff',
    },
    card: {
      backgroundColor: '#f9f9f9',
      padding: 20,
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
      width: '100%', // Asegúrate de que la tarjeta ocupe todo el ancho
      alignSelf: 'center',
    },
    header: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#E5415C',
      marginBottom: 10,
    },
    label: {
      fontSize: 14,
      fontWeight: 'bold',
      marginTop: 10,
      color: '#555',
    },
    value: {
      fontSize: 14,
      color: '#333',
      marginBottom: 5,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    errorContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default ProfileScreen;
