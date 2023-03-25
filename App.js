import { Text, View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Card } from 'react-native-paper';
import Constants from 'expo-constants';
import AssetExample from './components/AssetExample';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>NoCountry</Text>
      <Card>
        <AssetExample />
      </Card>
      <StatusBar style="auto" />
    </View>
  );
}
