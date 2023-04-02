import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import useAsyncStorage from '../../../../hooks/useAsyncStorage';
import { generateRandomTableData } from './utils';
import DayTable from './DayTable';
import WeekTable from './WeekTable';
import MonthTable from './MonthTable';

function RenderContent({ buttonClicked, tableData }) {
  if (buttonClicked === 1) {
    return <DayTable tableData={tableData} />;
  }
  if (buttonClicked === 2) {
    return <WeekTable tableData={tableData} />;
  }
  if (buttonClicked === 3) {
    return <MonthTable tableData={tableData} />;
  }
  return null;
}

const styles = StyleSheet.create({
  buttonStyle: {
    opacity: 0.7, // default style for inactive buttons
    backgroundColor: '#808080',
  },
  activeButton: {
    opacity: 1, // highlight the active button
  },
});

function ButtonGroup() {
  const [buttonClicked, setButtonClicked] = useState(1);
  const [tableData, setTableData] = useState(null);
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');

  useEffect(() => {
    if (!storagedData || tableData) return;
    const { currency } = storagedData;
    const data = generateRandomTableData(currency);
    setTableData(data);
  }, [storagedData, tableData]);

  const renderButton = (label, buttonNumber) => {
    const isActive = buttonClicked === buttonNumber;
    const buttonStyles = [styles.buttonStyle, isActive && styles.activeButton];
    return (
      <Button mode="contained" onPress={() => setButtonClicked(buttonNumber)} style={buttonStyles}>
        {label}
      </Button>
    );
  };

  if (storageLoading || !tableData) return null;

  return (
    <View>
      <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
        {renderButton('Dia', 1)}
        {renderButton('Semana', 2)}
        {renderButton('Mes', 3)}
      </View>

      <RenderContent buttonClicked={buttonClicked} tableData={tableData} />
    </View>
  );
}

RenderContent.propTypes = {
  buttonClicked: PropTypes.number.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonGroup;
