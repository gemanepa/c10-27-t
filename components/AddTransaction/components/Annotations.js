import { View, TextInput, Text, StyleSheet } from 'react-native';

const AnnotationsStyles = StyleSheet.create(
  {
    container: {
      paddingHorizontal: '5%',
      flexDirection: 'column',
      gap: 10
    },
    title: {
      textAlign: 'center',
      fontSize: 20
    },

    inputAnnotation: {
      // width: '80%',
      height: 60,
      borderWidth: 1,
      borderColor: 'black',
      borderRadius: 20,
      // borderTopColor: '#f6f6f60f',
      textAlign: 'center'
    }
  }
)

export default function Annotations() {

  return (
    <View style={AnnotationsStyles.container} >
      <Text style={AnnotationsStyles.title} >
        Anotaciones
      </Text>

      <TextInput
        // placeholder="Cantidad"
        // value={enterAmount}
        // keyboardType="numeric"
        // onChangeText={changeAmount}
        style={AnnotationsStyles.inputAnnotation}
      />

    </View>
  );
}