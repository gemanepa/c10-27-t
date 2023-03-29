import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function AddExpense() {
  return (
    <View>
      <Text>AddExpense</Text>
    </View>
  );
}

AddExpense.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};