import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import AvailableMoney from '../components/home/available-money';
import ExpensesAndIncomesLists from '../components/home/expenses-and-incomes-lists/Tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    position: 'relative',
  },
});

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <AvailableMoney navigation={navigation} />
      <ExpensesAndIncomesLists />
    </View>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
