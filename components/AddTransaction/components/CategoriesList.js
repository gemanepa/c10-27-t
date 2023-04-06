import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get('window')


const CategoriesStyles = StyleSheet.create({
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
    gap: 4
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
    borderRadius: 10
  },
  buttonItemLabel: {
    width: '100%',
    paddingVertical: `${width < 400 ? '20%' : '30%'}`
  },
  buttonItemTheme: {
    colors: {
      primary: 'transparent',
      onPrimary: 'black',
    },
  }
});

export default function CategoriesList({ params }) {

  const { navigation, changeSelectedCategorie, itemsCategories, selecdCategorie, nameTransaction } = params;

  const [itemsCategoriesCopy, setItemsCategoriesCopy] = useState([itemsCategories[0], itemsCategories[1], itemsCategories[2]])

  // /////// Features
  const renderCategoriesItems = () => {
    const items = itemsCategoriesCopy.map((item) => (
      <View
        style={{
          ...CategoriesStyles.item,
          backgroundColor: `${item.id === selecdCategorie ? '#d9d9d9' : 'transparent'}`,
        }}
        key={item.id}
      >
        <Image source={item.image} style={CategoriesStyles.imageItem} />
        <Text style={CategoriesStyles.titleItems} onPress={() => changeSelectedCategorie(item.id)}>
          {item.title}
        </Text>
        <Button
          mode="contained"
          style={CategoriesStyles.buttonItem}
          labelStyle={CategoriesStyles.buttonItemLabel}
          onPress={() => changeSelectedCategorie(item.id)}
          theme={CategoriesStyles.buttonItemTheme}
        />
      </View>
    ));
    return items;
  };

  //  Check if the category was changed
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const previusData = await AsyncStorage.getItem(`categorySelect${nameTransaction}`) || JSON.stringify({ category: '' });
      const previusDataParse = JSON.parse(previusData);
      if (selecdCategorie !== previusDataParse.category && previusDataParse.type) {
        const changeListCategories = itemsCategoriesCopy.filter(value => value.id !== previusDataParse.category);
        changeSelectedCategorie(previusDataParse.category);
        if (changeListCategories.length === 3) {
          changeListCategories.pop();
        }
        const FoundCategory = itemsCategories.filter(iem => iem.id === previusDataParse.category);
        changeListCategories.unshift(...FoundCategory)
        setItemsCategoriesCopy([...changeListCategories])
      }
      // setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count, selecdCategorie, nameTransaction, changeSelectedCategorie, itemsCategoriesCopy, itemsCategories]);

  return (
    <View style={CategoriesStyles.container}>
      <Button
        mode="contained"
        style={CategoriesStyles.buttonTitle}
        textColor="black"
        labelStyle={{ fontSize: 20 }}
      >
        Categorias
      </Button>

      <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {renderCategoriesItems()}

        <View style={CategoriesStyles.item}>
          <Image
            source={require('../../../assets/addTransactionIcons/Add.png')}
            style={{ width: 50, height: 50 }}
          />
          <Text
            style={CategoriesStyles.titleItems}
          >
            Mas
          </Text>

          <Button
            mode="contained"
            style={{ position: 'absolute', height: '100%', width: '100%', borderRadius: 10 }}
            labelStyle={{ width: '100%', paddingVertical: '30%' }}
            onPress={() => navigation.navigate('Categories', { itemsCategories, nameSelectCategoryStorage: `categorySelect${nameTransaction}` })}
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
        ]).isRequired,
      }).isRequired
    ).isRequired,
    selecdCategorie: PropTypes.oneOfType([
      PropTypes.any,
      PropTypes.number
    ]),
    nameTransaction: PropTypes.string
  }).isRequired,
};
