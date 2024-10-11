import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Componente para el botón central con degradado más rojo
function CustomTabBarButton({ children, onPress }) {
  return (
    <TouchableOpacity
      style={{
        top: -5, // Elevar el botón central
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#FF3B3B', '#FF5E5E']} // Degradado aún más rojo
        style={styles.gradientButton}
      >
        {children} 
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const activeTintColor = '#FF3B3B'; // Rojo más intenso para los íconos activos
  const inactiveTintColor = '#FF5E5E'; // Rojo intermedio para los íconos inactivos

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor, // Color del ícono activo
        tabBarInactiveTintColor: inactiveTintColor, // Color del ícono inactivo
        headerShown: false, // Ocultar encabezado
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: '#fff', // Fondo del tab bar
          borderRadius: 5,
          height: 60, // Altura del tab bar
          ...styles.shadow,
        },
        tabBarShowLabel: false, // Ocultar etiquetas
      }}
    >
      {/* Pantalla Perfil */}
      <Tabs.Screen
        name="login"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person' : 'person'}
              size={30}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />
      
      {/* Pantalla Citas */}
      <Tabs.Screen
        name="citas"
        options={{
          title: 'citas',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="address-book"
              size={30}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />

      {/* Botón central (Home) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={30}
              color={focused ? '#fff' : activeTintColor} // Color dinámico para Home
            />
          ),
          tabBarButton: (props) => (
            <CustomTabBarButton {...props}>
              <Icon
                name="home"
                size={30}
                color="#fff" // Ícono blanco en el botón central
              />
            </CustomTabBarButton>
          ),
        }}
      />

      {/* Pantalla Servicios Ambulancia */}
      <Tabs.Screen
        name="servicios"
        options={{
          title: 'servicios',
          tabBarIcon: ({ color, focused }) => (
            <Fontisto
              name="ambulance"
              size={30}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />
      
      {/* Pantalla Donaciones */}
      <Tabs.Screen
        name="donaciones"
        options={{
          title: 'donaciones',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name="donate"
              size={30}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />
    </Tabs>
  );
}

// Estilos para sombras y el botón central degradado
const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // Sombra en Android
  },
  gradientButton: {
    width: 45, // Tamaño del botón central
    height: 45,
    borderRadius: 20, // Redondear el botón central
    justifyContent: 'center',
    alignItems: 'center',
  },
});
