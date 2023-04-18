import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CategoriesExport from '../../../../assets/categories/categoriesExport';
import styles from './styles';

const { whiteListOfIcons } = CategoriesExport();

const formatDate = (date) => {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'short' });
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

const renderImage = (category = {}) => {
  const ImageSvg = category.image ? whiteListOfIcons[Number(category.image)] : <View />;
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

const useDetailsNavigation = () => {
  const navigation = useNavigation();
  const navigateToDetails = (tableData, category, type, currency) => {
    navigation.navigate('Details', {
      data: tableData
        .filter((item) => item.category === category)
        .map((row) => ({ ...row, date: row.date.toISOString() })),
      category,
      type,
      currency,
    });
  };
  return navigateToDetails;
};

export { formatDate, renderImage, useDetailsNavigation };
