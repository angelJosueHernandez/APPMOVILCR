import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnimatedSplashScreen({ onAnimationEnd }) {
  // Creamos referencias de animación para 7 círculos
  const circleAnims = useRef(Array.from({ length: 12 }, () => new Animated.Value(0))).current;
  const cubeAnim1 = useRef(new Animated.Value(0)).current; // Animación para el cubo 1
  const cubeAnim2 = useRef(new Animated.Value(0)).current; // Animación para el cubo 2

  useEffect(() => {
    // Animaciones para los círculos
    const animateCircle = (circleAnim, delay) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(circleAnim, {
            toValue: -450, // Mover hacia arriba
            duration: 4000, // Duración de la animación
            delay: delay, // Retraso personalizado
            useNativeDriver: true,
          }),
          Animated.timing(circleAnim, {
            toValue: 0, // Volver a la posición original
            duration: 0, // Sin animación para el reinicio
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // Ejecutar animaciones para los círculos
    circleAnims.forEach((circleAnim, index) => animateCircle(circleAnim, index * 1500));

    // Animación para los cubos (rebote)
    const animateCube = (cubeAnim) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(cubeAnim, {
            toValue: 15, // Mover hacia arriba
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(cubeAnim, {
            toValue: 0, // Volver a la posición original
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    // Ejecutar animaciones de rebote para los cubos
    animateCube(cubeAnim1);
    animateCube(cubeAnim2);

    // Simular el tiempo de duración del splash screen personalizado
    setTimeout(onAnimationEnd, 5000); // Llama a onAnimationEnd para ocultar el splash después de 6 segundos
  }, [circleAnims, cubeAnim1, cubeAnim2, onAnimationEnd]);

  // Datos de tamaño y posición para cada círculo (7 círculos)
  const circlesData = [
    { size: 50, top: '45%', left: '5%' },
    { size: 55, top: '50%', left: '30%' },
    { size: 60, top: '55%', left: '45%' },
    { size: 40, top: '60%', left: '60%' },
    { size: 45, top: '65%', left: '75%' },
    { size: 50, top: '70%', left: '55%' },
    { size: 35, top: '32%', left: '35%' },
    { size: 35, top: '82%', left: '25%' },
    { size: 35, top: '72%', left: '65%' },
    { size: 35, top: '32%', left: '15%' },
    { size: 35, top: '22%', left: '45%' },
    { size: 35, top: '2%', left: '85%' },
  ];

  return (
    <View style={styles.container}>
      {/* Imagen de fondo */}
      <Image source={require('../../assets/images/fondo.jpeg')} style={styles.backgroundImage} />

      {/* Círculos animados */}
      {circleAnims.map((circleAnim, index) => {
        // Crear una animación de opacidad que solo comience a desaparecer al final
        const opacity = circleAnim.interpolate({
          inputRange: [-450, -450, 0], // Desaparece al final del movimiento
          outputRange: [0.7, 1, 1], // Comienza visible y desaparece al final
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.circle,
              {
                width: circlesData[index]?.size, // Asegurarnos de que existe
                height: circlesData[index]?.size, // Asegurarnos de que existe
                top: circlesData[index]?.top, // Asegurarnos de que existe
                left: circlesData[index]?.left, // Asegurarnos de que existe
                transform: [{ translateY: circleAnim }],
                opacity, // Control de opacidad con interpolación
              },
            ]}
          />
        );
      })}

      {/* Imagen de la persona con gradiente superpuesto */}
      <View style={styles.personImageContainer}>
        <Image
          source={require('../../assets/images/p3.png')}
          style={styles.personImage}
        />
        {/* Degradado lineal para fusionar la imagen con el fondo */}
        <LinearGradient
          colors={['transparent', '#E5415C']}  // Degradado desde transparente a color de fondo
          style={styles.gradient}
          locations={[0.6, 1]}
        />
      </View>

      {/* Spinner para simular carga */}
      <ActivityIndicator size="large" color="#fff" style={styles.spinner} />

      {/* Cubos con animación */}
      <Animated.Image
        source={require('../../assets/images/cubo.png')}
        style={[styles.cube, { transform: [{ translateY: cubeAnim1 }] }] }
      />
      <Animated.Image
        source={require('../../assets/images/cubo.png')}
        style={[styles.cube2, { transform: [{ translateY: cubeAnim2 }] }] }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative', // Color de fondo (igual al fondo de la imagen)
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '110%',
    resizeMode: 'cover',
  },
  personImageContainer: {
    position: 'absolute',
    top: '6%',
    width: 550,
    height: 600,
    justifyContent: 'flex-end',  // Para alinear la imagen y el degradado correctamente
  },
  personImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',  // Ajustar para degradar la parte inferior de la imagen
    bottom: '7%',
  },
  spinner: {
    position: 'absolute',
    bottom: '10%',
  },

  // Estilos para los círculos
  circle: {
    position: 'absolute',
    backgroundColor: '#E5415C',
    borderRadius: 50,
    opacity: 0.8,
  },

  // Estilos para los cubos con animación
  cube: {
    position: 'absolute',
    width: 70,
    height: 70,
    bottom: 50,
    right: 30,
    resizeMode: 'contain',
  },
  cube2: {
    position: 'absolute',
    width: 70,
    height: 70,
    bottom: 250,
    right: 320,
    left: -20,
    resizeMode: 'contain',
  },
});
