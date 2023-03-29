import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/index';
import DetailsScreen from './screens/details';
import SettingUpScreen from './screens/initial-setup';
import useAsyncStorage from './hooks/useAsyncStorage';

const Stack = createNativeStackNavigator();

function App() {
  const [initialSettingUp, setInitialSettingUp] = useState('initial');
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');

  if (storageLoading) return null;

  if ((!storagedData && initialSettingUp === 'initial') || initialSettingUp === 'reset')
    return <SettingUpScreen setInitialSettingUp={setInitialSettingUp} />;

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{ setInitialSettingUp }}
          />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}

export default App;
