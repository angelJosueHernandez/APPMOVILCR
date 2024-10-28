import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function SiguientePantalla() {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [formattedDate, setFormattedDate] = useState(''); 
  const [formattedTime, setFormattedTime] = useState('');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    setFormattedDate(currentDate.toLocaleDateString('es-ES', dateOptions));
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime || date;
    setShowTimePicker(Platform.OS === 'ios');
    setDate(currentTime);

    const timeOptions = { hour: '2-digit', minute: '2-digit' };
    setFormattedTime(currentTime.toLocaleTimeString('es-ES', timeOptions));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Contratación de ambulancias</Text>

      <View style={styles.form}>
        <TextInput placeholder="Material Específico" style={styles.input} />
        <TextInput placeholder="Inicio Traslado" style={styles.input} />
        <TextInput placeholder="Escala" style={styles.input} />
        <TextInput placeholder="Destino Traslado" style={styles.input} />

        {/* Selector de fecha */}
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
          <Text style={formattedDate ? styles.selectedText : styles.placeholderText}>
            {formattedDate || 'Seleccionar Fecha'}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Selector de hora */}
        <TouchableOpacity onPress={() => setShowTimePicker(true)} style={styles.input}>
          <Text style={formattedTime ? styles.selectedText : styles.placeholderText}>
            {formattedTime || 'Seleccionar Hora'}
          </Text>
        </TouchableOpacity>
        {showTimePicker && (
          <DateTimePicker
            value={date}
            mode="time"
            display="default"
            onChange={onChangeTime}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Contratar Ambulancia</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    paddingTop: 60, // Incrementado para bajar más el contenido
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    width: '100%',
    marginBottom: 20,
    color: 'black',
    marginTop: 20, // Añadido para ajustar la distancia del título al borde superior
  },
  form: {
    width: '100%',
    marginBottom: 20,
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
  },
  placeholderText: {
    color: '#9B9B9B',
  },
  selectedText: {
    color: '#000',
  },
  button: {
    backgroundColor: '#FF3D3D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
