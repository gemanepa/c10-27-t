// import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import HealthIcon from './CATEGORIAS/ICONOS NEGROS/BTN_Salud.svg';
import FoodIcon from './CATEGORIAS/ICONOS NEGROS/BTN_ALIMENTACION.svg';
import EducationIcon from './CATEGORIAS/ICONOS NEGROS/BtnEducacion.svg';
import HomeIcon from './CATEGORIAS/ICONOS NEGROS/BtnHogar.svg';
import BusIcon from './CATEGORIAS/ICONOS NEGROS/BTN_BUS.svg';
import HygieneIcon from './CATEGORIAS/ICONOS NEGROS/BtnHigiene.svg';
import LeisureIcon from './CATEGORIAS/ICONOS NEGROS/BTN_OCIO.svg';
import GiftIcon from './CATEGORIAS/ICONOS NEGROS/BtnRegalo.svg';
import GymIcon from './CATEGORIAS/ICONOS NEGROS/BtnGym.svg';
import FamilyIcon from './CATEGORIAS/ICONOS NEGROS/BtnFamilia.svg';

import SalaryIcon from './CATEGORIAS/ICONOS NEGROS/BtnSalario.svg';
import InterestIcon from './CATEGORIAS/ICONOS NEGROS/IconInteres.svg';
import OtherIcon from './CATEGORIAS/ICONOS NEGROS/BtnOtros.svg';
import BusinessIcon from './CATEGORIAS/ICONOS NEGROS/BtnNegocio.svg';

import PigIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn.svg';
import MathematicalSymbolsIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-1.svg';
import MonumentIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-2.svg';
import RateIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-3.svg';
import PizzaIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-5.svg';
import FastFood from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-6.svg';
import HamburgerIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-7.svg';
import CardIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-4.svg';
import SuitcaseIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-9.svg';
import TruckIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-8.svg';
import ShoppingCartIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-10.svg';
import GameControlIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-11.svg';
import CarIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-12.svg';
import CakeIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-15.svg';
import LaptopAndCellPhone from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-13.svg';
import BroomIcon from './CATEGORIAS/ICONOS NEGROS/Property 1=Btn-14.svg';

const ListOfIcons = {
  0: HealthIcon,
  1: FoodIcon,
  2: EducationIcon,
  3: HomeIcon,
  4: BusIcon,
  5: HygieneIcon,
  6: LeisureIcon,
  7: GiftIcon,
  8: GymIcon,
  9: FamilyIcon,
  10: SalaryIcon,
  11: InterestIcon,
  12: GiftIcon,
  13: OtherIcon,
  14: BusinessIcon,
  15: PigIcon,
  16: MathematicalSymbolsIcon,
  17: MonumentIcon,
  18: RateIcon,
  19: PizzaIcon,
  20: FastFood,
  21: HamburgerIcon,
  22: CardIcon,
  23: SuitcaseIcon,
  24: TruckIcon,
  25: ShoppingCartIcon,
  26: GameControlIcon,
  27: CarIcon,
  28: CakeIcon,
  29: LaptopAndCellPhone,
  30: BroomIcon,
};

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
];

const ListOfRevenueCategories = [
  { title: 'Salario', id: 1, image: '10', backgroundColor: '#EFB841' },
  { title: 'Interes', id: 2, image: '11', backgroundColor: '#03B263' },
  { title: 'Regalo', id: 3, image: '12', backgroundColor: '#01B496' },
  { title: 'Otros', id: 4, image: '13', backgroundColor: '#03B263' },
  { title: 'Negocio', id: 5, image: '14', backgroundColor: '#03B263' },
];

const CreateCategoryList = [
  { image: '15' },
  { image: '16' },
  { image: '17' },
  { image: '18' },
  { image: '19' },
  { image: '20' },
  { image: '21' },
  { image: '22' },
  { image: '23' },
  { image: '24' },
  { image: '25' },
  { image: '26' },
  { image: '27' },
  { image: '28' },
  { image: '29' },
  { image: '30' },
];

export default function CategoriesExport() {
  const checkListOfExpenditureCategoriesInStorage = async () => {
    try {
      const listOfExpenditureCategoriesInStorage =
        (await AsyncStorage.getItem('ListOfExpenditureCategories')) || false;
      const listOfExpenditureCategoriesInStorageParse = listOfExpenditureCategoriesInStorage
        ? JSON.parse(listOfExpenditureCategoriesInStorage)
        : false;
      if (!listOfExpenditureCategoriesInStorageParse) {
        await AsyncStorage.setItem(
          'ListOfExpenditureCategories',
          JSON.stringify(ListOfExpenditureCategories)
        );
        return ListOfExpenditureCategories;
      }
      return listOfExpenditureCategoriesInStorageParse;
    } catch (error) {
      return Alert.alert(
        'Advertencia',
        'Hay un problema al querer obtener la lista de categorías '
      );
    }
  };
  const resetListOfExpenditureCategoriesInStorage = async () => {
    try {
      await AsyncStorage.setItem(
        'ListOfExpenditureCategories',
        JSON.stringify(ListOfExpenditureCategories)
      );
      return ListOfExpenditureCategories;
    } catch (error) {
      Alert.alert('Advertencia', 'Hay un problema al querer restablecer la lista');
      return ListOfExpenditureCategories;
    }
  };
  const AddCategoryExpenditureInStorage = async (category) => {
    try {
      const listOfExpenditureCategoriesInStorage =
        (await AsyncStorage.getItem('ListOfExpenditureCategories')) || false;
      const listOfExpenditureCategoriesInStorageParse = listOfExpenditureCategoriesInStorage
        ? JSON.parse(listOfExpenditureCategoriesInStorage)
        : false;
      if (listOfExpenditureCategoriesInStorageParse) {
        const update = [...listOfExpenditureCategoriesInStorageParse, category];
        await AsyncStorage.setItem('ListOfExpenditureCategories', JSON.stringify(update));
        return update;
      }
      Alert.alert('Advertencia', 'Hay un problema al querer agregar la categoría a la lista');
      return ListOfExpenditureCategories;
    } catch (error) {
      Alert.alert('Advertencia', 'Hay un problema al querer agregar la categoría');
      return ListOfExpenditureCategories;
    }
  };

  const checkListOfRevenueCategoriesInStorage = async () => {
    try {
      const listOfRevenueCategoriesInStorage =
        (await AsyncStorage.getItem('ListOfRevenueCategories')) || false;
      const listOfRevenueCategoriesInStorageParse = listOfRevenueCategoriesInStorage
        ? JSON.parse(listOfRevenueCategoriesInStorage)
        : false;
      // console.log(listOfRevenueCategoriesInStorageParse); // hay que ver lo de guardado, hacer una lista aparte que contenga lo que es las imagenes
      if (!listOfRevenueCategoriesInStorageParse) {
        await AsyncStorage.setItem(
          'ListOfRevenueCategories',
          JSON.stringify(ListOfRevenueCategories)
        );
        return ListOfRevenueCategories;
      }
      return listOfRevenueCategoriesInStorageParse;
    } catch (error) {
      Alert.alert('Advertencia', 'Hay un problema al querer obtener la lista de categorías ');
      return ListOfRevenueCategories;
    }
  };
  const resetListOfRevenueCategoriesInStorage = async () => {
    try {
      await AsyncStorage.setItem(
        'ListOfRevenueCategories',
        JSON.stringify(ListOfRevenueCategories)
      );
      return ListOfRevenueCategories;
    } catch (error) {
      Alert.alert('Advertencia', 'Hay un problema al querer obtener la lista de categorías ');
      return ListOfRevenueCategories;
    }
  };

  const AddCategoryRevenueInStorage = async (category) => {
    try {
      const listOfRevenueCategoriesInStorage =
        (await AsyncStorage.getItem('ListOfRevenueCategories')) || false;
      const listOfRevenueCategoriesInStorageParse = listOfRevenueCategoriesInStorage
        ? JSON.parse(listOfRevenueCategoriesInStorage)
        : false;
      if (listOfRevenueCategoriesInStorageParse) {
        const update = [...listOfRevenueCategoriesInStorageParse, category];
        await AsyncStorage.setItem('ListOfRevenueCategories', JSON.stringify(update));
        return update;
      }
      Alert.alert('Advertencia', 'Hay un problema al querer agregar la categoría a la lista');
      return ListOfRevenueCategories;
    } catch (error) {
      Alert.alert('Advertencia', 'Hay un problema al querer agregar la categoría');
      return ListOfRevenueCategories;
    }
  };

  return {
    ListOfExpenditureCategories,
    checkListOfExpenditureCategoriesInStorage,
    resetListOfExpenditureCategoriesInStorage,
    AddCategoryExpenditureInStorage,
    ListOfRevenueCategories,
    checkListOfRevenueCategoriesInStorage,
    resetListOfRevenueCategoriesInStorage,
    AddCategoryRevenueInStorage,
    ListOfIcons,
    CreateCategoryList,
  };
}
