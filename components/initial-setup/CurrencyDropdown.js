import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: 225,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 13,
  },
  dropdownText: {
    fontSize: 14,
    fontWeight: 500,
    textAlign: 'center',
    alignSelf: 'center',
  },
  dropdownList: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    zIndex: 1, // Add zIndex property to render above everything else
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  optionText: {
    fontSize: 14,
    fontWeight: 500,
  },
});

function CurrencyDropdown({ options, defaultValue, onSelect }) {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleSelect = (value) => {
    setSelectedValue(value);
    setDropdownVisible(false);
    onSelect(value);
  };

  const renderOption = ({ item }) => (
    <TouchableOpacity style={styles.option} onPress={() => handleSelect(item)}>
      <Text style={styles.optionText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownVisible(!dropdownVisible)}
      >
        <Text style={styles.dropdownText}>{selectedValue}</Text>
      </TouchableOpacity>
      {dropdownVisible && (
        <FlatList
          style={styles.dropdownList}
          data={options}
          renderItem={renderOption}
          keyExtractor={(item) => item}
        />
      )}
    </View>
  );
}

CurrencyDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  defaultValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CurrencyDropdown;
