import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from '../home/expenses-and-incomes-lists/Tables/styles';
import { formatDate } from '../home/expenses-and-incomes-lists/Tables/utils';

function DayTable({ tableData, currency }) {
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Concepto</Text>
      <Text style={[styles.tableHeaderCell]}>Fecha</Text>
      <Text style={[styles.tableHeaderCell]}>Cantidad</Text>
    </View>
  );

  const renderTableRow = () =>
    tableData.map((rowData, index) => {
      const isLastItem = index === tableData.length - 1;
      return (
        <View key={rowData.key} style={[styles.tableRow, isLastItem && { borderBottomWidth: 0 }]}>
          <Text style={[styles.tableCell]}>{rowData.concept}</Text>
          <Text style={[styles.tableCell]}>{formatDate(rowData.date)}</Text>
          <Text style={[styles.tableCell, { fontFamily: 'ubuntu-bold' }]}>
            {rowData.amount} {currency}
          </Text>
        </View>
      );
    });

  return (
    <ScrollView>
      <View style={styles.container}>
        {renderTableHeader()}
        <View style={{ flex: 1, backgroundColor: '#EFEEEE', minHeight: 600 }}>
          {renderTableRow()}
        </View>
      </View>
    </ScrollView>
  );
}

DayTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default DayTable;
