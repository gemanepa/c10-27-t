import { Text, StyleSheet, Image } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import welcomeIcon from '../assets/initial-setup/intro-image.png';
import LayerBackground from '../components/generalComponents/layerBackground';

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' },
  paragraph: {
    fontSize: 30,
    textAlign: 'center',
    color: '#fff',
    width: 250,
    fontFamily: 'ubuntu-bold',
    position: 'relative',
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
    <LayerBackground
      params={{
        linearGradient: {
          style: styles.container,
          colors: ['#03B263', '#01B496'],
          start: [1, 0],
          end: [1, 1],
          locations: [0.1, 0.5],
        },
        mesh: {
          vector: 1,
          width: '100%',
          height: '100%',
          style: {
            position: 'absolute',
            top: 0,
            opacity: 0.4,
          },
        },
        layer: {
          vector: 0,
          style: {
            position: 'absolute',
            bottom: '-20%',
            opacity: 0.3,
          },
        },
      }}
    >
      <Image style={styles.logo} source={welcomeIcon} />
      <Text style={styles.paragraph}>¡Organicemos tus finanzas juntos!</Text>
      <Button mode="contained" onPress={() => setShowWelcomeScreen(false)} style={styles.button}>
        <Text style={styles.buttonText}>¡Empecemos!</Text>
      </Button>
    </LayerBackground>
  );
}

WelcomeScreen.propTypes = {
  setShowWelcomeScreen: PropTypes.func.isRequired,
};
