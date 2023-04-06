import { ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EnterAmount from '../components/EnterAmount';
import Data from '../components/Data';
import CategoriesList from '../components/CategoriesList';
import Annotations from '../components/Annotations';
import Alert from '../components/Alert';

// /////////// Styles
const addSection = StyleSheet.create({
  container_view: {
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'column',
    gap: 20,
    paddingBottom: 30,
  },
});

const SubmitStyle = StyleSheet.create({
  button: {
    marginHorizontal: '15%',
    backgroundColor: '#858282',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// //////////////// component Body /////////////////////

export default function AddRevenue({ navigation, listOfAccounts, itemsCategories }) {
  const [enterAmount, setEnterAmount] = useState('');
  const [enterConcept, setEnterConcept] = useState('');

  const [date, setDate] = useState(new Date());

  const [selectedCategory, setSelectedCategorie] = useState('');

  const [selectAccount, setSelectedAccount] = useState('Principal');

  const [annotations, setAnnotations] = useState('');

  const [showAlertAddTransaction, setShowAlertAddTransaction] = useState(false);

  // Amount Functions
  const changeAmount = (value) => {
    setEnterAmount(value);
  };

  const changeConcept = (value) => {
    setEnterConcept(value);
  };

  // Account Features

  const changeAccount = (value) => {
    setSelectedAccount(value);
  };

  // Date features
  const changeDate = (param) => {
    setDate(param);
  };

  // Categories Features
  const changeSelectedCategory = async (value) => {
    if (selectedCategory !== value) {
      setSelectedCategorie(value);
      await AsyncStorage.setItem('categorySelectRevenue', JSON.stringify({ category: value }));
    } else {
      setSelectedCategorie('');
      await AsyncStorage.setItem('categorySelectRevenue', JSON.stringify({ category: '' }));
    }
  };

  // Annotations features
  const changeAnnotations = (value) => {
    setAnnotations(value);
  };

  // Alert features
  // const changeShowAlertAddTransaction = () => {
  //   setShowAlertAddTransaction(false);
  // }

  // Submit
  const storeData = async () => {
    if (!enterAmount || !enterConcept || !selectAccount || !selectedCategory) {
      return;
    }
    const createUpdatedExpensesData = (previusDataParsed) => {
      const updatedExpense = {
        type: 'income',
        concept: enterConcept,
        amount: enterAmount,
        account: selectAccount,
        date,
        category: itemsCategories.find((item) => item.id === selectedCategory).title,
        annotations,
      };

      return [updatedExpense, ...previusDataParsed];
    };

    const updateUserExpenses = async () => {
      const previusData = (await AsyncStorage.getItem('userExpenses')) || JSON.stringify([]);
      const previusDataParsed = JSON.parse(previusData);
      const updatedExpensesData = createUpdatedExpensesData(previusDataParsed);
      await AsyncStorage.setItem('userExpenses', JSON.stringify(updatedExpensesData));
    };

    const updateUserCurrency = async () => {
      const previousCurrencyAmountData = await AsyncStorage.getItem('userCurrency');
      const previousCurrencyAmountParsed = JSON.parse(previousCurrencyAmountData);
      const updatedCurrencyAmount =
        Number(previousCurrencyAmountParsed.amount) + Number(enterAmount);
      const userCurrency = {
        currency: previousCurrencyAmountParsed.currency,
        amount: updatedCurrencyAmount,
      };
      await AsyncStorage.setItem('userCurrency', JSON.stringify(userCurrency));
    };

    const navigateBack = () => {
      navigation.goBack();
    };

    try {
      await updateUserExpenses();
      await updateUserCurrency();
      setShowAlertAddTransaction(true);
      setTimeout(navigateBack, 1500);
    } catch (error) {
      console.log(error); // eslint-disable-line no-console
    }
  };

  return (
    <ScrollView style={addSection.container_view}>
      <View style={addSection.container}>
        <EnterAmount
          enterAmount={enterAmount}
          changeAmount={changeAmount}
          enterConcept={enterConcept}
          changeConcept={changeConcept}
        />

        <Data
          params={{
            selectAccount,
            changeAccount,
            changeDate,
            date,
            listOfAccounts,
          }}
        />

        <CategoriesList
          params={{
            navigation,
            selectedCategory,
            changeSelectedCategory,
            itemsCategories,
            nameTransaction: 'Revenue',
          }}
        />

        <Annotations annotations={annotations} changeAnnotations={changeAnnotations} />

        <Button
          mode="contained"
          textAlignVertical="center"
          style={SubmitStyle.button}
          onPress={storeData}
          labelStyle={{
            width: '100%',
            height: 40,
            flexDirection: 'column',
            textAlignVertical: 'center',
          }}
        >
          Añadir Ingreso
        </Button>
      </View>

      {showAlertAddTransaction && (
        <Alert title="¡Ingreso añadido con éxito!" params={{ fontColor: '#0003' }} />
      )}
    </ScrollView>
  );
}

AddRevenue.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  listOfAccounts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
  itemsCategories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          uri: PropTypes.string.isRequired,
          width: PropTypes.number.isRequired,
          height: PropTypes.number.isRequired,
          scale: PropTypes.number,
          resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
        }),
        PropTypes.any,
      ]),
    })
  ).isRequired,
};
