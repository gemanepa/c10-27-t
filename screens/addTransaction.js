// import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';
import AddRevenue from '../components/AddTransaction/Tables/AddRevenue';
import AddExpense from '../components/AddTransaction/Tables/AddExpense';
import HealthIcon from '../assets/addTransactionIcons/BTN_SaludHealthIcon.png';

const Tab = createMaterialTopTabNavigator();

export default function AddTransaction({ navigation }) {

  useEffect(() => {
    navigation.setOptions({
      title: 'Añadir transacciones',
      // headerTintColor: '#FFFFFF',

    });
  }, [navigation]);

  const listOfAccounts = [
    { id: 1, title: 'Principal' },
    { id: 2, title: 'Opción 2' },
    { id: 3, title: 'Opción 3' },
    { id: 4, title: 'Opción 4' },
    { id: 5, title: 'Opción 5' },
    { id: 6, title: 'Opción 6' },

  ];

  const itemsCategories = [
    { id: 7, title: 'Salud', image: HealthIcon },
    { id: 8, title: 'Higiene', image: HealthIcon },
    { id: 9, title: 'Educacion', image: HealthIcon },
    { id: 10, title: 'Hogar', image: HealthIcon },
    { id: 11, title: 'Transporte', image: HealthIcon },
    { id: 12, title: 'Comida', image: HealthIcon },
    { id: 13, title: 'Ocio', image: HealthIcon },
    // { id: '8', title: 'Elemento 8', image: HealthIcon },
  ];

  return (
    <Tab.Navigator
      tabBarOptions={{
        style: {
          backgroundColor: '#FFFFFF', // establecer el color de fondo
          elevation: 0, // quitar la sombra
          // borderWidth: 0, // quitar el borde
        },
        // labelStyle: {
        //   fontSize: 18, // establecer el tamaño de la letra
        //   color: 'white', // establecer el color de la letra
        // },
      }}
    >
      <Tab.Screen name="Gastos" >
        {() => <AddExpense listOfAccounts={listOfAccounts} itemsCategories={itemsCategories} navigation={navigation} />}
      </Tab.Screen>
      <Tab.Screen name="Ingresos" >
        {() => <AddRevenue listOfAccounts={listOfAccounts} itemsCategories={itemsCategories} navigation={navigation} />}
      </Tab.Screen>
    </Tab.Navigator>
  );

}

AddTransaction.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func
  }).isRequired,
};
