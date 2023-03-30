import { View, TextInput, Text, StyleSheet, Image, Alert } from 'react-native';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Button } from 'react-native-paper';

import HealthIcon from '../../assets/addTransactionIcons/BTN_SaludHealthIcon.png'

const addSection = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: 10
  }
})

const EnterAmountStyles = StyleSheet.create({
  container: {
    height: '20%',
    minHeight: 100,
    paddingTop: '8%',
    backgroundColor: '#d9d9d9',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    gap: 10
  },
  enterAmount: {
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10
  },
  title: {
    textAlign: 'center',
    fontSize: 20
  },
  inputAmount: {
    width: '40%',
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center'
  },
  currency: {
    height: 50,
    width: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
});

const DataStyles = StyleSheet.create(
  {
    parentContainer: {
      flexDirection: 'row',
      width: '100%',
      // padding: 20,
      paddingHorizontal: 20,
      gap: 10,
    },
    container: {
      width: '50%',
    },
    button: {
      backgroundColor: 'transparent',
      margin: 0,
    },
    date: {
      padding: 0,
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 20,
      backgroundColor: 'transparent',
    }
  }
);

const CategoriesStyles = StyleSheet.create(
  {
    container: {
      paddingLeft: '10%',
      paddingRight: '10%',
      flexDirection: 'column',
      gap: 10
    },
    button: {
      backgroundColor: 'transparent',
    },

    item: {
      marginBottom: 10,
      width: '25%',
      height: 80,
      flexDirection: 'column',
      alignItems: 'center',
      position: 'relative',
      borderRadius: 10
    },

    titleItems: {
      position: 'absolute',
      height: '100%',
      textAlignVertical: 'bottom',
      transform: [{ translateY: -10 }],
      // backgroundColor: 'black'
    }

  }
)

const AnnotationsStyles = StyleSheet.create(
  {
    container: {
      paddingLeft: '10%',
      paddingRight: '10%',
      flexDirection: 'column',
      gap: 10
    },
    title: {
      textAlign: 'center',
      fontSize: 20
    },

    inputAnnotation: {
      width: '100%',
      height: 60,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      borderTopColor: '#f6f6f60f',
      textAlign: 'center'
    }
  }
)

const SubmitStyle = StyleSheet.create({
  button: {
    backgroundColor: '#858282',
    height: 60,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default function AddExpense() {
  const [enterAmount, setEnterAmount] = useState('');

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  const [selecdCategorie, setSelectedCategorie] = useState(1);

  // List Features
  const changeAmount = (value) => {
    setEnterAmount(value);
  };

  const [selectAccount, setSelectedAccount] = useState('Principal');

  const listOfAccounts = [
    { id: 1, title: 'Principal' },
    { id: 2, title: 'Opción 2' },
    { id: 3, title: 'Opción 3' },
    { id: 4, title: 'Opción 4' },
    { id: 5, title: 'Opción 5' },
    { id: 6, title: 'Opción 6' },

  ];


  const changeAccount = (value) => {
    setSelectedAccount(value);
  };


  const renderPickerItems = (list2) => {
    const prop = list2.map((item) => (
      <Picker.Item key={item.id} label={item.title} value={item.id} />
    ));

    return prop
  };

  // Date features
  const changeDate = (event, selectedDate) => {
    if (event.type === 'neutralButtonPressed') {
      setDate(new Date(0));
    } else {
      setDate(selectedDate);
    }
    setOpenDate(false);
  };

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }
  // function close() {
  //   pickerRef.current.blur();
  // }

  // Categories Features

  const itemsCategories = [
    { id: 7, title: 'Salud', image: HealthIcon },
    { id: 8, title: 'Higiene', image: HealthIcon },
    { id: 9, title: 'Educacion', image: HealthIcon },
    { id: 10, title: 'Hogar', image: HealthIcon },
    { id: 11, title: 'Transporte', image: HealthIcon },
    { id: 12, title: 'Comida', image: HealthIcon },
    { id: 13, title: 'Ocio', image: HealthIcon },
    // { id: '8', title: 'Elemento 8', image: HealthIcon },
  ];

  const pickerCategory = useRef();

  function openCategory() {
    pickerCategory.current.focus();
  }

  const changeSelectedCategorie = (value) => {
    if (selecdCategorie !== value) {
      return setSelectedCategorie(value);
      // Alert.alert('se a cambiado la Categoria', `Se cambio el id ${selecdCategorie} por ${value} `)
    }
    setSelectedCategorie(null)
  };

  const renderCategoriesItems = () => {
    const items = itemsCategories.map(item => (
      <View
        style={{ ...CategoriesStyles.item, backgroundColor: `${item.id === selecdCategorie ? '#d9d9d9' : 'transparent'}` }}
        key={item.id}
      >
        {/* <Image source={require('../../assets/addTransactionIcons/BTN_SaludHealthIcon.png')} style={{ width: 50, height: 50 }} /> */}
        <Image source={item.image} style={{ width: 50, height: 50 }} />
        <Text
          style={CategoriesStyles.titleItems}
          onPress={() => changeSelectedCategorie(item.id)}
        >
          {item.title}
        </Text>
      </View>
    ))

    return items
  }





  return (
    <View style={addSection.container}>
      <View style={EnterAmountStyles.container} >
        <Text style={EnterAmountStyles.title} >
          Ingresa Monto
        </Text>
        <View style={EnterAmountStyles.enterAmount} >
          <TextInput
            placeholder="Cantidad"
            value={enterAmount}
            keyboardType="numeric"
            onChangeText={changeAmount}
            style={EnterAmountStyles.inputAmount}
          />
          <Text style={EnterAmountStyles.currency} > USD </Text>
        </View>
      </View>

      <View style={DataStyles.parentContainer}>
        <View style={DataStyles.container} >
          <Button
            title="Mostrar Picker"
            mode='contained'
            onPress={() => open()}
            style={DataStyles.button}
            textColor='black'
            labelStyle={{ fontSize: 20 }}
          >
            Cuenta
          </Button>
          <View style={DataStyles.date} >
            <Picker
              selectedValue={selectAccount}
              onValueChange={changeAccount}
              ref={pickerRef}
              style={{ borderBottomWidth: 1, borderColor: 'rgb(204, 204, 204)', }}
            >
              {renderPickerItems(listOfAccounts)}
            </Picker>
          </View>
        </View>

        <View style={DataStyles.container} >
          <Button
            title='Fecha'
            mode='contained'
            onPress={() => setOpenDate(true)}
            style={DataStyles.button}
            textColor='black'
            labelStyle={{ fontSize: 20 }}
          >
            Fecha
          </Button>
          <Button
            mode='contained'
            onPress={() => setOpenDate(true)}
            style={{ ...DataStyles.date, padding: '4%' }}
            textColor='black'
          >
            {moment(date).format('MM/DD/YYYY HH:mm')}
          </Button>
          {openDate &&
            <RNDateTimePicker
              value={date}
              disabled={openDate}
              onChange={changeDate}
              negativeButton={{ textColor: 'red' }}
              positiveButton={{ textColor: 'blue' }} /
            >
          }
        </View>
      </View>

      <View style={CategoriesStyles.container} >
        <Button
          mode='contained'
          style={CategoriesStyles.button}
          textColor='black'
          labelStyle={{ fontSize: 20 }}
        >
          Categorias
        </Button>

        <View
          style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}
        >

          {renderCategoriesItems()}

          <View
            style={CategoriesStyles.item}
          >
            {/* <Image source={require('../../assets/addTransactionIcons/BTN_SaludHealthIcon.png')} style={{ width: 50, height: 50 }} /> */}
            <Image
              source={require('../../assets/addTransactionIcons/Add.png')}
              style={{ width: 50, height: 50 }}
            />
            <Text
              style={CategoriesStyles.titleItems}
              onPress={() => openCategory()}
            >Mas</Text>
          </View>


          <View style={{ opacity: 0 }} >
            <Picker
              // selectedValue={selectAccount}
              onValueChange={changeSelectedCategorie}
              ref={pickerCategory}
              style={{ borderBottomWidth: 1, borderColor: 'rgb(204, 204, 204)', }}
            >
              {renderPickerItems(itemsCategories)}
            </Picker>
          </View>
        </View >

        <View style={AnnotationsStyles.container} >
          <Text style={AnnotationsStyles.title} >
            Anotaciones
          </Text>

          <TextInput
            // placeholder="Cantidad"
            // value={enterAmount}
            // keyboardType="numeric"
            // onChangeText={changeAmount}
            style={AnnotationsStyles.inputAnnotation}
          />

        </View>

        <Button
          mode='contained'
          textAlignVertical='center'
          style={SubmitStyle.button}
        >
          Añadir gasto
        </Button>
      </View>
    </View>
  );
}

AddExpense.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};