import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './styles';
import { formatDate } from './utils';

function DayTable({ tableData }) {
  const navigation = useNavigation();
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Categoria</Text>
      <Text style={[styles.tableHeaderCell]}>Fecha</Text>
      <Text style={[styles.tableHeaderCell]}>Cantidad</Text>
    </View>
  );

  const handleDetailsNavigation = (category, type, currency) => {
    navigation.navigate('Details', {
      data: tableData
        .filter((item) => item.category === category)
        .map((row) => ({ ...row, date: row.date.toISOString() })),
      category,
      type,
      currency,
    });
  };

  const renderTableRow = () =>
    tableData.map((rowData) => (
      <View key={rowData.key} style={styles.tableRow}>
        <Text
          style={[styles.tableCell]}
          onPress={() =>
            handleDetailsNavigation(rowData.category, rowData.type, rowData.amount.split(' ')[1])
          }
        >
          {rowData.category}
        </Text>
        <Text
          style={[styles.tableCell]}
          onPress={() =>
            handleDetailsNavigation(rowData.category, rowData.type, rowData.amount.split(' ')[1])
          }
        >
          {formatDate(rowData.date)}
        </Text>
        <Text
          style={[styles.tableCell, { fontFamily: 'ubuntu-bold' }]}
          onPress={() =>
            handleDetailsNavigation(rowData.category, rowData.type, rowData.amount.split(' ')[1])
          }
        >
          {rowData.amount}
        </Text>
      </View>
    ));

  return (
    <ScrollView contentContainerStyle={{ minHeight: 500 }}>
      <View style={styles.container}>
        {renderTableHeader()}
        {renderTableRow()}
      </View>
    </ScrollView>
  );
}

DayTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DayTable;
