import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import useAsyncStorage from '../../../../hooks/useAsyncStorage';
import { generateRandomTableData } from './utils';
import styles from './styles';

function WeekTable() {
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');
  if (storageLoading) return null;
  const { currency } = storagedData;

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1 }]}>Categoria</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Cantidad</Text>
    </View>
  );

  const getWeekLabel = (rowDate) => {
    const date = new Date(rowDate);
    const startOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 1
    );
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 7
    );
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let weekLabel = '';

    if (startOfWeek.getMonth() !== date.getMonth()) {
      weekLabel = `${startOfMonth.getDate()} ${startOfMonth.toLocaleString('default', {
        month: 'short',
      })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('default', { month: 'short' })}`;
    } else if (endOfWeek > endOfMonth) {
      weekLabel = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('default', {
        month: 'short',
      })} - ${endOfMonth.getDate()} ${endOfMonth.toLocaleString('default', { month: 'short' })}`;
    } else {
      weekLabel = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('default', {
        month: 'short',
      })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('default', { month: 'short' })}`;
    }

    return weekLabel;
  };

  const groupByWeek = (data) => {
    const groupedData = {};
    data.forEach((rowData) => {
      const week = getWeekLabel(rowData.date);
      if (!groupedData[week]) {
        groupedData[week] = [];
      }
      groupedData[week].push(rowData);
    });
    return groupedData;
  };

  const renderTableRow = () => {
    const tableData = generateRandomTableData(currency);
    const groupedData = groupByWeek(tableData);

    // Sort the keys in reverse order
    const sortedKeys = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

    return sortedKeys.flatMap((week, i) => {
      const weekData = groupedData[week];
      const rows = weekData.map((rowData, j) => (
        <View key={rowData.key} style={j === 0 ? styles.startingTableRow : styles.tableRow}>
          {j === 0 && (
            <View style={styles.label}>
              <Text style={styles.LabelText}>{week}</Text>
            </View>
          )}
          <Text style={[styles.tableCell, { flex: 1 }]}>{rowData.category}</Text>
          <Text style={[styles.tableCell, { flex: 1 }]}>{rowData.amount}</Text>
        </View>
      ));

      return [
        ...rows,
        i < sortedKeys.length - 1 && <View style={styles.separator} key={`separator-${i}`} />,
      ];
    });
  };

  return (
    <ScrollView contentContainerStyle={{ minHeight: 500 }}>
      <View style={styles.container}>
        {renderTableHeader()}
        {renderTableRow()}
      </View>
    </ScrollView>
  );
}

export default WeekTable;
