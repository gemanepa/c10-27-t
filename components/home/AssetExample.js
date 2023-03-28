import { Text, View, StyleSheet, Image } from 'react-native';
import icon from '../../assets/snack-icon.png';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  },
});

export default function AssetExample() {
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>c10-27-t</Text>
      <Image style={styles.logo} source={icon} />
    </View>
  );
}
