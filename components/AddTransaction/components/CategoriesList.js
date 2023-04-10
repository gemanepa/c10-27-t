import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import PlusIcon from '../../../assets/categories/icons/PlusIcon.svg';

const { width } = Dimensions.get('window');

const CategoriesListStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flexDirection: 'column',
    gap: 10,
  },
  buttonTitle: {
    backgroundColor: 'transparent',
  },

  item: {
    marginBottom: 10,
    width: `${width < 400 ? '25%' : 76}`,
    height: 71,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    gap: 4,
  },
  imageItemContainer: {
    width: 48,
    height: 48,
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageItem: {
    width: 48,
    height: 48,
  },
  titleItems: {
    fontSize: 12,
  },
  buttonItem: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    borderRadius: 10,
    // backgroundColor: 'transparent',
  },
  buttonItemLabel: {
    width: '100%',
    paddingVertical: `${width < 400 ? '20%' : '30%'}`,
  },
  buttonItemTheme: {
    primary: 'transparent',
    // onPrimary: 'black',
  },
});

export default function CategoriesList({ params }) {
  const { navigation, changeSelectedCategorie, listOfCategories, selectedCategory, nameTransaction } =
    params;


  const [itemsCategoriesCopy, setItemsCategoriesCopy] = useState(false);
  // /////// Features



  useEffect(() => {
    if (listOfCategories[0] && listOfCategories !== []) {
      setItemsCategoriesCopy([listOfCategories[0], listOfCategories[1], listOfCategories[2]]);
    };
  }, [listOfCategories]);


  const renderCategoriesItems = () => {
    const items = itemsCategoriesCopy.map((item) => (
      <View
        style={{
          ...CategoriesListStyles.item,
          backgroundColor: `${item.id === selectedCategory.id ? item.backgroundColor : 'transparent'}`,
        }}
        key={item.id}
      >
        {/* <Image source={item.image} style={CategoriesListStyles.imageItem} /> */}
        <View style={{ ...CategoriesListStyles.imageItemContainer, backgroundColor: item.backgroundColor }} >
          <item.image />
        </View>
        <Text style={CategoriesListStyles.titleItems} >
          {item.title}
        </Text>
        <Button
          mode="contained"
          style={CategoriesListStyles.buttonItem}
          labelStyle={CategoriesListStyles.buttonItemLabel}
          onPress={() => changeSelectedCategorie(item)}
          theme={{ colors: { ...CategoriesListStyles.buttonItemTheme, onPrimary: item.backgroundColor } }}
        />
      </View>
    ));
    return items;
  };

  //  Check if the category was changed
  // const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const previusData =
        (await AsyncStorage.getItem(`categorySelect${nameTransaction}`)) ||
        JSON.stringify({ category: '' });
      const previusDataParse = JSON.parse(previusData);
      if (selectedCategory.id !== previusDataParse.category.id && previusDataParse.type === 'Selected category') {

        const changeListCategories = itemsCategoriesCopy.filter(
          (value) => value.id !== previusDataParse.category.id
        );

        changeSelectedCategorie(previusDataParse.category);

        if (changeListCategories.length === 3) {
          changeListCategories.pop();
        }

        const FoundCategory = listOfCategories.filter((iem) => iem.id === previusDataParse.category.id);
        changeListCategories.unshift(...FoundCategory);
        setItemsCategoriesCopy([...changeListCategories]);

      } else if (previusDataParse.type === 'empty category selection') {
        changeSelectedCategorie({})
      }
      // setCount(count + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [
    // count,
    selectedCategory,
    nameTransaction,
    changeSelectedCategorie,
    itemsCategoriesCopy,
    listOfCategories,
  ]);

  return (
    <View style={CategoriesListStyles.container}>
      <Button
        mode="contained"
        style={CategoriesListStyles.buttonTitle}
        textColor="black"
        labelStyle={{ fontSize: 20 }}
      >
        Categorias
      </Button>

      <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {itemsCategoriesCopy &&
          renderCategoriesItems()
        }

        <View style={CategoriesListStyles.item}>
          <View style={{ ...CategoriesListStyles.imageItemContainer, backgroundColor: '#FA6C17' }} >
            <PlusIcon />
          </View>
          <Text style={CategoriesListStyles.titleItems}>Mas</Text>
          <Button
            mode="contained"
            style={{ position: 'absolute', height: '100%', width: '100%', borderRadius: 10 }}
            labelStyle={{ width: '100%', paddingVertical: '30%' }}
            onPress={() => !selectedCategory.id &&
              navigation.navigate('AddCategory', {
                listOfCategories,
                CategoryNameSelectedInStorage: `categorySelect${nameTransaction}`,
              })
            }
            theme={{
              colors: {
                primary: 'transparent',
                onPrimary: '#FA6C17',
              },
            }}
          />
        </View>
      </View>
    </View>
  );
}

CategoriesList.propTypes = {
  params: PropTypes.shape({
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
      goBack: PropTypes.func.isRequired,
      setOptions: PropTypes.func.isRequired,
    }).isRequired,
    changeSelectedCategorie: PropTypes.func,
    listOfCategories: PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        image: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.shape({
            uri: PropTypes.string.isRequired,
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
            scale: PropTypes.number,
            resizeMode: PropTypes.oneOf(['cover', 'contain', 'stretch', 'repeat', 'center']),
          }),
          PropTypes.any,
        ]).isRequired,
      }).isRequired,
      PropTypes.bool,
      PropTypes.any,
    ]).isRequired,
    selectedCategory: PropTypes.oneOfType([PropTypes.any, PropTypes.number]),
    nameTransaction: PropTypes.string,
  }).isRequired,
};
