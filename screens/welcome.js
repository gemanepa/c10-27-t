import { Text, View, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import welcomeIcon from '../assets/initial-setup/intro-image.png';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' },
  paragraph: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    width: 250,
    fontFamily: 'ubuntu-bold',
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FA6C17',
    borderRadius: 10,
    width: 248,
    marginTop: 30,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    letterSpacing: -0.3,
    fontFamily: 'ubuntu-bold',
  },
});

export default function WelcomeScreen({ setShowWelcomeScreen }) {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={welcomeIcon} />
      <Text style={styles.paragraph}>¡Organicemos tus finanzas juntos!</Text>
      <Button mode="contained" onPress={() => setShowWelcomeScreen(false)} style={styles.button}>
        <Text style={styles.buttonText}>¡Empecemos!</Text>
      </Button>
    </View>
  );
}

WelcomeScreen.propTypes = {
  setShowWelcomeScreen: PropTypes.func.isRequired,
};
