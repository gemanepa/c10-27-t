import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Button, List } from 'react-native-paper';
// import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import 'moment/locale/es';
import Alert from './Alert';

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
    minHeight: 48,
    padding: 0,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FEFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default function Data({ params }) {
  // funtios params
  const { selectAccount, changeAccount, changeDate, date, listOfAccounts } = params;

  //  Status
  const [openListAccount, setOpenListAccount] = useState(false);
  const [openDate, setOpenDate] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);

  // Features
  function openList() {
    setOpenListAccount(!openListAccount);
  }
  // function closeList() {
  //   setOpenListAccount(!openListAccount);
  // }

  const changeDateAndStatusDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenDate(false);
    changeDate(currentDate);
  };

  const renderPickerItems = (list2) => {
    const prop = list2.map((item) => (
      <List.Item
        // style={{ position: 'absolute', backgroundColor: 'blue', width: '100%' }}
        key={item.id}
        label={item.title}
        value={item.id}
        title={item.title}
        onPress={() => {
          openList();
          changeAccount(item.title);
        }}
      />
    ));

    return prop;
  };

  // const isIOS = Platform.OS === 'ios';
  const changeIsShowAlert = () => {
    setIsShowAlert(false);
  };

  return (
    <View style={DataStyles.parentContainer}>
      <View style={DataStyles.container}>
        <Button
          title="Mostrar Picker"
          mode="contained"
          // onPress={() => openList()}
          onPress={() => setIsShowAlert(true)}
          style={DataStyles.button}
          textColor="black"
          labelStyle={{ fontSize: 18 }}
        >
          Cuenta
        </Button>

        <List.Accordion
          title={selectAccount}
          // style={{ borderWidth: 1, borderColor: 'black', borderRadius: 20, height: '100%' }}
          style={{ ...DataStyles.date, color: 'transparent' }}
          expanded={openListAccount}
          // onPress={() => openList()}
          onPress={() => setIsShowAlert(true)}
          theme={{ colors: { primary: 'blue', onPrimary: 'black', secondary: 'red' } }}
        >
          {renderPickerItems(listOfAccounts)}
        </List.Accordion>
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
          style={DataStyles.date}
          textColor="black"
        >
          {moment(date).locale('es').format('LL')}
        </Button>
        {openDate && (
          <DateTimePicker
            value={date}
            mode="date"
            disabled={openDate}
            onChange={changeDateAndStatusDate}
            negativeButton={{ textColor: 'red' }}
            positiveButton={{ textColor: 'blue' }}
          />
        )}
      </View>
      {isShowAlert && (
        <Alert
          title="Estamos trabajando en esta opción"
          params={{
            message: '¡Pronto estará lista!',
            fontColor: '#0003',
            changeShowAlert: changeIsShowAlert,
          }}
        />
      )}
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
