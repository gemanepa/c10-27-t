import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function AddRevenue() {
  return (
    <View>
      <Text>AddRevenue</Text>
    </View>
  );
}

AddRevenue.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};