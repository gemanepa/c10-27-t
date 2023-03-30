import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import useAsyncStorage from '../../../hooks/useAsyncStorage';

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderBottomLeftRadius: 70,
    borderBottomRightRadius: 70,
  },
});

export default function UpperSection() {
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');

  if (storageLoading) return null;

  const { currency, amount } = storagedData;
  return (
    <View style={styles.container}>
      <Text variant="titleSmall">- Disponible -</Text>
      <Text variant="displayMedium">{amount}</Text>
      <Text variant="headlineSmall">{currency}</Text>
    </View>
  );
}
