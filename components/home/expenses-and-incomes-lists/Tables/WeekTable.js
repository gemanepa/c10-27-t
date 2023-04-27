import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import { renderImage, useDetailsNavigation } from './utils';
import rowArrow from '../../../../assets/home/tablerow-action-arrow.png';
function WeekTable({ tableData, listOfCategories }) {
  const navigateToDetails = useDetailsNavigation();
  const renderTableHeader = () => (
    <View style={styles.tableHeader}>
      <Text style={[styles.tableHeaderCell]}>Categoria</Text>
      <Text style={[styles.tableHeaderCell, { textAlign: 'right' }]}>Cantidad</Text>
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
      weekLabel = `${startOfMonth.getDate()} ${startOfMonth.toLocaleString('es-ES', {
        month: 'short',
      })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('es-ES', { month: 'short' })}`;
    } else if (endOfWeek > endOfMonth) {
      weekLabel = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('es-ES', {
        month: 'short',
      })} - ${endOfMonth.getDate()} ${endOfMonth.toLocaleString('es-ES', { month: 'short' })}`;
    } else {
      weekLabel = `${startOfWeek.getDate()} ${startOfWeek.toLocaleString('es-ES', {
        month: 'short',
      })} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleString('es-ES', { month: 'short' })}`;
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

  const renderTableRow = () => {
    const groupedData = groupByWeek(tableData);

    // Sort the keys in reverse order
    const sortedKeys = Object.keys(groupedData).sort((a, b) => new Date(b) - new Date(a));

    return sortedKeys.flatMap((week, i) => {
      const weekData = groupedData[week];
      const rows = weekData.map((rowData, j) => {
        const isFirstRow = j === 0;
        const isLastRow = j === weekData.length - 1;

        const getRowStyle = () => {
          if (isFirstRow) return styles.startingTableRow;
          if (isLastRow) return [styles.tableRow, styles.lastTableRow];
          return styles.tableRow;
        };
        return (
          <View key={rowData.key} style={getRowStyle()}>
            {j === 0 && (
              <View style={styles.label}>
                <Text style={styles.labelText}>{week}</Text>
              </View>
            )}
            <TouchableOpacity
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
              onPress={() =>
                navigateToDetails(
                  tableData,
                  rowData.category,
                  rowData.type,
                  rowData.amount.split(' ')[1]
                )
              }
            >
              <View style={[styles.tableCell, styles.categoryCell]}>
                {renderImage(listOfCategories[rowData.category])}
                <Text>{rowData.category}</Text>
              </View>
              <Text style={[styles.tableCell, styles.amountCell]}>
                {rowData.amount}
                <View style={styles.rowArrow}>
                  <Image source={rowArrow} />
                </View>
              </Text>
            </TouchableOpacity>
          </View>
        );
      });

      return [
        ...rows,
        i < sortedKeys.length - 1 && <View style={styles.separator} key={`separator-${i}`} />,
      ];
    });
  };

  return (
    <View style={styles.container}>
      {renderTableHeader()}
      <View style={styles.tableRowContainer}>{renderTableRow()}</View>
    </View>
  );
}

WeekTable.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  listOfCategories: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default WeekTable;
