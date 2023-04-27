import { Text, Platform, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';
import Tabs from '../components/statistics/Tabs';
import BottomNavigator from '../components/shared/BottomNavigator';
import LayerBackground from '../components/generalComponents/layerBackground';

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
    overflow: 'hidden',
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    letterSpacing: 0.15,
    fontFamily: 'ubuntu-medium',
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
  return (
    <>
      <View style={styles.container}>
        <LayerBackground
          params={{
            linearGradient: {
              style: styles.gradient,
              colors: ['#03B263', '#01B496'],
              start: [1, 0],
              end: [1, 1],
              locations: [0.2, 0.9],
            },
            mesh: {
              width: '400%',
              height: '400%',
              style: {
                position: 'absolute',
                top: 0,
                opacity: 0.4,
              },
            },
            layer: {
              vector: 2,
              width: '250%',
              height: '250%',
              style: {
                position: 'absolute',
                opacity: 0.3,
                top: 0,
              },
            },
          }}
        >
          <Text style={styles.headerText}>Estadísticas</Text>
        </LayerBackground>
        <View style={styles.mainSection}>
          <Tabs />
        </View>
      </View>
      <BottomNavigator />
    </>
  );
}

StatisticsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
