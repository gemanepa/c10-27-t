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

function WeekTable({ tableData }) {
  const navigation = useNavigation();
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Categoria</Text>
      <Text style={[styles.tableHeaderCell]}>Cantidad</Text>
    </View>
  );

  const getWeekLabel = (rowDate) => {
    const date = new Date(rowDate);
    const startOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 1
    );
    const endOfWeek = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() - date.getDay() + 7
    );
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    let weekLabel = '';

    if (startOfWeek.getMonth() !== date.getMonth()) {
      weekLabel = `${startOfMonth.getDate()} ${startOfMonth.toLocaleString('default', {
        month: 'short',
      })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('default', { month: 'short' })}`;
    } else if (endOfWeek > endOfMonth) {
      weekLabel = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('default', {
        month: 'short',
      })} - ${endOfMonth.getDate()} ${endOfMonth.toLocaleString('default', { month: 'short' })}`;
    } else {
      weekLabel = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('default', {
        month: 'short',
      })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('default', { month: 'short' })}`;
    }

    return weekLabel;
  };

  const groupByWeek = (data) => {
    const groupedData = {};
    data.forEach((rowData) => {
      const week = getWeekLabel(rowData.date);
      if (!groupedData[week]) {
        groupedData[week] = [];
      }
      groupedData[week].push(rowData);
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
    const groupedData = groupByWeek(tableData);

    // Sort the keys in reverse order
    const sortedKeys = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

    return sortedKeys.flatMap((week, i) => {
      const weekData = groupedData[week];
      const rows = weekData.map((rowData, j) => (
        <View
          key={rowData.key}
          style={j === 0 ? styles.startingTableRow : styles.tableRow}
          onPress={() =>
            handleDetailsNavigation(rowData.category, rowData.type, rowData.amount.split(' ')[1])
          }
        >
          {j === 0 && (
            <View style={styles.label}>
              <Text style={styles.LabelText}>{week}</Text>
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

WeekTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default WeekTable;
