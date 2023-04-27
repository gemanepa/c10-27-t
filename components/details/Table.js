import React from 'react';
import { StyleSheet, View, ScrollView, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import { formatDate } from '../home/expenses-and-incomes-lists/Tables/utils';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F6F6FD',
    flex: 1,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 10,
    paddingBottom: 16,
    backgroundColor: '#F6F6FD',
    paddingLeft: 56,
  },
  tableRowContainer: {
    flex: 1,
    paddingHorizontal: 26,
    backgroundColor: '#EFEEEE',
    minHeight: Dimensions.get('window').height / 1.5,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#99A3A4',
    paddingVertical: 20,
    backgroundColor: '#EFEEEE',
  },
  tableHeaderCell: {
    flex: 1,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#334050',
    textAlign: 'left',
  },
  tableCell: {
    flex: 1,
    fontSize: 14,
    color: '#334050',
    paddingLeft: 30,
    fontFamily: 'ubuntu-regular',
    textAlign: 'left',
  },
});

function DetailsTable({ tableData, currency }) {
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
        <View style={styles.tableRowContainer}>{renderTableRow()}</View>
      </View>
    </ScrollView>
  );
}

DetailsTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  currency: PropTypes.string.isRequired,
};

export default DetailsTable;
