import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import useAsyncStorage from '../../../../hooks/useAsyncStorage';
import { generateRandomTableData } from './utils';
import styles from './styles';

function MonthTable() {
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');
  if (storageLoading) return null;
  const { currency } = storagedData;

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1 }]}>Categoria</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Cantidad</Text>
    </View>
  );

  const getMonthLabel = (rowDate) => {
    const date = new Date(rowDate);
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const monthLabel = `${startOfMonth.toLocaleString('default', {
      month: 'short',
    })} ${startOfMonth.getFullYear()}`;
    return monthLabel;
  };

  const groupByMonth = (data) => {
    const groupedData = {};
    data.forEach((rowData) => {
      const month = getMonthLabel(rowData.date);
      if (!groupedData[month]) {
        groupedData[month] = [];
      }
      groupedData[month].push(rowData);
    });
    return groupedData;
  };

  const renderTableRow = () => {
    const tableData = generateRandomTableData(currency);
    const groupedData = groupByMonth(tableData);

    // Sort the keys in reverse order
    const sortedKeys = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

    return sortedKeys.flatMap((month, i) => {
      const monthData = groupedData[month];
      const rows = monthData.map((rowData, j) => (
        <View key={rowData.key} style={j === 0 ? styles.startingTableRow : styles.tableRow}>
          {j === 0 && (
            <View style={styles.label}>
              <Text style={styles.labelText}>{month}</Text>
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

export default MonthTable;
