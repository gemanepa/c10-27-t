import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import AddRevenue from '../components/AddTransaction/AddRevenue';
import AddExpense from '../components/AddTransaction/AddExpense';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useEffect } from 'react';

const Tab = createMaterialTopTabNavigator();

export default function AddTransaction({ navigation }) {

  useEffect(() => {
    navigation.setOptions({ title: 'Añadir transacciones' });
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
