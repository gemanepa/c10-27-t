// import React from "react";
import { useEffect, useState } from 'react';
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

export default function CategoriesExport() {

  const [ListOfExpenditureCategories, setListOfExpenditureCategories] = useState(false);
  const [ListOfRevenueCategories, setListOfRevenueCategories] = useState(false);



  useEffect(() => {
    const listOfExpenditureCategories = [
      { title: 'Salud', id: 1, image: HealthIcon, backgroundColor: '#03B263' },
      { title: 'Comida', id: 2, image: FoodIcon, backgroundColor: '#03B263' },
      { title: 'Educacion', id: 3, image: EducationIcon, backgroundColor: '#EFB841' },
      { title: 'Hogar', id: 4, image: HomeIcon, backgroundColor: '#EFB841' },
      { title: 'Transporte', id: 5, image: BusIcon, backgroundColor: '#03B263' },
      { title: 'Higiene', id: 6, image: HygieneIcon, backgroundColor: '#01B496' },
      { title: 'Ocio', id: 7, image: LeisureIcon, backgroundColor: '#01B496' },
      { title: 'Regalos', id: 8, image: GiftIcon, backgroundColor: '#01B496' },
      { title: 'Rutina', id: 9, image: GymIcon, backgroundColor: '#EFB841' },
      { title: 'Familia', id: 10, image: FamilyIcon, backgroundColor: '#01B496' },
    ]
    setListOfExpenditureCategories(listOfExpenditureCategories)

    const listOfRevenueCategories = [
      { title: 'Salario', id: 1, image: SalaryIcon, backgroundColor: '#EFB841' },
      { title: 'Interes', id: 2, image: InterestIcon, backgroundColor: '#03B263' },
      { title: 'Regalo', id: 3, image: GiftIcon, backgroundColor: '#01B496' },
      { title: 'Otros', id: 4, image: OtherIcon, backgroundColor: '#03B263' },
      { title: 'Negocio', id: 5, image: BusinessIcon, backgroundColor: '#03B263' },
    ]
    setListOfRevenueCategories(listOfRevenueCategories)

  }, []);

  const checkListOfExpenditureCategoriesInStorage = async () => {
    try {
      const listOfExpenditureCategoriesInStorage = await AsyncStorage.getItem('ListOfExpenditureCategories') || JSON.stringify([]);
      const listOfExpenditureCategoriesInStorageParse = JSON.parse(listOfExpenditureCategoriesInStorage);
      if (listOfExpenditureCategoriesInStorageParse === []) {
        return ListOfExpenditureCategories;
      };
      return listOfExpenditureCategoriesInStorageParse;
    } catch (error) {
      return Alert.alert('Advertencia', 'Hay un problema al querer obtener la lista de categorías ');
    };
  };

  const checkListOfRevenueCategoriesInStorage = async () => {
    try {
      const listOfExpenditureCategoriesInStorage = await AsyncStorage.getItem('ListOfExpenditureCategories') || JSON.stringify([]);
      const listOfExpenditureCategoriesInStorageParse = JSON.parse(listOfExpenditureCategoriesInStorage);
      if (listOfExpenditureCategoriesInStorageParse === []) {
        return ListOfExpenditureCategories;
      };
      return listOfExpenditureCategoriesInStorageParse;
    } catch (error) {
      return Alert.alert('Advertencia', 'Hay un problema al querer obtener la lista de categorías ');
    };
  };

  return { ListOfExpenditureCategories, checkListOfExpenditureCategoriesInStorage, ListOfRevenueCategories, checkListOfRevenueCategoriesInStorage }
};

