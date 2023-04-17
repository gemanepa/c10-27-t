import { useState, useEffect } from 'react';
import { Text, Platform, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useRoute, useNavigation } from '@react-navigation/native';
import LayerBackground from '../components/generalComponents/layerBackground';
import Table from '../components/details/Table';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6FD',

    position: 'relative',
  },
  gradient: {
    flex: 0.15,
    paddingTop: 5,
    paddingBottom: 5,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 90,
    borderBottomRightRadius: 90,
    overflow: 'hidden',
  },
  headerAmount: {
    color: 'white',
    fontSize: 50,
    fontWeight: 700,
    letterSpacing: -0.3,
    fontFamily: 'ubuntu-bold',
  },
  headerCurrency: {
    color: 'white',
    fontSize: 23,
    letterSpacing: -0.3,
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
  buttonStyle: {
    backgroundColor: '#FFF6F0',
    borderRadius: 10,
  },
  buttonText: {
    color: '#8192A6',
    fontFamily: 'ubuntu-regular',
  },
  activeButton: {
    backgroundColor: '#FA6C17',
  },
  dateButton: {
    borderWidth: 0.5,
    borderColor: 'rgba(51, 64, 80, 0.9)',
    borderRadius: 10,
    paddingVertical: 10,
    marginBottom: 18,
    paddingHorizontal: 15,
    backgroundColor: '#FEFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    width: 248,
    height: 48,
    alignSelf: 'center',
  },
  dateButtonText: {
    fontSize: 16,
    color: '#9BA5B3',
    fontWeight: 400,
  },
});

export default function DetailsScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const [tableData, setTableData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const currency = route?.params?.currency;

  const [buttonClicked, setButtonClicked] = useState(1);
  useEffect(() => {
    navigation.setOptions({
      title: `${route?.params?.type === 'income' ? 'Ingresos' : 'Gastos'} - ${
        route?.params?.category
      }`,
    });
  }, [navigation, route?.params?.category, route?.params?.type]);

  useEffect(() => {
    function sortByAmountDescending(arr) {
      arr.sort((a, b) => b.amount - a.amount);
      return arr;
    }

    function getTotalAmount(arr) {
      let total = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < arr.length; i++) {
        total += arr[i].amount;
      }
      return total;
    }

    if (route?.params?.data) {
      const data = route?.params?.data?.map((item) => ({
        ...item,
        date: new Date(item.date),
        amount: Number(item.amount.split(' ')[0]),
      }));
      const orderByAmount = buttonClicked === 2;
      if (orderByAmount) {
        setTableData(sortByAmountDescending(data));
      } else {
        setTableData(data);
      }
      setTotalAmount(getTotalAmount(data));
    }
  }, [route?.params?.data, buttonClicked]);

  const renderButton = (label, buttonNumber) => {
    const isActive = buttonClicked === buttonNumber;
    const buttonStyles = [styles.buttonStyle, isActive && styles.activeButton];

    const handlePress = () => {
      setButtonClicked(buttonNumber);
    };

    return (
      <Button mode="contained" onPress={handlePress} style={buttonStyles}>
        <Text
          style={{
            ...styles.buttonText,
            fontFamily: `${isActive ? 'ubuntu-bold' : 'ubuntu-regular'}`,
            color: `${isActive ? 'white' : '#8192A6'}`,
          }}
        >
          {label}
        </Text>
      </Button>
    );
  };

  return (
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
        <Text style={styles.headerAmount}>{totalAmount.toFixed(2)}</Text>
        <Text style={styles.headerCurrency}>{currency}</Text>
      </LayerBackground>
      <View
        style={{
          paddingTop: 30,
          paddingBottom: 20,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {renderButton('Fecha', 1)}
        {renderButton('Cantidad', 2)}
      </View>
      <View style={styles.mainSection}>
        <Table tableData={tableData} currency={currency} />
      </View>
    </View>
  );
}

DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};
