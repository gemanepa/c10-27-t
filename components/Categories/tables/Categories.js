import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text, Image, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Searchbar, Button } from "react-native-paper";

const { width } = Dimensions.get('window')


const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 20,
    gap: 40
  },
  item: {
    marginBottom: 10,
    width: `${width < 400 ? '25%' : 76}`,
    // width: 76,
    height: 71,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
    gap: 4
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

  const { itemsCategories, nameSelectCategoryStorage } = route.params;
  const [itemsCategoriesCopy, setItemsCategoriesCopy] = useState(itemsCategories);


  const [selecdCategorie, setSelecdCategorie] = useState('');


  useEffect(() => {
    const init = async () => {
      const previusData = await AsyncStorage.getItem(nameSelectCategoryStorage) || JSON.stringify({ category: '' });
      const previusDataParse = JSON.parse(previusData);
      setSelecdCategorie(previusDataParse.category);
      setItemsCategoriesCopy(itemsCategories)
    };
    init()
  }, [nameSelectCategoryStorage, itemsCategories]);

  const changeSelectedCategorie = async (value) => {
    if (selecdCategorie !== value) {
      setSelecdCategorie(value);
      await AsyncStorage.setItem(nameSelectCategoryStorage, JSON.stringify({ type: 'string', category: value }));
    } else {
      setSelecdCategorie('');
      await AsyncStorage.setItem(nameSelectCategoryStorage, JSON.stringify({ type: 'string', category: '' }));

    }
  };

  const renderCategoriesItems = () => {
    const items = itemsCategoriesCopy.map((item) => (
      <View
        style={{
          ...styles.item,
          backgroundColor: `${item.id === selecdCategorie ? '#d9d9d9' : 'transparent'}`,
        }}
        key={item.id}
      >
        <Image source={item.image} style={styles.image} />
        <Text
          style={styles.titleItems}
          onPress={() => changeSelectedCategorie(item.id)}
        >
          {item.title}
        </Text>
        <Button
          mode="contained"
          style={{ position: 'absolute', height: '100%', width: '100%', borderRadius: 10, backgroundColor: 'transparent' }}
          labelStyle={{ width: '100%', paddingVertical: `${width < 400 ? '20%' : '30%'}` }}
          onPress={() => changeSelectedCategorie(item.id)}
          theme={{
            colors: {
              primary: 'transparent',
              onPrimary: 'black',
            },
          }}
        />
      </View>
    ));
    return items;
  };


  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = query => {
    setSearchQuery(query)
  };

  useEffect(() => {
    const founSearchQuery = []
    for (let item = 0; item < itemsCategories.length; item += 1) {
      const titleItems = itemsCategories[item].title
      if (titleItems.toUpperCase().includes(searchQuery.toUpperCase()) && searchQuery !== '') {
        founSearchQuery.push(itemsCategories[item]);
      }
    }
    if (searchQuery !== '') {
      setItemsCategoriesCopy(founSearchQuery)
    } else {
      setItemsCategoriesCopy(itemsCategories)
    }
  }, [searchQuery, itemsCategories]);



  return (
    <ScrollView>
      <View style={styles.container}>
        <Searchbar
          onChangeText={onChangeSearch}
          placeholder="Encuentra una categoría"
          style={{ paddingHorizontal: 10, marginHorizontal: 10, borderRadius: 10 }}
        />
        <View style={{
          width: '100%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly'
        }}>

          {itemsCategoriesCopy &&
            renderCategoriesItems()
          }



          <View style={styles.item} >
            <Image
              source={require('../../../assets/addTransactionIcons/Add.png')}
              style={styles.image}
            />
            <Text
              style={styles.titleItems}
            >
              Crear
            </Text>
            <Button
              mode="contained"
              style={{ position: 'absolute', height: '100%', width: '100%', borderRadius: 10 }}
              labelStyle={{ width: '100%', paddingVertical: `${width < 400 ? '20%' : '30%'}` }}
              onPress={() => console.log(width)}
              theme={{
                colors: {
                  primary: 'transparent',
                  onPrimary: 'black',
                },
              }}
            />
          </View>

        </View>



      </View>
    </ScrollView>
  );

};


Categories.propTypes = {

  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    setOptions: PropTypes.func
  }).isRequired,
  route: PropTypes.shape({
    params: PropTypes.shape({
      itemsCategories: PropTypes.arrayOf(
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
            PropTypes.any
          ])
        })
      ),
      nameSelectCategoryStorage: PropTypes.string,
    }),
  }).isRequired,
};
