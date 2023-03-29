import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 20,
  },
  paragraph: {
    margin: 24,
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function SettingUpScreen({ setInitialSettingUp }) {
  const storeData = async () => {
    try {
      const userCurrency = { currency: 'USD', amount: 1386 };
      await AsyncStorage.setItem('userCurrency', JSON.stringify(userCurrency));
      setInitialSettingUp('success');
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Organicemos tus finanzas juntos</Text>
      <Button mode="contained" onPress={storeData}>
        Store userCurrency
      </Button>
    </View>
  );
}

SettingUpScreen.propTypes = {
  setInitialSettingUp: PropTypes.func.isRequired,
};
