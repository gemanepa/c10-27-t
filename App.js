import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';
import AssetExample from './components/AssetExample';
import StorageExample from './components/StorageExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
    gap: 20,
  },
  card: {
    margin: 12,
  },
  paragraph: {
    margin: 24,
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>NoCountry</Text>

      <Card style={styles.card}>
        <AssetExample />
      </Card>

      <Card style={styles.card}>
        <StorageExample />
      </Card>

      <StatusBar style="auto" />
    </View>
  );
}
