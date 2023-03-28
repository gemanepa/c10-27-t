import { Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-native-paper';
import AssetExample from '../components/home/AssetExample';
import StorageExample from '../components/home/StorageExample';

const styles = StyleSheet.create({
  card: {
    margin: 12,
  },
  linkBtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  paragraph: {
    margin: 24,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default function HomeScreen({ navigation }) {
  return (
    <>
      <Text style={styles.paragraph}>NoCountry</Text>
      <View style={styles.linkBtnContainer}>
        <Button mode="contained" onPress={() => navigation.navigate('Details')}>
          Go to Details Screen
        </Button>
      </View>

      <Card style={styles.card}>
        <AssetExample />
      </Card>

      <Card style={styles.card}>
        <StorageExample />
      </Card>
    </>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
