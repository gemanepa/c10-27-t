import { ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';

import EnterAmount from '../components/EnterAmount';
import Data from '../components/Data';
import Categories from '../components/Categories';
import Annotations from '../components/Annotations';

// /////////// Styles
const addSection = StyleSheet.create({
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
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// //////////////// component Body /////////////////////

export default function AddRevenue({ listOfAccounts, itemsCategories }) {
  const [enterAmount, setEnterAmount] = useState('');
  const [enterConcept, setEnterConcept] = useState('');

  const [date, setDate] = useState(new Date());

  const [selecdCategorie, setSelectedCategorie] = useState(1);

  const [selectAccount, setSelectedAccount] = useState('Principal');

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

  const renderPickerItems = (list2) => {
    const prop = list2.map((item) => (
      <Picker.Item key={item.id} label={item.title} value={item.id} />
    ));

    return prop;
  };

  // Date features
  const changeDate = (param) => {
    setDate(param);
  };

  // Categories Features
  const changeSelectedCategorie = (value) => {
    if (selecdCategorie !== value) {
      setSelectedCategorie(value);
      // Alert.alert('se a cambiado la Categoria', `Se cambio el id ${selecdCategorie} por ${value} `)
    } else {
      setSelectedCategorie(null);
    }
  };

  return (
    <ScrollView style={addSection.container}>
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
            renderPickerItems,
            listOfAccounts,
          }}
        />

        <Categories
          params={{ selecdCategorie, changeSelectedCategorie, renderPickerItems, itemsCategories }}
        />

        <Annotations />

        <Button mode="contained" textAlignVertical="center" style={SubmitStyle.button}>
          Añadir Ingreso
        </Button>
      </View>
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
    }).isRequired
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
      ]),
    })
  ).isRequired,
};
