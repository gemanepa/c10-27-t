import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

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
  return (
    <View style={styles.container}>
      <Text variant="titleSmall">- Disponible -</Text>
      <Text variant="displayMedium">200</Text>
      <Text variant="headlineSmall">USD</Text>
    </View>
  );
}
