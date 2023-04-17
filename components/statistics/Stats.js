/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PieChartScreen from './PieChart';
import { MockedDataContext } from '../../hooks/useMockedData';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import getAsyncStorageData from '../../utils/get-storage-data';

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

function RenderContent({ buttonClicked, tableData, currency, dateFilter, setDateFilter }) {
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
      {buttonClicked === 2 && (
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
          />
        </>
      )}
      <PieChartScreen tableData={tableData} />
      <View
        style={{ paddingHorizontal: 20, marginTop: 30, paddingTop: 10, backgroundColor: '#EFEEEE' }}
      >
        <ScrollView style={{ minHeight: 350 }}>
          {tableData.map((rowData, index) => {
            const isLastItem = index === tableData.length - 1;
            return (
              <View
                key={rowData.category}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingTop: 20,
                  paddingBottom: 18,
                  borderBottom: 1,
                  borderBottomColor: '#99A3A4',
                  borderBottomWidth: isLastItem ? 0 : 1,
                }}
              >
                <View style={{ flexDirection: 'row', flex: 0.7 }}>
                  <Text
                    style={{
                      width: 70,
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#334050',
                      letterSpacing: -0.3,
                    }}
                  >
                    {rowData.percentage}%
                  </Text>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      backgroundColor: rowData.svg.fill,
                      marginRight: 10,
                      borderRadius: 50,
                    }}
                  />
                  <Text
                    style={{ fontWeight: 400, fontSize: 14, letterSpacing: -0.3, color: '#334050' }}
                  >
                    {rowData.category}
                  </Text>
                </View>

                <Text
                  style={[
                    {
                      flex: 0.3,
                      textAlign: 'right',
                      fontWeight: 700,
                      fontSize: 14,
                      color: '#334050',
                      letterSpacing: -0.3,
                    },
                  ]}
                >
                  {rowData.total} {currency}
                </Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}

function ButtonGroup({ route }) {
  const { key } = route;
  const tabType = key === 'first' ? 'expense' : 'income';
  const tablesMockData = useContext(MockedDataContext);

  const [, storagedData] = useAsyncStorage('userCurrency');

  const [dateFilter, setDateFilter] = useState(null);
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

      function isSameDay(date1, date2) {
        function isDate(value) {
          return value instanceof Date;
        }
        // eslint-disable-next-line no-alert
        if (!isDate(date1) || !isDate(date2)) alert('Invalid date');

        return (
          date1.getFullYear() === date2.getFullYear() &&
          date1.getMonth() === date2.getMonth() &&
          date1.getDate() === date2.getDate()
        );
      }

      const transactionsData = await getTransactionsData();

      const mockedData = tablesMockData[tabType].map((element) => ({
        key: element.category + element.amount + element.date,
        type: element.type,
        category: element.category,
        date: element.date,
        amount: Number(element.amount.split(' ')[0]),
      }));

      const filteredData = dateFilter
        ? [...transactionsData, ...mockedData].filter((element) =>
            isSameDay(element.date, dateFilter)
          )
        : [...transactionsData, ...mockedData];
      const categoryData = getCategoryData(filteredData).map((element, index) => ({
        ...element,
        svg: { fill: getRandomHexColor() },
        key: index,
      }));

      setTableData(categoryData);
    }
    if (isFocused && tablesMockData[tabType]) getTableData();
  }, [isFocused, tablesMockData, tabType, dateFilter]);

  const renderButton = (label, buttonNumber) => {
    const isActive = buttonClicked === buttonNumber;
    const buttonStyles = [styles.buttonStyle, isActive && styles.activeButton];

    const handlePress = () => {
      setButtonClicked(buttonNumber);
      if (buttonNumber === 1 && dateFilter) setDateFilter(null);
    };

    return (
      <Button mode="contained" onPress={handlePress} style={buttonStyles}>
        <Text style={styles.buttonText}>{label}</Text>
      </Button>
    );
  };

  if (storagedData?.currency === undefined) return null;

  return (
    <View>
      <View
        style={{
          paddingTop: 30,
          paddingBottom: buttonClicked === 1 ? 30 : 20,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 40,
        }}
      >
        {renderButton('Mensual', 1)}
        {renderButton('Periodo', 2)}
      </View>

      <RenderContent
        buttonClicked={buttonClicked}
        tableData={tableData}
        currency={storagedData?.currency}
        setDateFilter={setDateFilter}
        dateFilter={dateFilter}
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
  setDateFilter: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  dateFilter: PropTypes.instanceOf(Date),
};

export default ButtonGroup;
