import React, { useEffect, useRef, useState } from 'react';
import { View, Image, Animated, StyleSheet, ActivityIndicator, Dimensions, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function AnimatedSplashScreen({ onAnimationEnd }) {
  const [circles, setCircles] = useState([]);
  const splashOpacity = useRef(new Animated.Value(1)).current;
  const splashScale = useRef(new Animated.Value(1)).current; // Para la animación de escala

  const generateRandomCircle = () => {
    const { width, height } = Dimensions.get('window');
    return {
      size: Math.floor(Math.random() * 30) + 10, // Tamaño aleatorio entre 10 y 30
      top: `${Math.random() * 50}%`, // Posición vertical aleatoria
      left: `${Math.random() * 100}%`, // Posición horizontal aleatoria para abarcar todo el ancho
      animation: new Animated.Value(0), // Animación inicial
    };
  };

  useEffect(() => {
    const interval = setInterval(() => {
      // Generar un nuevo círculo
      const newCircle = generateRandomCircle();
      setCircles((prevCircles) => [...prevCircles, newCircle]);

      // Animar el nuevo círculo
      Animated.timing(newCircle.animation, {
        toValue: -450,
        duration: 6000,
        useNativeDriver: true,
      }).start(() => {
        // Eliminar el círculo después de la animación
        setCircles((prevCircles) => prevCircles.filter((circle) => circle !== newCircle));
      });
    }, 250); // Generar un nuevo círculo cada 200ms para tener más círculos en pantalla

    // Simular el tiempo de duración del splash screen
    const splashTimeout = setTimeout(() => {
      // Animación de salida con escala y opacidad
      Animated.parallel([
        Animated.timing(splashOpacity, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(splashScale, {
          toValue: 3, // Escalar a 3 veces su tamaño
          duration: 1000,
          useNativeDriver: true,
        })
      ]).start(onAnimationEnd); // Llamar a onAnimationEnd después de la animación de salida
    }, 5000); // El splash dura 6 segundos

    return () => {
      clearInterval(interval);
      clearTimeout(splashTimeout);
    };
  }, [splashOpacity, splashScale, onAnimationEnd]);

  return (
    <Animated.View  testID="pantalla-de-splash"  style={[styles.container, { opacity: splashOpacity, transform: [{ scale: splashScale }] }]}>
      {/* Imagen de fondo */}
      <Image source={require('../../assets/images/fondo.jpeg')} style={styles.backgroundImage} />

      {/* Círculos animados */}
      {circles.map((circle, index) => (
        <Animated.View
          key={index}
          style={[styles.circle, {
            width: circle.size,
            height: circle.size,
            top: circle.top,
            left: circle.left,
            transform: [{ translateY: circle.animation }],
          }]}/>
      ))}

      {/* Imagen de la persona con gradiente superpuesto */}
      <View style={styles.personImageContainer}>
        <Image source={require('../../assets/images/p3.png')} style={styles.personImage} />
        <LinearGradient
          colors={['transparent', '#E5415C']} // Degradado desde transparente a color de fondo
          style={styles.gradient}
          locations={[0.6, 1]}
        />
      </View>

      {/* Spinner para simular carga */}
      <ActivityIndicator size="large" color="#fff" style={styles.spinner} />

      {/* Cubos con animación */}
      <Animated.Image
        source={require('../../assets/images/cubo.png')}
        style={[styles.cube, { transform: [{ translateY: new Animated.Value(0) }] }]}/>
      <Animated.Image
        source={require('../../assets/images/cubo.png')}
        style={[styles.cube2, { transform: [{ translateY: new Animated.Value(0) }] }]}/>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
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
    justifyContent: 'flex-end',
  },
  personImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  gradient: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    bottom: '7%',
  },
  spinner: {
    position: 'absolute',
    bottom: '10%',
  },
  circle: {
    position: 'absolute',
    backgroundColor: '#E5415C',
    borderRadius: 50,
    opacity: 0.8,
  },
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
  cruzRojaText: {
    position: 'absolute',
    bottom: '5%',
    fontSize: 28,
    fontWeight: 'bold',
    color: '#E5415C',
    fontFamily: 'sans-serif-condensed', // Tipografía estilizada
    letterSpacing: 2,
  },
});
