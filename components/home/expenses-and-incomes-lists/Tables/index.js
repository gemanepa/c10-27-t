/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import getAsyncStorageData from '../../../../utils/get-storage-data';
import DayTable from './DayTable';
import WeekTable from './WeekTable';
import MonthTable from './MonthTable';
import { MockedDataContext } from '../../../../hooks/useMockedData';

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
    borderRadius: 10,
    backgroundColor: '#fff6f0',
  },
  buttonText: {
    // fontWeight: 500,
    fontFamily: 'ubuntu-regular',
  },
  activeButton: {
    backgroundColor: '#FA6C17',
  },
});

function ButtonGroup({ route }) {
  const { key } = route;
  const tabType = key === 'first' ? 'expense' : 'income';
  const tablesMockData = useContext(MockedDataContext);

  const [buttonClicked, setButtonClicked] = useState(1);
  const [tableData, setTableData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    // table data generation
    async function getTableData() {
      const storagedCurrencyData = await getAsyncStorageData('userCurrency');
      const { currency } = storagedCurrencyData;

      const getTransactionsData = async () => {
        const parsed = (await getAsyncStorageData('userTransactions')) || [];
        const mapped = parsed
          .map((element) => ({
            key: element.category + element.amount + element.date,
            type: element.type,
            category: element.category,
            date: new Date(element.date),
            amount: `${Number(element.amount).toFixed(2)} ${currency}`,
            concept: element.concept,
          }))
          .filter((element) => element.type === tabType);
        return mapped;
      };

      const transactionsData = await getTransactionsData();

      const newTableData = [...transactionsData, ...tablesMockData[tabType]].sort(
        (a, b) => b.date - a.date
      );

      setTableData(newTableData);
    }
    if (isFocused && tablesMockData[tabType]) getTableData();
  }, [isFocused, tablesMockData, tabType]);

  const renderButton = (label, buttonNumber) => {
    const isActive = buttonClicked === buttonNumber;
    const buttonStyles = [styles.buttonStyle, isActive && styles.activeButton];
    return (
      <Button mode="contained" onPress={() => setButtonClicked(buttonNumber)} style={buttonStyles}>
        <Text style={{ ...styles.buttonText, color: `${isActive ? 'white' : '#8192a6'}` }}>
          {label}
        </Text>
      </Button>
    );
  };

  if (tableData.length === 0) return null;

  return (
    <View>
      <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
        {renderButton('Día', 1)}
        {renderButton('Semana', 2)}
        {renderButton('Mes', 3)}
      </View>

      <RenderContent buttonClicked={buttonClicked} tableData={tableData} />
    </View>
  );
}

ButtonGroup.propTypes = {
  route: PropTypes.object.isRequired,
};
RenderContent.propTypes = {
  buttonClicked: PropTypes.number.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonGroup;
