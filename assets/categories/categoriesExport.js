// import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import HealthIcon from './icons/HealthIcon.svg';
import FoodIcon from './icons/FoodIcon.svg';
import EducationIcon from './icons/EducationIcon.svg';
import HomeIcon from './icons/HomeIcon.svg';
import BusIcon from './icons/BusIcon.svg';
import HygieneIcon from './icons/HygieneIcon.svg';
import LeisureIcon from './icons/LeisureIcon.svg';
import GiftIcon from './icons/GiftIcon.svg';
import GymIcon from './icons/GymIcon.svg';
import FamilyIcon from './icons/FamilyIcon.svg';

import SalaryIcon from './icons/SalaryIcon.svg';
import InterestIcon from './icons/InterestIcon.svg';
import OtherIcon from './icons/OtherIcon.svg';
import BusinessIcon from './icons/BusinessIcon.svg';

const ListOfIcons =
{
  '0': HealthIcon,
  '1': FoodIcon,
  '2': EducationIcon,
  '3': HomeIcon,
  '4': BusIcon,
  '5': HygieneIcon,
  '6': LeisureIcon,
  '7': GiftIcon,
  '8': GymIcon,
  '19': FamilyIcon,
  '10': SalaryIcon,
  '11': InterestIcon,
  '12': GiftIcon,
  '13': OtherIcon,
  '14': BusinessIcon,
}


const ListOfExpenditureCategories = [
  { title: 'Salud', id: 1, image: '0', backgroundColor: '#03B263' },
  { title: 'Comida', id: 2, image: '1', backgroundColor: '#03B263' },
  { title: 'Educacion', id: 3, image: '2', backgroundColor: '#EFB841' },
  { title: 'Hogar', id: 4, image: '3', backgroundColor: '#EFB841' },
  { title: 'Transporte', id: 5, image: '4', backgroundColor: '#03B263' },
  { title: 'Higiene', id: 6, image: '5', backgroundColor: '#01B496' },
  { title: 'Ocio', id: 7, image: '6', backgroundColor: '#01B496' },
  { title: 'Regalos', id: 8, image: '7', backgroundColor: '#01B496' },
  { title: 'Rutina', id: 9, image: '8', backgroundColor: '#EFB841' },
  { title: 'Familia', id: 10, image: '9', backgroundColor: '#01B496' },
]

const ListOfRevenueCategories = [
  { title: 'Salario', id: 1, image: '10', backgroundColor: '#EFB841' },
  { title: 'Interes', id: 2, image: '11', backgroundColor: '#03B263' },
  { title: 'Regalo', id: 3, image: '12', backgroundColor: '#01B496' },
  { title: 'Otros', id: 4, image: '13', backgroundColor: '#03B263' },
  { title: 'Negocio', id: 5, image: '14', backgroundColor: '#03B263' },
]

export default function CategoriesExport() {


  const checkListOfExpenditureCategoriesInStorage = async () => {
    try {
      const listOfExpenditureCategoriesInStorage = await AsyncStorage.getItem('ListOfExpenditureCategories') || false;
      const listOfExpenditureCategoriesInStorageParse = listOfExpenditureCategoriesInStorage ? JSON.parse(listOfExpenditureCategoriesInStorage) : false;
      if (!listOfExpenditureCategoriesInStorageParse) {
        await AsyncStorage.setItem('ListOfExpenditureCategories', JSON.stringify(ListOfExpenditureCategories))
        return ListOfExpenditureCategories;
      };
      return ListOfExpenditureCategories;
      // return listOfExpenditureCategoriesInStorageParse;
    } catch (error) {
      return Alert.alert('Advertencia', 'Hay un problema al querer obtener la lista de categorías ');
    };
  };

  const checkListOfRevenueCategoriesInStorage = async () => {
    try {
      const listOfRevenueCategoriesInStorage = await AsyncStorage.getItem('ListOfRevenueCategories') || false;
      const listOfRevenueCategoriesInStorageParse = listOfRevenueCategoriesInStorage ? JSON.parse(listOfRevenueCategoriesInStorage) : false;
      // console.log(listOfRevenueCategoriesInStorageParse); // hay que ver lo de guardado, hacer una lista aparte que contenga lo que es las imagenes
      if (!listOfRevenueCategoriesInStorageParse) {
        await AsyncStorage.setItem('ListOfRevenueCategories', JSON.stringify(ListOfRevenueCategories))
        return ListOfRevenueCategories;
      }
      return ListOfRevenueCategories;
      // return listOfRevenueCategoriesInStorageParse;
    } catch (error) {
      Alert.alert('Advertencia', 'Hay un problema al querer obtener la lista de categorías ');
      return { categories: ListOfRevenueCategories, isStorageAvailable: false };
    };
  };

  return { ListOfExpenditureCategories, checkListOfExpenditureCategoriesInStorage, ListOfRevenueCategories, checkListOfRevenueCategoriesInStorage, ListOfIcons }
};

