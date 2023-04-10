import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text } from 'react-native';

const CreateCategoryStyles = StyleSheet.create({
  parentContainer: {
    paddingHorizontal: '5%',
    flexDirection: 'column',
    gap: 40,
    paddingVertical: 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerCategoryName: {
    width: '100%',
    flexDirection: 'column',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputCategoryName: {
    width: '100%',
    height: 60,
    borderColor: '#334050',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    backgroundColor: '#FEFFFF',
  },
  containerSelectAnIcon: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
export default function CreateCategory() {

  const [categoryName, setCategoryName] = useState('');
  const changeCategoryName = (value) => {
    setCategoryName(value)
  }
  return (
    <View style={CreateCategoryStyles.parentContainer}>
      <View style={CreateCategoryStyles.containerCategoryName} >
        <Text style={{ fontSize: 18 }} >Nombre de categoría</Text>
        <TextInput
          placeholder=""
          style={CreateCategoryStyles.inputCategoryName}
          value={categoryName}
          onChangeText={changeCategoryName}
        />
      </View>

      <View style={CreateCategoryStyles.containerSelectAnIcon} >
        <Text>
          Lista
        </Text>
      </View>
    </View>
  );
};

