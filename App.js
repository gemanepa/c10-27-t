import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper';
import HomeScreen from './screens/index';
import AddTransaction from './screens/addTransaction';
import DetailsScreen from './screens/details';
import SettingUpScreen from './screens/initial-setup';
import useAsyncStorage from './hooks/useAsyncStorage';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

function App() {
  const [initialSettingUp, setInitialSettingUp] = useState('initial');
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');

  if (storageLoading) return null;

  if ((!storagedData && initialSettingUp === 'initial') || initialSettingUp === 'reset')
    return <SettingUpScreen setInitialSettingUp={setInitialSettingUp} />;

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userCurrency');
      setInitialSettingUp('reset');
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  };
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddTransaction" component={AddTransaction} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <FAB style={styles.fab} small icon="repeat-variant" onPress={removeValue} />
      <StatusBar style="auto" />
    </>
  );
}

export default App;
