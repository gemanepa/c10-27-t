import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: -5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 13,
    backgroundColor: 'white',
    marginRight: 10,
    width: 145,
    fontSize: 14,
    textAlign: 'center',
  },
  currencyContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 13,
    width: 75,
  },
  currencyText: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
    alignSelf: 'center',
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
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedCurrency: PropTypes.string.isRequired,
};

export default BalanceInput;
