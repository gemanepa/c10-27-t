/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import PieChartScreen from './PieChart';
import { MockedDataContext } from '../../hooks/useMockedData';
import getAsyncStorageData from '../../utils/get-storage-data';

function RenderContent({ buttonClicked, tableData }) {
  if (buttonClicked === 1) {
    return (
      <>
        <PieChartScreen tableData={tableData} />
        <Text>{JSON.stringify(tableData)}</Text>
      </>
    );
  }
  if (buttonClicked === 2) {
    return (
      <>
        <PieChartScreen tableData={tableData} />
        <Text>{JSON.stringify(tableData)}</Text>
      </>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  buttonStyle: {
    opacity: 0.4, // default style for inactive buttons
    backgroundColor: '#FA6C17',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 700,
  },
  activeButton: {
    opacity: 1, // highlight the active button
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
        <Text style={styles.buttonText}>{label}</Text>
      </Button>
    );
  };

  // if (tableData.length === 0) return null;

  return (
    <View>
      <View
        style={{ paddingVertical: 30, flexDirection: 'row', justifyContent: 'center', gap: 40 }}
      >
        {renderButton('Mensual', 1)}
        {renderButton('Periodo', 2)}
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
