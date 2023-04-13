import { useState, useEffect } from 'react';
import { AppState, StyleSheet } from 'react-native';
import { useAppState } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FAB } from 'react-native-paper';
import HomeScreen from './screens/index';
import AddTransaction from './screens/addTransaction';
import AddCategory from './components/Categories/tables/AddCategory';
import CreateCategory from './components/Categories/tables/CreateCategory';
import DetailsScreen from './screens/details';
import SettingUpScreen from './screens/initial-setup';
import ForegroundPinScreen from './screens/foreground-pin';
import useAsyncStorage from './hooks/useAsyncStorage';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#FA6C17',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function App() {
  const [initialSettingUp, setInitialSettingUp] = useState('initial');
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency', initialSettingUp);
  const [pinLoading, pinData] = useAsyncStorage('userPin', initialSettingUp);

  const [activeApp, setActiveApp] = useState(AppState.currentState);
  const appState = useAppState();

  const [userInputPin, setUserInputPin] = useState('');

  useEffect(() => {
    if (appState === 'active' && activeApp !== 'active') {
      // we enter in this conditional when app comes to the foreground
      setActiveApp('active');
    } else if (appState !== activeApp) {
      // we enter in this conditional when app goes to the background
      if (userInputPin !== '') setUserInputPin('');
      if (initialSettingUp !== 'initial') setInitialSettingUp('initial');
      setActiveApp(appState);
    }
  }, [appState]); // eslint-disable-line react-hooks/exhaustive-deps

  if (storageLoading || pinLoading) return null;

  if (
    ((!storagedData || !pinData) && initialSettingUp === 'initial') ||
    initialSettingUp === 'reset'
  )
    return <SettingUpScreen setInitialSettingUp={setInitialSettingUp} />;

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userCurrency');
      await AsyncStorage.removeItem('userTransactions');
      await AsyncStorage.removeItem('userPin');
      setInitialSettingUp('reset');
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
    }
  };

  if (pinData && userInputPin !== pinData && initialSettingUp !== 'success') {
    return <ForegroundPinScreen setUserInputPin={setUserInputPin} />;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="AddTransaction" component={AddTransaction} />
          <Stack.Screen name="AddCategory" component={AddCategory} />
          <Stack.Screen name="CreateCategory" component={CreateCategory} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <FAB color="white" style={styles.fab} small icon="repeat-variant" onPress={removeValue} />
      <StatusBar style="auto" />
    </>
  );
}

export default App;
