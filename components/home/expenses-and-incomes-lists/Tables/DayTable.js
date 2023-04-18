import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import styles from './styles';
import { formatDate } from './utils';
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

// console.log(listOfExpenditureCategories === JSON.stringify([]));

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

  const renderTableRow = () =>
    tableData.map((rowData) => (
      <View key={rowData.key} style={styles.tableRow}>
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
