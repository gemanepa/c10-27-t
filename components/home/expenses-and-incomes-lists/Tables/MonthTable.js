import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './styles';

import CategoriesExport from '../../../../assets/categories/categoriesExport';

const {
  whiteListOfIcons,
  checkListOfExpenditureCategoriesInStorage,
  checkListOfRevenueCategoriesInStorage,
} = CategoriesExport();

let listOfCategories = [];

const init = async () => {
  const listOfExpenditureCategories = await checkListOfExpenditureCategoriesInStorage();
  const listOfRevenueCategories = await checkListOfRevenueCategoriesInStorage();
  listOfCategories = await [...listOfExpenditureCategories, ...listOfRevenueCategories];
};
init();

function MonthTable({ tableData }) {
  const navigation = useNavigation();

  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Categoria</Text>
      <Text style={[styles.tableHeaderCell]}>Cantidad</Text>
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

  const renderImage = (titleCategory) => {
    const category = listOfCategories.filter((item) => item.title === titleCategory)[0];
    const ImageSvg = whiteListOfIcons[Number(category.image)];
    return (
      <View
        style={{
          ...styles.imageItemContainer,
          backgroundColor: `${category.backgroundColor ? category.backgroundColor : 'gray'}`,
        }}
      >
        <ImageSvg width={24} height={24} />
      </View>
    );
  };

  const renderTableRow = () => {
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
          {renderImage(rowData.category)}
          <Text
            style={[styles.tableCell]}
            onPress={() =>
              handleDetailsNavigation(rowData.category, rowData.type, rowData.amount.split(' ')[1])
            }
          >
            {rowData.category}
          </Text>
          <Text
            style={[styles.tableCell, { fontWeight: 700 }]}
            onPress={() =>
              handleDetailsNavigation(rowData.category, rowData.type, rowData.amount.split(' ')[1])
            }
          >
            {rowData.amount}
          </Text>
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

MonthTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MonthTable;
