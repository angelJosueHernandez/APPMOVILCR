import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default function PagoConTarjetaScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Donaciones</Text>
      <Text style={styles.description}>
        Paga con tu tarjeta de crédito o débito, solo ingresa el número de tarjeta.
      </Text>

      {/* Imagen de la tarjeta */}
      <Image
        source={{ uri: 'https://img.icons8.com/ios-filled/100/000000/bank-card-back-side.png' }} // Reemplaza con la URL de tu imagen
        style={styles.cardImage}
      />

      {/* Campo de Número de Tarjeta */}
      <TextInput
        placeholder="Número de Tarjeta"
        style={styles.input}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      {/* Campos de MM/YY y CVC en línea */}
      <View style={styles.inlineFields}>
        <TextInput
          placeholder="MM/YY"
          style={[styles.input, styles.smallInput]}
          keyboardType="numeric"
          value={expiryDate}
          onChangeText={setExpiryDate}
        />
        <TextInput
          placeholder="CVC"
          style={[styles.input, styles.smallInput]}
          keyboardType="numeric"
          value={cvc}
          onChangeText={setCvc}
        />
      </View>

      {/* Botón de Donar */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Donar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 20,
  },
  cardImage: {
    width: 200,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    backgroundColor: '#F9F9F9',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#6B6B6B',
    marginBottom: 15,
    width: '100%',
  },
  inlineFields: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  smallInput: {
    width: '48%',
  },
  button: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
