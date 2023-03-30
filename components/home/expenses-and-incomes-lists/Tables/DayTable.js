import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import useAsyncStorage from '../../../../hooks/useAsyncStorage';
import { generateRandomTableData, formatDate } from './utils';
import styles from './styles';

function DayTable() {
  const [storageLoading, storagedData] = useAsyncStorage('userCurrency');
  if (storageLoading) return null;
  const { currency } = storagedData;

  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1 }]}>Categoria</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Fecha</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Cantidad</Text>
    </View>
  );

  const renderTableRow = () => {
    const tableData = generateRandomTableData(currency);
    return tableData.map((rowData) => (
      <View key={rowData.key} style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1 }]}>{rowData.category}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>{formatDate(rowData.date)}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>{rowData.amount}</Text>
      </View>
    ));
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

export default DayTable;
