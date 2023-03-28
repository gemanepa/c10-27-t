import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

export default function DetailsScreen({ navigation }) {
  return (
    <View>
      <Text
        onPress={() => {
          // Go back to the previous screen using the imperative API.
          navigation.goBack();
        }}
      >
        Details Screen
      </Text>
    </View>
  );
}

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
