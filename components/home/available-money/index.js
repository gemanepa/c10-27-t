import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Text, FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import useAsyncStorage from '../../../hooks/useAsyncStorage';

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    borderRadius: '50%',
    bottom: -10,
  },
  moneySign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function UpperSection({ navigation }) {
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');

  if (storageLoading) return null;

  const { currency, amount } = storagedData;
  return (
    <View style={styles.container}>
      <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: '50%' }}>
        <MaterialIcons name="attach-money" size={24} color="black" />
      </View>
      <Text variant="titleSmall">- Disponible -</Text>
      <Text variant="displayMedium">{amount}</Text>
      <Text variant="headlineSmall">{currency}</Text>
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
}

UpperSection.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
