import React, { useEffect, useState } from 'react';
import { ScrollView, View, StyleSheet, Text, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Searchbar, Button } from 'react-native-paper';

import PlusIcon from '../../../assets/categories/icons/PlusIcon.svg';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 20,
    gap: 40,
  },
  categoryContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-evenly',
  },
  itemContainer: {
    width: '25%'
    // width: `${width < 400 ? '25%' : 0}`,
  },
  item: {
    marginBottom: 10,
    // width: `${width < 400 ? '25%' : 76}`,
    width: 76,
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
    backgroundColor: '#d9d9d9',
    borderRadius: 50,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleItems: {
    fontSize: 12,
  },
  image: {
    width: 48,
    height: 48,
  },
});

export default function Categories({ navigation, route }) {
  // CategoryNameSelectedInStorage
  const { listOfCategories, CategoryNameSelectedInStorage } = route.params;
  const [itemsCategoriesCopy, setItemsCategoriesCopy] = useState(listOfCategories);

  const [selecdCategorie, setSelecdCategorie] = useState({});

  useEffect(() => {
    const init = async () => {
      const previusData =
        (await AsyncStorage.getItem(CategoryNameSelectedInStorage)) || JSON.stringify({ category: '' });
      const previusDataParse = JSON.parse(previusData);
      setSelecdCategorie(previusDataParse.category);
      setItemsCategoriesCopy(listOfCategories);
    };
    init();
  }, [CategoryNameSelectedInStorage, listOfCategories]);

  const changeSelectedCategorie = async (value) => {
    if (selecdCategorie.id !== value.id) {
      setSelecdCategorie(value);
      await AsyncStorage.setItem(
        CategoryNameSelectedInStorage,
        JSON.stringify({ type: 'Selected category', category: value })
      );
    } else {
      await AsyncStorage.setItem(
        CategoryNameSelectedInStorage,
        JSON.stringify({ category: {}, type: 'empty category selection' })
      );
      setSelecdCategorie({});
    }
    navigation.goBack();
  };

  const renderCategoriesItems = () => {
    const items = itemsCategoriesCopy.map((item) => (
      <View style={styles.itemContainer} key={item.id} >

        <View
          style={{
            ...styles.item,
            backgroundColor: `${item.id === selecdCategorie.id ? item.backgroundColor : 'transparent'}`,
          }}

        >
          {/* <Image source={item.image} style={styles.image} /> */}
          <View style={{ ...styles.imageItemContainer, backgroundColor: item.backgroundColor }} >
            <item.image />
          </View>
          <Text style={styles.titleItems} >
            {item.title}
          </Text>
          <Button
            mode="contained"
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              borderRadius: 10,
              backgroundColor: 'transparent',
            }}
            labelStyle={{ width: '100%', paddingVertical: `${width < 400 ? '20%' : '30%'}` }}
            onPress={() => changeSelectedCategorie(item)}
            theme={{
              colors: {
                primary: 'transparent',
                onPrimary: item.backgroundColor,
              },
            }}
          />
        </View>

      </View>
    ));
    return items;
  };

  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const founSearchQuery = [];
    for (let item = 0; item < listOfCategories.length; item += 1) {
      const titleItems = listOfCategories[item].title;
      if (titleItems.toUpperCase().includes(searchQuery.toUpperCase()) && searchQuery !== '') {
        founSearchQuery.push(listOfCategories[item]);
      }
    }
    if (searchQuery !== '') {
      setItemsCategoriesCopy(founSearchQuery);
    } else {
      setItemsCategoriesCopy(listOfCategories);
    }
  }, [searchQuery, listOfCategories]);

  return (
    <ScrollView>
      <View style={styles.container}>
        <Searchbar
          onChangeText={onChangeSearch}
          placeholder="Encuentra una categoría"
          style={{ paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10 }}
        />
        <View
          style={styles.categoryContainer}
        >
          {itemsCategoriesCopy && renderCategoriesItems()}

          <View style={styles.item}>
            <View style={{ ...styles.imageItemContainer, backgroundColor: '#FA6C17' }} >
              <PlusIcon />
            </View>
            <Text style={styles.titleItems}>Crear</Text>
            <Button
              mode="contained"
              style={{ position: 'absolute', height: '100%', width: '100%', borderRadius: 10 }}
              labelStyle={{ width: '100%', paddingVertical: `${width < 400 ? '20%' : '30%'}` }}
              onPress={() => navigation.navigate('CreateCategory')}
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
    </ScrollView>
  );
}

Categories.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func,
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      listOfCategories: PropTypes.arrayOf(
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
            PropTypes.func,
          ]),
        })
      ),
      CategoryNameSelectedInStorage: PropTypes.string,
    }),
  }).isRequired,
};
