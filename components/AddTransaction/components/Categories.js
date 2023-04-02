import { View, Text, Image, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import PropTypes from 'prop-types';
import { useRef } from 'react';

const CategoriesStyles = StyleSheet.create({
  container: {
    paddingLeft: '10%',
    paddingRight: '10%',
    flexDirection: 'column',
    gap: 10,
  },
  button: {
    backgroundColor: 'transparent',
  },

  item: {
    marginBottom: 10,
    width: '25%',
    height: 80,
    flexDirection: 'column',
    alignItems: 'center',
    position: 'relative',
    borderRadius: 10,
  },

  titleItems: {
    position: 'absolute',
    height: '100%',
    textAlignVertical: 'bottom',
    transform: [{ translateY: -10 }],
    // backgroundColor: 'black'
  },
});

export default function Categories({ params }) {
  const { changeSelectedCategorie, renderPickerItems, itemsCategories, selecdCategorie } = params;
  const pickerCategory = useRef();

  // /////// Features
  const renderCategoriesItems = () => {
    const items = itemsCategories.map((item) => (
      <View
        style={{
          ...CategoriesStyles.item,
          backgroundColor: `${item.id === selecdCategorie ? '#d9d9d9' : 'transparent'}`,
        }}
        key={item.id}
      >
        {/* <Image source={require('../../assets/addTransactionIcons/BTN_SaludHealthIcon.png')} style={{ width: 50, height: 50 }} /> */}
        <Image source={item.image} style={{ width: 50, height: 50 }} />
        <Text style={CategoriesStyles.titleItems} onPress={() => changeSelectedCategorie(item.id)}>
          {item.title}
        </Text>
      </View>
    ));
    return items;
  };

  function openCategory() {
    pickerCategory.current.focus();
  }

  return (
    <View style={CategoriesStyles.container}>
      <Button
        mode="contained"
        style={CategoriesStyles.button}
        textColor="black"
        labelStyle={{ fontSize: 20 }}
      >
        Categorias
      </Button>

      <View style={{ width: '100%', flexDirection: 'row', flexWrap: 'wrap' }}>
        {renderCategoriesItems()}

        <View style={CategoriesStyles.item}>
          {/* <Image source={require('../../assets/addTransactionIcons/BTN_SaludHealthIcon.png')} style={{ width: 50, height: 50 }} /> */}
          <Image
            source={require('../../../assets/addTransactionIcons/Add.png')}
            style={{ width: 50, height: 50 }}
          />
          <Text style={CategoriesStyles.titleItems} onPress={() => openCategory()}>
            Mas
          </Text>
        </View>

        <View style={{ opacity: 0 }}>
          <Picker
            // selectedValue={selectAccount}
            onValueChange={changeSelectedCategorie}
            ref={pickerCategory}
            style={{ borderBottomWidth: 1, borderColor: 'rgb(204, 204, 204)' }}
          >
            {renderPickerItems(itemsCategories)}
          </Picker>
        </View>
      </View>
    </View>
  );
}

Categories.propTypes = {
  params: PropTypes.shape({
    changeSelectedCategorie: PropTypes.func,
    renderPickerItems: PropTypes.func,
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
        ]).isRequired,
      }).isRequired
    ).isRequired,
    selecdCategorie: PropTypes.string,
  }).isRequired,
};
