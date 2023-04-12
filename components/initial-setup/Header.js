import { Image, Text, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import stepOneIcon from '../../assets/initial-setup/intro-image.png';
import stepTwoIcon from '../../assets/initial-setup/pin-screen-img.png';

const styles = StyleSheet.create({
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 10,
  },
  paragraph: {
    fontSize: 30,
    fontWeight: 700,
    textAlign: 'center',
    color: '#fff',
    width: 250,
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
  },
});

export default function SettingUpHeaderScreen({ headerText }) {
  return (
    <View style={styles.headerContainer}>
      <Image
        style={styles.logo}
        source={headerText === '¡Protejamos tus datos!' ? stepTwoIcon : stepOneIcon}
      />
      <Text
        style={{ ...styles.paragraph, width: headerText === '¡Protejamos tus datos!' ? 200 : 250 }}
      >
        {headerText}
      </Text>
    </View>
  );
}

SettingUpHeaderScreen.propTypes = {
  headerText: PropTypes.string.isRequired,
};
