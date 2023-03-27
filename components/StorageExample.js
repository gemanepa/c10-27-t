import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  input: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
});

export default function StorageExample() {
  const [text, setText] = useState('');
  const [storedText, setStoredText] = useState('');

  const storeData = async () => {
    try {
      await AsyncStorage.setItem('myText', text);
      setStoredText(text);
      setText('');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('myText');
      if (value !== null) {
        setStoredText(value);
      }
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Type something to storage in the device..."
        onChangeText={setText}
        value={text}
      />
      <TouchableOpacity style={styles.button} onPress={storeData}>
        <Text style={styles.buttonText}>Save Text</Text>
      </TouchableOpacity>
      <Text style={styles.text}>Stored Text: {storedText}</Text>
    </View>
  );
}
