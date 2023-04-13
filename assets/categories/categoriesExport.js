// import React from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

import blackHealthIcon from './icons/blackIcons/BTN_Salud.svg';
import blackFoodIcon from './icons/blackIcons/BTN_ALIMENTACION.svg';
import blackEducationIcon from './icons/blackIcons/BtnEducacion.svg';
import blackHomeIcon from './icons/blackIcons/BtnHogar.svg';
import blackBusIcon from './icons/blackIcons/BTN_BUS.svg';
import blackHygieneIcon from './icons/blackIcons/BtnHigiene.svg';
import blackLeisureIcon from './icons/blackIcons/BTN_OCIO.svg';
import blackGiftIcon from './icons/blackIcons/BtnRegalo.svg';
import blackGymIcon from './icons/blackIcons/BtnGym.svg';
import blackFamilyIcon from './icons/blackIcons/BtnFamilia.svg';

import blackSalaryIcon from './icons/blackIcons/BtnSalario.svg';
import blackInterestIcon from './icons/blackIcons/IconInteres.svg';
import blackOtherIcon from './icons/blackIcons/BtnOtros.svg';
import blackBusinessIcon from './icons/blackIcons/BtnNegocio.svg';

import blackPigIcon from './icons/blackIcons/Property 1=Btn.svg';
import blackMathematicalSymbolsIcon from './icons/blackIcons/Property 1=Btn-1.svg';
import blackMonumentIcon from './icons/blackIcons/Property 1=Btn-2.svg';
import blackRateIcon from './icons/blackIcons/Property 1=Btn-3.svg';
import blackPizzaIcon from './icons/blackIcons/Property 1=Btn-5.svg';
import blackFastFood from './icons/blackIcons/Property 1=Btn-6.svg';
import blackHamburgerIcon from './icons/blackIcons/Property 1=Btn-7.svg';
import blackCardIcon from './icons/blackIcons/Property 1=Btn-4.svg';
import blackSuitcaseIcon from './icons/blackIcons/Property 1=Btn-9.svg';
import blackTruckIcon from './icons/blackIcons/Property 1=Btn-8.svg';
import blackShoppingCartIcon from './icons/blackIcons/Property 1=Btn-10.svg';
import blackGameControlIcon from './icons/blackIcons/Property 1=Btn-11.svg';
import blackCarIcon from './icons/blackIcons/Property 1=Btn-12.svg';
import blackCakeIcon from './icons/blackIcons/Property 1=Btn-15.svg';
import blackLaptopAndCellPhone from './icons/blackIcons/Property 1=Btn-13.svg';
import blackBroomIcon from './icons/blackIcons/Property 1=Btn-14.svg';

import whiteHealthIcon from './icons/whiteIcons/BTN_Salud.svg';
import whiteFoodIcon from './icons/whiteIcons/BTN_ALIMENTACION.svg';
import whiteEducationIcon from './icons/whiteIcons/BtnEducacion.svg';
import whiteHomeIcon from './icons/whiteIcons/BtnHogar.svg';
import whiteBusIcon from './icons/whiteIcons/BTN_BUS.svg';
import whiteHygieneIcon from './icons/whiteIcons/BtnHigiene.svg';
import whiteLeisureIcon from './icons/whiteIcons/BTN_OCIO.svg';
import whiteGiftIcon from './icons/whiteIcons/BtnRegalo.svg';
import whiteGymIcon from './icons/whiteIcons/BtnGym.svg';
import whiteFamilyIcon from './icons/whiteIcons/BtnFamilia.svg';

import whiteSalaryIcon from './icons/whiteIcons/BtnSalario.svg';
import whiteInterestIcon from './icons/whiteIcons/IconInteres.svg';
import whiteOtherIcon from './icons/whiteIcons/BtnOtros.svg';
import whiteBusinessIcon from './icons/whiteIcons/BtnNegocio.svg';

import whitePigIcon from './icons/whiteIcons/Property 1=Btn.svg';
import whiteMathematicalSymbolsIcon from './icons/whiteIcons/Property 1=Btn-1.svg';
import whiteMonumentIcon from './icons/whiteIcons/Property 1=Btn-2.svg';
import whiteRateIcon from './icons/whiteIcons/Property 1=Btn-3.svg';
import whitePizzaIcon from './icons/whiteIcons/Property 1=Btn-5.svg';
import whiteFastFood from './icons/whiteIcons/Property 1=Btn-6.svg';
import whiteHamburgerIcon from './icons/whiteIcons/Property 1=Btn-7.svg';
import whiteCardIcon from './icons/whiteIcons/Property 1=Btn-4.svg';
import whiteSuitcaseIcon from './icons/whiteIcons/Property 1=Btn-9.svg';
import whiteTruckIcon from './icons/whiteIcons/Property 1=Btn-8.svg';
import whiteShoppingCartIcon from './icons/whiteIcons/Property 1=Btn-10.svg';
import whiteGameControlIcon from './icons/whiteIcons/Property 1=Btn-11.svg';
import whiteCarIcon from './icons/whiteIcons/Property 1=Btn-12.svg';
import whiteCakeIcon from './icons/whiteIcons/Property 1=Btn-15.svg';
import whiteLaptopAndCellPhone from './icons/whiteIcons/Property 1=Btn-13.svg';
import whiteBroomIcon from './icons/whiteIcons/Property 1=Btn-14.svg';

const blackListOfIcons = {
  0: blackHealthIcon,
  1: blackFoodIcon,
  2: blackEducationIcon,
  3: blackHomeIcon,
  4: blackBusIcon,
  5: blackHygieneIcon,
  6: blackLeisureIcon,
  7: blackGiftIcon,
  8: blackGymIcon,
  9: blackFamilyIcon,
  10: blackSalaryIcon,
  11: blackInterestIcon,
  12: blackGiftIcon,
  13: blackOtherIcon,
  14: blackBusinessIcon,
  15: blackPigIcon,
  16: blackMathematicalSymbolsIcon,
  17: blackMonumentIcon,
  18: blackRateIcon,
  19: blackPizzaIcon,
  20: blackFastFood,
  21: blackHamburgerIcon,
  22: blackCardIcon,
  23: blackSuitcaseIcon,
  24: blackTruckIcon,
  25: blackShoppingCartIcon,
  26: blackGameControlIcon,
  27: blackCarIcon,
  28: blackCakeIcon,
  29: blackLaptopAndCellPhone,
  30: blackBroomIcon,
};

const whiteListOfIcons = {
  0: whiteHealthIcon,
  1: whiteFoodIcon,
  2: whiteEducationIcon,
  3: whiteHomeIcon,
  4: whiteBusIcon,
  5: whiteHygieneIcon,
  6: whiteLeisureIcon,
  7: whiteGiftIcon,
  8: whiteGymIcon,
  9: whiteFamilyIcon,
  10: whiteSalaryIcon,
  11: whiteInterestIcon,
  12: whiteGiftIcon,
  13: whiteOtherIcon,
  14: whiteBusinessIcon,
  15: whitePigIcon,
  16: whiteMathematicalSymbolsIcon,
  17: whiteMonumentIcon,
  18: whiteRateIcon,
  19: whitePizzaIcon,
  20: whiteFastFood,
  21: whiteHamburgerIcon,
  22: whiteCardIcon,
  23: whiteSuitcaseIcon,
  24: whiteTruckIcon,
  25: whiteShoppingCartIcon,
  26: whiteGameControlIcon,
  27: whiteCarIcon,
  28: whiteCakeIcon,
  29: whiteLaptopAndCellPhone,
  30: whiteBroomIcon,
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
    blackListOfIcons,
    whiteListOfIcons,
    CreateCategoryList,
  };
}
