import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { formatDate } from './utils';

function DayTable({ tableData }) {
  const renderTableHeader = () => (
    <View style={styles.tableRow}>
      <Text style={[styles.tableCell, { flex: 1 }]}>Categoria</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Fecha</Text>
      <Text style={[styles.tableCell, { flex: 1 }]}>Cantidad</Text>
    </View>
  );

  const renderTableRow = () =>
    tableData.map((rowData) => (
      <View key={rowData.key} style={styles.tableRow}>
        <Text style={[styles.tableCell, { flex: 1 }]}>{rowData.category}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>{formatDate(rowData.date)}</Text>
        <Text style={[styles.tableCell, { flex: 1 }]}>{rowData.amount}</Text>
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
