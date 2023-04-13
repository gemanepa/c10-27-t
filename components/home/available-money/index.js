import { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Text } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import getAsyncStorageData from '../../../utils/get-storage-data';

const styles = StyleSheet.create({
  moneySignContainer: {
    borderWidth: 3,
    borderColor: '#EFB841',
    borderRadius: 50,
    marginBottom: 10,
  },
  upperText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 400,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 10,
  },
  textAmount: {
    color: 'white',
    fontSize: 50,
    fontWeight: 700,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  textCurrency: {
    color: 'white',
    fontSize: 25,
    fontWeight: 600,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});

export default function UpperSection() {
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
    <>
      <View style={styles.moneySignContainer}>
        <MaterialIcons name="attach-money" size={20} color="#EFB841" />
      </View>
      <Text style={styles.upperText} variant="titleSmall">
        - Disponible -
      </Text>
      {storagedData && (
        <>
          <Text style={styles.textAmount} variant="displayMedium">
            {formatNumber(storagedData.amount)}
          </Text>
          <Text style={styles.textCurrency} variant="headlineSmall">
            {storagedData.currency}
          </Text>
        </>
      )}
    </>
  );
}
