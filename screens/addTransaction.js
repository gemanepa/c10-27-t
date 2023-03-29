import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import AddRevenue from '../components/AddSection/AddRevenue';
import AddExpense from '../components/AddSection/AddExpense';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function AddTransaction({ navigation }) {

  useEffect(() => {
    navigation.setOptions({ title: 'Agregar transacción' });
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen name="Gastos" component={AddExpense} />
      <Tab.Screen name="Ingresos" component={AddRevenue} />
    </Tab.Navigator>
  );

}

AddTransaction.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
