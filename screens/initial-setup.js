import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import CurrencyDropdown from '../components/initial-setup/CurrencyDropdown';
import BalanceInput from '../components/initial-setup/BalanceInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 20,
  },
  textContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 24,
    marginTop: 40,
  },
  paragraph: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

const currencyOptions = ['USD', 'ARS', 'EUR', 'GBP', 'BRL', 'CLP', 'COP', 'MXN', 'PEN'];

export default function SettingUpScreen({ setInitialSettingUp }) {
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [selectedBalance, setSelectedBalance] = useState('');

  const handleCurrencySelect = (value) => {
    setSelectedCurrency(value);
  };

  const handleBalanceSelect = (value) => {
    setSelectedBalance(value);
  };

  const storeData = async () => {
    try {
      if (!selectedCurrency || !selectedBalance) return;
      const userCurrency = { currency: selectedCurrency, amount: Number(selectedBalance) };
      await AsyncStorage.setItem('userCurrency', JSON.stringify(userCurrency));
      setInitialSettingUp('success');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.paragraph}>Organicemos tus finanzas juntos</Text>
        <Text style={styles.paragraph}>¡Empecemos!</Text>
      </View>

      <View style={{ height: 70 }}>
        <Text>Indica el tipo de divisa</Text>
        <CurrencyDropdown
          options={currencyOptions}
          defaultValue={selectedCurrency}
          onSelect={handleCurrencySelect}
        />
      </View>

      <View style={{ height: 70 }}>
        {selectedCurrency && (
          <>
            <Text>Introduce el balance de la cuenta principal</Text>
            <BalanceInput value={selectedBalance} onChange={handleBalanceSelect} />
          </>
        )}
      </View>
      <View style={{ height: 70 }}>
        {selectedCurrency && selectedBalance && (
          <Button mode="contained" onPress={storeData}>
            Continuar
          </Button>
        )}
      </View>
    </View>
  );
}

SettingUpScreen.propTypes = {
  setInitialSettingUp: PropTypes.func.isRequired,
};
