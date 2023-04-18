import { useState } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const styles = StyleSheet.create({
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

function DatePicker({ dateFilter, setDateFilter }) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    setDateFilter(new Date(date));
    hideDatePicker();
  };

  const dateBtnLabel = dateFilter ? dateFilter.toLocaleDateString('es-ES') : 'Ingresa la fecha';
  return (
    <>
      <TouchableOpacity style={styles.dateButton} onPress={showDatePicker}>
        <Text style={styles.dateButtonText}>{dateBtnLabel}</Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="es_ES"
        maximumDate={new Date()}
        confirmTextIOS="Confirmar"
        cancelTextIOS="Cancelar"
        buttonTextColorIOS="#FA6C17"
      />
    </>
  );
}

DatePicker.propTypes = {
  dateFilter: PropTypes.instanceOf(Date),
  setDateFilter: PropTypes.func.isRequired,
};

DatePicker.defaultProps = {
  dateFilter: null,
};

export default DatePicker;
