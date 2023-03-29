import { View, TextInput, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Picker } from '@react-native-picker/picker';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Button } from 'react-native-paper';
// import DateTimePicker from '@react-native-community/datetimepicker';


const EnterAmountStyles = StyleSheet.create({
  container: {
    height: '25%',
    marginBottom: '10%',
    padding: '10%',
    backgroundColor: '#d9d9d9',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    gap: 20
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
    width: '50%',
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
      padding: 20,
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
)


export default function AddRevenue() {

  const [enterAmount, setEnterAmount] = useState('');

  const [date, setDate] = useState(new Date());
  const [openDate, setOpenDate] = useState(false);

  // List Features
  const changeAmount = (value) => {
    setEnterAmount(value);
  };

  const [selectAccount, setSelectedValue] = useState('Principal');
  const listOfAccounts = [
    'Principal',
    'Opción 2',
    'Opción 3',
    'Opción 4',
    'Opción 5',
  ];

  const changeAccount = (value) => {
    const newData = listOfAccounts.filter((item) => item !== value);
    newData.unshift(value);
    setSelectedValue(value);
  };


  const renderPickerItems = () => {
    const prop = listOfAccounts.map((item) => (
      <Picker.Item key={item} label={item} value={item} />
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

  return (
    <>
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
            mode='contained' onPress={() => open()}
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
              {renderPickerItems()}
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
    </>
  );
}

AddRevenue.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
  }).isRequired,
};


