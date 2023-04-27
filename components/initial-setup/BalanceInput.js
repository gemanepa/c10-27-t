import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: 'white',
    width: 145,
    fontSize: 16,
    textAlign: 'center',
    height: 50,
  },
  currencyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  currencyText: {
    fontSize: 16,
    fontWeight: 400,
  },
});

function BalanceInput({ value, onChange, selectedCurrency }) {
  const [inputValue, setInputValue] = useState(value ? String(value) : '');

  const handleInputChange = (text) => {
    const parsedValue = parseFloat(text);
    // eslint-disable-next-line no-restricted-globals
    if (!isNaN(parsedValue)) {
      setInputValue(text);
      onChange(parsedValue);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={inputValue}
        onChangeText={handleInputChange}
        placeholder="Ej: 100"
      />
      <View style={styles.currencyContainer}>
        <Text style={styles.currencyText}>{selectedCurrency}</Text>
      </View>
    </View>
  );
}

BalanceInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

export default BalanceInput;
