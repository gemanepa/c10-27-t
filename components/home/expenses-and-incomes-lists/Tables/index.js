import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import { generateRandomTableData } from './utils';
import getAsyncStorageData from '../../../../utils/get-storage-data';
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

function ButtonGroup({ route }) {
  const { key } = route;
  const tabType = key === 'first' ? 'expense' : 'income';

  const [buttonClicked, setButtonClicked] = useState(1);
  const [tableData, setTableData] = useState([]);
  const [tablesMockData, setTablesMockData] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    // random table data initial generation
    const getRandomTableData = async () => {
      const storagedCurrencyData = await getAsyncStorageData('userCurrency');
      const { currency } = storagedCurrencyData;
      const newRandomTableData = generateRandomTableData(currency);
      setTablesMockData({ ...tablesMockData, [tabType]: newRandomTableData });
    };
    if (!tablesMockData[tabType]) getRandomTableData();
  }, [tablesMockData, tabType]);

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
        {label}
      </Button>
    );
  };

  if (tableData.length === 0) return null;

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

ButtonGroup.propTypes = {
  route: PropTypes.object.isRequired,
};
RenderContent.propTypes = {
  buttonClicked: PropTypes.number.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ButtonGroup;
