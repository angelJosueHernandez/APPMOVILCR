import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { useAuth } from '@/Context/authcontext';// Importa el hook de autenticación

const ProfileScreen: React.FC = () => {
  const { isAuthenticated, user, correoGuardar } = useAuth(); // Desestructuramos los valores del contexto

  useEffect(() => {
    if (!isAuthenticated) {
      // Si no está autenticado, podrías redirigirlo a la pantalla de login o mostrar un mensaje
      console.log('Usuario no autenticado');
    }
  }, [isAuthenticated]);

  return (
    <View>
      {isAuthenticated ? (
        <Text>Bienvenido, {user}</Text>
      ) : (
        <Text>No estás autenticado</Text>
      )}
      <Text>Correo guardado: {correoGuardar}</Text>
    </View>
  );
};

export default ProfileScreen;
