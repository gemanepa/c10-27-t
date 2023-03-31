import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
});

function BalanceInput({ value, onChange }) {
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
    <TextInput
      style={styles.input}
      keyboardType="numeric"
      value={inputValue}
      onChangeText={handleInputChange}
    />
  );
}

BalanceInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default BalanceInput;
