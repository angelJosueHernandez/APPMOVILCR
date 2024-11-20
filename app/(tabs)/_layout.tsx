import React from 'react';
import { useAuth } from '@/Context/authcontext';
import Icon from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Tabs } from 'expo-router';

// Importar ProfileScreen desde la nueva ubicación

// Componente para el botón central con degradado más rojo
export default function TabLayout() {
  const { isAuthenticated } = useAuth(); // Usar el hook para obtener isAuthenticated
  const activeTintColor = '#FF3B3B'; // Rojo más intenso para los íconos activos
  const inactiveTintColor = '#FF5E5E'; // Rojo intermedio para los íconos inactivos
  console.log(isAuthenticated); // Agrega esto para depurar

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
          height: 100, // Altura del tab bar
          ...styles.shadow,
        },
        tabBarShowLabel: false, // Ocultar etiquetas
      }}
    >
  
        <Tabs.Screen
        name="login"
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FF5E5E', '#FF3B3B'] : ['#fff', '#fff']} // Degradado cuando está activo
              style={styles.iconContainer}
            >
              <Icon
                name={isAuthenticated ? "person" : "log-in"} // Cambia el ícono dependiendo si está autenticado
                size={isAuthenticated ? 26 : 35} // Cambia el tamaño del ícono
                color={focused ? '#fff' : activeTintColor}
              />
            </LinearGradient>
          ),
        }}
      />


      {/* Pantalla Citas */}
      <Tabs.Screen
        name="citas"
        options={{
          title: 'Citas',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FF5E5E', '#FF3B3B'] : ['#fff', '#fff']}
              style={styles.iconContainer}
            >
              <FontAwesome name="address-book" size={30} color={focused ? '#fff' : activeTintColor} />
            </LinearGradient>
          ),
        }}
      />

      {/* Pantalla Home (index) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FF5E5E', '#FF3B3B'] : ['#fff', '#fff']}
              style={styles.iconContainer}
            >
              <Icon
                name={focused ? 'home' : 'home'}
                size={30}
                color={focused ? '#fff' : activeTintColor}
              />
            </LinearGradient>
          ),
        }}
      />

      {/* Pantalla Servicios Ambulancia */}
      <Tabs.Screen
        name="servicios"
        options={{
          title: 'Servicios',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FF5E5E', '#FF3B3B'] : ['#fff', '#fff']}
              style={styles.iconContainer}
            >
              <Fontisto name="ambulance" size={22} color={focused ? '#fff' : activeTintColor} />
            </LinearGradient>
          ),
        }}
      />

      {/* Pantalla Donaciones */}
      <Tabs.Screen
        name="donaciones"
        options={{
          title: 'Donaciones',
          tabBarIcon: ({ color, focused }) => (
            <LinearGradient
              colors={focused ? ['#FF5E5E', '#FF3B3B'] : ['#fff', '#fff']}
              style={styles.iconContainer}
            >
              <FontAwesome5 name="donate" size={30} color={focused ? '#fff' : activeTintColor} />
            </LinearGradient>
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
  iconContainer: {
    width: 60,
    height: 65,
    borderRadius: 20, // Redondear el icono
    justifyContent: 'center',
    alignItems: 'center',
  },
  gradientButton: {
    width: 45, // Tamaño del botón central
    height: 45,
    borderRadius: 20, // Redondear el botón central
    justifyContent: 'center',
    alignItems: 'center',
  },
});
