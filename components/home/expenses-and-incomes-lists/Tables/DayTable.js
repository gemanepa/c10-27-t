import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { formatDate } from './utils';

function DayTable({ tableData }) {
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Categoria</Text>
      <Text style={[styles.tableHeaderCell]}>Fecha</Text>
      <Text style={[styles.tableHeaderCell]}>Cantidad</Text>
    </View>
  );

  const renderTableRow = () =>
    tableData.map((rowData) => (
      <View key={rowData.key} style={styles.tableRow}>
        <Text style={[styles.tableCell]}>{rowData.category}</Text>
        <Text style={[styles.tableCell]}>{formatDate(rowData.date)}</Text>
        <Text style={[styles.tableCell, { fontWeight: 700 }]}>{rowData.amount}</Text>
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
