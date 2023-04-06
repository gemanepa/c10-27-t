import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es';

const DataStyles = StyleSheet.create({
  parentContainer: {
    flexDirection: 'row',
    width: '100%',
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
  },
});

export default function Data({ params }) {
  // funtios params
  const { selectAccount, changeAccount, changeDate, date, listOfAccounts } = params;

  //  Status
  const pickerRef = useRef();
  const [openDate, setOpenDate] = useState(false);

  // Features
  function openList() {
    pickerRef.current.focus();
  }
  // function closeList() {
  //   pickerRef.current.blur();
  // }

  const changeDateAndStatusDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenDate(false);
    changeDate(currentDate);
  };

  const renderPickerItems = (list2) => {
    const prop = list2.map((item) => (
      <Picker.Item key={item.id} label={item.title} value={item.id} />
    ));

    return prop;
  };

  // const isIOS = Platform.OS === 'ios';

  return (
    <View style={DataStyles.parentContainer}>
      <View style={DataStyles.container}>
        <Button
          title="Mostrar Picker"
          mode="contained"
          onPress={() => openList()}
          style={DataStyles.button}
          textColor="black"
          labelStyle={{ fontSize: 18 }}
        >
          Cuenta
        </Button>
        <View style={DataStyles.date}>
          <Picker
            selectedValue={selectAccount}
            onValueChange={changeAccount}
            ref={pickerRef}
            style={{ borderBottomWidth: 1, borderColor: 'rgb(204, 204, 204)' }}
          >
            {renderPickerItems(listOfAccounts)}
          </Picker>
        </View>
      </View>

      <View style={DataStyles.container}>
        <Button
          title="Fecha"
          mode="contained"
          onPress={() => setOpenDate(true)}
          style={DataStyles.button}
          textColor="black"
          labelStyle={{ fontSize: 18 }}
        >
          Fecha
        </Button>
        <Button
          mode="contained"
          onPress={() => setOpenDate(true)}
          style={{ ...DataStyles.date, paddingVertical: '4%' }}
          textColor="black"
        >
          {moment(date).locale('es').format('LL')}
        </Button>
        {openDate && (

          <DateTimePicker
            value={date}
            mode='date'
            disabled={openDate}
            onChange={changeDateAndStatusDate}
            negativeButton={{ textColor: 'red' }}
            positiveButton={{ textColor: 'blue' }}
          />
        )}
      </View>
    </View>
  );
}

Data.propTypes = {
  params: PropTypes.shape({
    selectAccount: PropTypes.string,
    changeAccount: PropTypes.func,
    changeDate: PropTypes.func,
    date: PropTypes.any,
    listOfAccounts: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
      }).isRequired
    ).isRequired,
  }).isRequired,
};
