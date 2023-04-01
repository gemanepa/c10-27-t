import { useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import Header from '../components/initial-setup/Header';
import CurrencyDropdown from '../components/initial-setup/CurrencyDropdown';
import BalanceInput from '../components/initial-setup/BalanceInput';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'white',
    gap: 20,
  },
  inputsContainer: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: '15%',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#DCDCDC',
    borderTopLeftRadius: 90,
    borderTopRightRadius: 90,
  },
  inputWithTextContainer: {
    height: 70,
    width: '100%',
    marginBottom: 45,
    textAlign: 'center', // center the text horizontally
    alignSelf: 'center', // center the text vertically
  },
  text: {
    fontSize: 16,
    fontWeight: 500,
    textAlign: 'center',
    alignSelf: 'center',
    paddingHorizontal: 30,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'gray',
    marginTop: 10,
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
      <Header />

      <View style={styles.inputsContainer}>
        <View>
          <View style={styles.inputWithTextContainer}>
            <Text style={styles.text}>Indica el tipo de divisa</Text>
            <CurrencyDropdown
              options={currencyOptions}
              defaultValue={selectedCurrency}
              onSelect={handleCurrencySelect}
            />
          </View>

          <View style={styles.inputWithTextContainer}>
            {selectedCurrency && (
              <>
                <Text style={styles.text}>Introduce el balance de la cuenta principal</Text>
                <BalanceInput
                  value={selectedBalance}
                  onChange={handleBalanceSelect}
                  selectedCurrency={selectedCurrency}
                />
              </>
            )}
          </View>
        </View>

        <View style={styles.inputWithTextContainer}>
          {selectedCurrency && selectedBalance && (
            <Button style={styles.button} mode="contained" onPress={storeData}>
              Continuar
            </Button>
          )}
        </View>
      </View>
    </View>
  );
}

SettingUpScreen.propTypes = {
  setInitialSettingUp: PropTypes.func.isRequired,
};
