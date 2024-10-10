/**
 import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'code-slash' : 'code-slash-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

 */



import { Tabs } from 'expo-router';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

// Componente para el botón central con degradado
function CustomTabBarButton({ onPress, children }) {
  return (
    <TouchableOpacity
      style={{
        top: -20,
        justifyContent: 'center',
        alignItems: 'center',
        ...styles.shadow,
      }}
      onPress={onPress || (() => {})} // Asegurar que onPress tenga un valor por defecto
    >
      <LinearGradient
        colors={['#ff7e5f', '#feb47b']} // Degradado para el botón
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
          left: 1,
          right: 1,
          backgroundColor: '#fff', // Fondo del tab bar
          borderRadius: 5,
          height: 50, // Altura del tab bar
          ...styles.shadow, // Aplicar sombra
        },
        tabBarShowLabel: false, // Ocultar etiquetas
      }}
    >
      {/* Pestaña de Perfil */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'person' : 'person-outline'}
              size={18}
              color={color} // Color dinámico basado en el estado (activo/inactivo)
            />
          ),
        }}
      />

      {/* Pestaña de Grupos */}
      <Tabs.Screen
        name="groups"
        options={{
          title: 'Groups',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'people' : 'people-outline'}
              size={18}
              color={color}
            />
          ),
        }}
      />

      {/* Pestaña de Inicio */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              size={28} // Tamaño del ícono central
              color={focused ? '#fff' : activeTintColor} // Cambiar color cuando está activo
            />
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />, // Botón personalizado con degradado
        }}
      />

      {/* Pestaña de Documentos */}
      <Tabs.Screen
        name="documents"
        options={{
          title: 'Documents',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'document' : 'document-outline'}
              size={18}
              color={color}
            />
          ),
        }}
      />

      {/* Pestaña de Mensajes */}
      <Tabs.Screen
        name="messages"
        options={{
          title: 'Messages',
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'chatbubbles' : 'chatbubbles-outline'}
              size={18}
              color={color}
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
    borderRadius: 30, // Bordes redondeados
    justifyContent: 'center',
    alignItems: 'center',
  },
});