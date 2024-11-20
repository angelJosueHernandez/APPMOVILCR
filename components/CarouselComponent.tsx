import React, { useRef, useState, useEffect } from 'react';
import { View, FlatList, Image, Dimensions, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { useAuth } from '@/Context/authcontext';

const { width } = Dimensions.get('window');
const images = [
  { id: '1', src: require('../assets/images/co1.jpg') },
  { id: '2', src: require('../assets/images/co3.jpg') }
];
const itemWidth = width - 100;

export default function ImageCarousel() {
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
      ref.current?.scrollToIndex({
        index: nextIndex,
        animated: true
      });
      setCurrentIndex(nextIndex);
    }, 3000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleDonationPress = () => {
    if (isAuthenticated) {
      router.replace('/(tabs)/donaciones');
    } else {
      Alert.alert(
        "Inicio de Sesion",
        "Para acceder Necesita Iniciar Sesion en su Cuenta",
        [{ text: "OK", onPress: () => router.replace('/(tabs)/login') }],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>DONACIONES</Text>
      <FlatList
        ref={ref}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item.src} style={styles.image} />
            <Icon name="favorite" size={24} color="red" style={styles.icon} />
          </View>
        )}
        pagingEnabled
        onScroll={(event) => {
          const slideSize = event.nativeEvent.layoutMeasurement.width;
          const index = event.nativeEvent.contentOffset.x / slideSize;
          setCurrentIndex(Math.round(index));
        }}
        scrollEventThrottle={16}
      />
      <TouchableOpacity style={styles.donateButton} onPress={handleDonationPress}>
        <Text style={styles.donateButtonText}>Ir a Donar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginBottom:-23,
    marginTop:-20,
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 25,
    color: '#E5415C',
  },
  imageContainer: {
    width: itemWidth,
    height: 200,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  icon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  donateButton: {
    marginTop: 20,  // Baja el botón un poco más
    backgroundColor: '#E5415C',
    padding: 10,
    width:'50%',
    marginLeft:280,
    borderRadius: 20,
    alignItems: 'center',
    
  },
  donateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
