import { useState, useEffect } from 'react';
import { AppState, StyleSheet } from 'react-native';
import { useAppState } from '@react-native-community/hooks';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Font from 'expo-font';
import { FAB } from 'react-native-paper';
import HomeScreen from './screens/index';
import AddTransaction from './screens/addTransaction';
import AddCategory from './components/Categories/tables/AddCategory';
import CreateCategory from './components/Categories/tables/CreateCategory';
import DetailsScreen from './screens/details';
import SettingUpScreen from './screens/initial-setup';
import ForegroundPinScreen from './screens/foreground-pin';
import WelcomeScreen from './screens/welcome';
import StatisticsScreen from './screens/statistics';
import useAsyncStorage from './hooks/useAsyncStorage';
import { MockedDataProvider } from './hooks/useMockedData';

const Stack = createNativeStackNavigator();

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 10,
    bottom: 5,
    backgroundColor: '#FA6C17',
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.75,
  },
});

function App() {
  const [showWelcomeScreen, setShowWelcomeScreen] = useState(true);
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

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'ubuntu-bold': require('./assets/fonts/Ubuntu-Bold.ttf'),
        'ubuntu-boldItalic': require('./assets/fonts/Ubuntu-BoldItalic.ttf'),
        'ubuntu-italic': require('./assets/fonts/Ubuntu-Italic.ttf'),
        'ubuntu-light': require('./assets/fonts/Ubuntu-Light.ttf'),
        'ubuntu-lightItalic': require('./assets/fonts/Ubuntu-LightItalic.ttf'),
        'ubuntu-medium': require('./assets/fonts/Ubuntu-Medium.ttf'),
        'ubuntu-mediumItalic': require('./assets/fonts/Ubuntu-MediumItalic.ttf'),
        'ubuntu-regular': require('./assets/fonts/Ubuntu-Regular.ttf'),
      });
    }
    loadFonts();
  }, []);

  if (storageLoading || pinLoading) return null;

  if (
    ((!storagedData || !pinData) && initialSettingUp === 'initial') ||
    initialSettingUp === 'reset'
  )
    return showWelcomeScreen ? (
      <WelcomeScreen setShowWelcomeScreen={setShowWelcomeScreen} />
    ) : (
      <SettingUpScreen setInitialSettingUp={setInitialSettingUp} />
    );

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem('userCurrency');
      await AsyncStorage.removeItem('userTransactions');
      await AsyncStorage.removeItem('userPin');
      setShowWelcomeScreen(true);
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
      <MockedDataProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="AddTransaction" component={AddTransaction} />
            <Stack.Screen name="AddCategory" component={AddCategory} />
            <Stack.Screen name="CreateCategory" component={CreateCategory} />
            <Stack.Screen name="Details" component={DetailsScreen} />
            <Stack.Screen
              name="Statistics"
              component={StatisticsScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </MockedDataProvider>
      <FAB color="white" style={styles.fab} small icon="repeat-variant" onPress={removeValue} />
      <StatusBar style="auto" />
    </>
  );
}

export default App;
