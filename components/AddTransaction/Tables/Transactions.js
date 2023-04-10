import { ScrollView, View, StyleSheet, } from 'react-native';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EnterAmount from '../components/EnterAmount';
import Data from '../components/Data';
import CategoriesList from '../components/CategoriesList';
import Annotations from '../components/Annotations';
import Alert from '../components/Alert';

// /////////// Styles
const TransactionsStyles = StyleSheet.create({
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
    // backgroundColor: '#858282',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// //////////////// component Body /////////////////////

export default function Transactions({ navigation, params }) {
  const { listOfAccounts, listOfCategories, changeListOfCategories, information } = params;

  const [enterAmount, setEnterAmount] = useState('');
  const [enterConcept, setEnterConcept] = useState('');

  const [date, setDate] = useState(new Date());

  const [selectedCategory, setSelectedCategory] = useState({});

  const [selectAccount, setSelectedAccount] = useState('Principal');

  const [annotations, setAnnotations] = useState('');

  const [showAlertAddTransaction, setShowAlertAddTransaction] = useState(false);

  const isAllFull = (!enterAmount || !enterConcept || !selectAccount || !selectedCategory.id) ? false : true;

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
  const changeSelectedCategorie = async (value) => {
    if (selectedCategory.id !== value.id) {
      setSelectedCategory(value);
      await AsyncStorage.setItem(`categorySelect${information.name}`, JSON.stringify({ category: value }));
    } else {
      setSelectedCategory({});
      await AsyncStorage.setItem(`categorySelect${information.name}`, JSON.stringify({ category: {} }));
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
  const StoreTransactionData = async () => {
    if (!enterAmount || !enterConcept || !selectAccount || !selectedCategory.id) {
      return;
    }
    const createUpdatedExpensesData = (previusDataParsed) => {
      const updatedExpense = {
        type: 'income',
        concept: enterConcept,
        amount: enterAmount,
        account: selectAccount,
        date,
        category: selectedCategory.title,
        annotations,
      };

      return [updatedExpense, ...previusDataParsed];
    };

    const updateUserExpenses = async () => {
      const previusData = (await AsyncStorage.getItem(`user${information.name}`)) || JSON.stringify([]);
      const previusDataParsed = JSON.parse(previusData);
      const updatedExpensesData = createUpdatedExpensesData(previusDataParsed);
      await AsyncStorage.setItem(`user${information.name}`, JSON.stringify(updatedExpensesData));
    };

    const updateUserCurrency = async () => {
      const previousCurrencyAmountData = await AsyncStorage.getItem('userCurrency');
      const previousCurrencyAmountParsed = JSON.parse(previousCurrencyAmountData);
      let updatedCurrencyAmount = Number(previousCurrencyAmountParsed.amount)

      if (information.mathematicalSymbol === '+') {
        updatedCurrencyAmount =
          Number(previousCurrencyAmountParsed.amount) + Number(enterAmount);
      }
      if (information.mathematicalSymbol === '-') {
        updatedCurrencyAmount =
          Number(previousCurrencyAmountParsed.amount) - Number(enterAmount);
      }

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
    <ScrollView style={TransactionsStyles.container_view}>
      <View style={TransactionsStyles.container}>
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

        {listOfCategories &&

          <CategoriesList
            params={{
              navigation,
              selectedCategory,
              changeSelectedCategorie,
              listOfCategories,
              nameTransaction: information.name,
            }}
          />

        }

        <Annotations annotations={annotations} changeAnnotations={changeAnnotations} />

        <Button
          mode="contained"
          textAlignVertical="center"
          style={SubmitStyle.button}
          onPress={() => isAllFull && StoreTransactionData()}
          labelStyle={{
            width: '100%',
            height: 40,
            flexDirection: 'column',
            textAlignVertical: 'center',
          }}
          theme={{
            colors: {
              primary: `${isAllFull ?
                '#FA6C17' :
                '#FEEBE0'
                }`
            }
          }}
        >
          {information.buttonSubmitText}
        </Button>
      </View>

      {showAlertAddTransaction && (
        <Alert title={information.alertText} params={{ fontColor: '#0003' }} />
      )}
    </ScrollView>
  );
}

Transactions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
  params: PropTypes.shape({
    listOfAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      })
    ).isRequired,
    listOfCategories: PropTypes.oneOfType([
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
      }),
      PropTypes.bool,
      PropTypes.any,
    ]).isRequired,
    changeListOfCategories: PropTypes.func,
    information: PropTypes.shape({
      name: PropTypes.string,
      buttonSubmitText: PropTypes.string,
      mathematicalSymbol: PropTypes.string,
      alertText: PropTypes.string,
    })

  }).isRequired
};