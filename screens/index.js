import { Platform, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { FAB } from 'react-native-paper';
import PropTypes from 'prop-types';
import AvailableMoney from '../components/home/available-money';
import ExpensesAndIncomesLists from '../components/home/expenses-and-incomes-lists/Tabs';
import LayerBackground from '../components/generalComponents/layerBackground';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FD',

    position: 'relative',
  },
  gradient: {
    flex: 0.25,
    paddingTop: Constants.statusBarHeight,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    overflow: 'hidden',
  },
  asdf: {
    flex: 0.75,
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

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <LayerBackground
        params={{
          linearGradient: {
            style: { ...styles.gradient },
            colors: ['#03B263', '#01B496'],
            start: [0, 1],
            end: [1, 0],
            locations: [0.2, 0.9],
          },
          layer: {
            vector: '3',
            style: {
              position: 'absolute',
              bottom: 0,
              opacity: 0.4,
            },
            width: '116%',
            height: '116%',
          },
          mesh: {
            width: '160%',
            height: '160%',
            style: {
              opacity: 0.4,
              position: 'absolute',
              left: '-30%',
            },
          },
        }}
      >
        <AvailableMoney />
      </LayerBackground>

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
        color="white"
      />
      <FAB
        style={{ ...styles.fab, top: Platform.OS === 'ios' ? 40 : 30 }}
        small
        icon="equalizer"
        onPress={() => navigation.navigate('Statistics')}
        color="white"
      />
      <View style={styles.asdf}>
        <ExpensesAndIncomesLists />
      </View>
    </View>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
