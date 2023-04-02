import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AvailableMoney from '../components/home/available-money';
import ExpensesAndIncomesLists from '../components/home/expenses-and-incomes-lists/Tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
});

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <AvailableMoney />
      <ExpensesAndIncomesLists />
    </View>
  );
}
