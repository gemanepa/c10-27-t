import React from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';

import PropTypes from 'prop-types';
import styles from './styles';
import { formatDate, renderImage, useDetailsNavigation } from './utils';

function DayTable({ tableData, listOfCategories }) {
  const navigateToDetails = useDetailsNavigation();
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Categoria</Text>
      <Text style={[styles.tableHeaderCell]}>Fecha</Text>
      <Text style={[styles.tableHeaderCell]}>Cantidad</Text>
    </View>
  );

  const renderTableRow = () =>
    tableData.map((rowData) => (
      <TouchableOpacity
        key={rowData.key}
        style={styles.tableRow}
        onPress={() =>
          navigateToDetails(tableData, rowData.category, rowData.type, rowData.amount.split(' ')[1])
        }
      >
        {renderImage(listOfCategories[rowData.category])}

        <Text style={[styles.tableCell]}>{rowData.category}</Text>
        <Text style={[styles.tableCell]}>{formatDate(rowData.date)}</Text>
        <Text style={[styles.tableCell, { fontFamily: 'ubuntu-bold' }]}>{rowData.amount}</Text>
      </TouchableOpacity>
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
  listOfCategories: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default DayTable;
