import { useState, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import CategoriesExport from '../assets/categories/categoriesExport';

const { checkListOfExpenditureCategoriesInStorage, checkListOfRevenueCategoriesInStorage } =
  CategoriesExport();

const useCategories = () => {
  const [listOfCategories, setListOfCategories] = useState({});
  const isFocused = useIsFocused();

  useEffect(() => {
    async function init() {
      const listOfExpenditureCategories = await checkListOfExpenditureCategoriesInStorage();
      const listOfRevenueCategories = await checkListOfRevenueCategoriesInStorage();
      const toSingleObject = [...listOfExpenditureCategories, ...listOfRevenueCategories].reduce(
        (obj, item) => ({
          ...obj,
          [item.title]: item,
        }),
        {}
      );
      setListOfCategories(toSingleObject);
    }
    init();
  }, [isFocused]);

  return listOfCategories;
};

export default useCategories;
