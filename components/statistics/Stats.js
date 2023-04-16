/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import PieChartScreen from './PieChart';
import { MockedDataContext } from '../../hooks/useMockedData';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import getAsyncStorageData from '../../utils/get-storage-data';

function RenderContent({ buttonClicked, tableData, currency }) {
  if (buttonClicked === 1) {
    return (
      <>
        <PieChartScreen tableData={tableData} />
        <View style={{ paddingTop: 20 }}>
          <ScrollView>
            {tableData.map((rowData) => (
              <View
                key={rowData.category}
                style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}
              >
                <Text style={[{ flex: 1, textAlign: 'center' }]}>{rowData.percentage}%</Text>
                <Text style={[{ flex: 1, textAlign: 'center' }]}>{rowData.category}</Text>
                <Text style={[{ flex: 1, textAlign: 'center' }]}>
                  {rowData.total} {currency}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </>
    );
  }
  if (buttonClicked === 2) {
    return null;
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

  const [, storagedData] = useAsyncStorage('userCurrency');

  const [buttonClicked, setButtonClicked] = useState(1);
  const [tableData, setTableData] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    // table data generation
    async function getTableData() {
      const getTransactionsData = async () => {
        const parsed = (await getAsyncStorageData('userTransactions')) || [];
        const mapped = parsed
          .map((element) => ({
            key: element.category + element.amount + element.date,
            type: element.type,
            category: element.category,
            date: new Date(element.date),
            amount: element.amount,
          }))
          .filter((element) => element.type === tabType);
        return mapped;
      };

      function getCategoryData(arr) {
        const total = arr.reduce((acc, obj) => acc + obj.amount, 0);
        const categorySums = {};

        arr.forEach((obj) => {
          const { category, amount } = obj;
          if (category in categorySums) {
            categorySums[category].total += amount;
          } else {
            categorySums[category] = { total: amount, percentage: 0 };
          }
        });

        const categoryData = Object.keys(categorySums).map((category) => {
          const { total: sum } = categorySums[category];
          const percentage = ((sum / total) * 100).toFixed(2);
          return { category, total: sum.toFixed(2), percentage };
        });

        categoryData.sort((a, b) => b.total - a.total); // sort in descending order by "total" value

        return categoryData;
      }

      function getRandomHexColor() {
        const hexChars = '0123456789ABCDEF';
        let color = '#';

        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < 6; i++) {
          color += hexChars[Math.floor(Math.random() * 16)];
        }

        return color;
      }

      const transactionsData = await getTransactionsData();

      const mockedData = tablesMockData[tabType].map((element) => ({
        key: element.category + element.amount + element.date,
        type: element.type,
        category: element.category,
        date: element.date,
        amount: Number(element.amount.split(' ')[0]),
      }));
      const categoryData = getCategoryData([...transactionsData, ...mockedData]).map(
        (element, index) => ({
          ...element,
          svg: { fill: getRandomHexColor() },
          key: index,
        })
      );

      setTableData(categoryData);
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

  return (
    <View>
      <View
        style={{ paddingVertical: 30, flexDirection: 'row', justifyContent: 'center', gap: 40 }}
      >
        {renderButton('Mensual', 1)}
        {renderButton('Periodo', 2)}
      </View>

      <RenderContent
        buttonClicked={buttonClicked}
        tableData={tableData}
        currency={storagedData?.currency}
      />
    </View>
  );
}

ButtonGroup.propTypes = {
  route: PropTypes.object.isRequired,
};
RenderContent.propTypes = {
  buttonClicked: PropTypes.number.isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
};

export default ButtonGroup;
