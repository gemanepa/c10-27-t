import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { Text, FAB } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import getAsyncStorageData from '../../../utils/get-storage-data';

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    borderBottomLeftRadius: 150,
    borderBottomRightRadius: 150,
    position: 'relative',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    borderRadius: 50,
    bottom: -10,
  },
  moneySign: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function UpperSection({ navigation }) {
  const [storagedData, setStoragedData] = useState(null);
  const isFocused = useIsFocused();
  useEffect(() => {
    const retrieveData = async () => {
      const data = await getAsyncStorageData('userCurrency');
      setStoragedData(data);
    };
    if (isFocused) retrieveData();
  }, [isFocused]);

  function formatNumber(num) {
    const rounded = num.toFixed(2);
    return Number(rounded).toString();
  }

  return (
    <View style={styles.container}>
      <View style={{ borderWidth: 2, borderColor: 'black', borderRadius: 50 }}>
        <MaterialIcons name="attach-money" size={24} color="black" />
      </View>
      <Text variant="titleSmall">- Disponible -</Text>
      {storagedData && (
        <>
          <Text variant="displayMedium">{formatNumber(storagedData.amount)}</Text>
          <Text variant="headlineSmall">{storagedData.currency}</Text>
        </>
      )}

      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate('AddTransaction')}
      />
    </View>
  );
}

UpperSection.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
