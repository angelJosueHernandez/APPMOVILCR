import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Componente para el botón central con degradado
function CustomTabBarButton({ onPress, children }) {
  return (
    <TouchableOpacity
      style={{
        top: -20, // Elevar el botón central
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress}
    >
      <LinearGradient
        colors={['#ff7e5f', '#feb47b']} // Degradado del botón central
        style={styles.gradientButton}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
}

export default function TabLayout() {
  const activeTintColor = '#ff7e5f';
  const inactiveTintColor = '#c0c0c0';
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeTintColor,
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false, // Ocultar encabezado
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          left: 10,
          right: 10,
          backgroundColor: '#fff', // Fondo del tab bar
          borderRadius: 20,
          height: 60, // Altura del tab bar
          ...styles.shadow,
        },
        tabBarShowLabel: false, // Ocultar etiquetas
      }}
    >
      {/*Pantalla Principal*/}
      <Tabs.Screen
        name="login"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />
      
      {/*Pantalla Citas*/}
      <Tabs.Screen
        name="citas"
        options={{
          title: 'citas',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name={focused ? 'address-book' : 'address-book'}
              size={24}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />

      {/*Botón central (Home)*/}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={30}
              color={focused ? '#fff' : activeTintColor} // Color dinámico basado en el estado
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />, // Botón personalizado con degradado
        }}
      />

      {/*Pantalla Servicios Ambulancia*/}
      <Tabs.Screen
        name="servicios"
        options={{
          title: 'servicios',
          tabBarIcon: ({ color, focused }) => (
            <Fontisto
              name={focused ? 'ambulance' : 'ambulance'}
              size={24}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />
      
      {/*Pantalla Donaciones*/}
      <Tabs.Screen
        name="donaciones"
        options={{
          title: 'donaciones',
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome5
              name={focused ? 'donate' : 'donate'}
              size={24}
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
    width: 60, // Tamaño del botón central
    height: 60,
    borderRadius: 30, // Redondear el botón central
    justifyContent: 'center',
    alignItems: 'center',
  },
});
