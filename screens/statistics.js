import { Text, Platform, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { FAB } from 'react-native-paper';
import PropTypes from 'prop-types';
import Tabs from '../components/statistics/Tabs';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FD',

    position: 'relative',
  },
  gradient: {
    flex: 0.15,
    paddingTop: Constants.statusBarHeight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 500,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  mainSection: {
    paddingTop: 5,
    flex: 0.85,
    backgroundColor: '#F6F6FD',
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    borderRadius: 50,
    top: Platform.OS === 'ios' ? 180 : 150,
    backgroundColor: '#FA6C17',
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function StatisticsScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LinearGradient
        start={[0, 1]}
        end={[1, 0]}
        locations={[0.2, 0.9]}
        style={styles.gradient}
        colors={['#03B263', '#01B496']}
      >
        <Text style={styles.headerText}>Estadisticas</Text>
      </LinearGradient>
      <View style={styles.mainSection}>
        <Tabs />
      </View>
      <FAB
        style={{ ...styles.fab, top: Platform.OS === 'ios' ? 40 : 30 }}
        small
        icon="home"
        onPress={() => navigation.navigate('Home')}
        color="white"
      />
    </View>
  );
}

StatisticsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
