import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

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
          left: 1,
          right: 1,
          backgroundColor: '#fff', // Fondo del tab bar
          borderRadius: 5,
          height: 50, // Altura del tab bar
        },
        tabBarShowLabel: false, // Ocultar etiquetas
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={18}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'enter' : 'enter-outline'}
              size={18}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />

      <Tabs.Screen
        name="servicios"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'car' : 'car-outline'}
              size={30}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />

      <Tabs.Screen
        name="citas"
        options={{
          title: 'Citas',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person-add' : 'person-add-outline'} // Cambié a un icono válido
              size={30}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />
    </Tabs>
  );
}
