import { View, TextInput, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const AnnotationsStyles = StyleSheet.create({
  container: {
    paddingHorizontal: '5%',
    flexDirection: 'column',
    gap: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
  },

  inputAnnotation: {
    height: 60,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    textAlign: 'center',
  },
});

export default function Annotations({ annotations, changeAnnotations }) {
  return (
    <View style={AnnotationsStyles.container}>
      <Text style={AnnotationsStyles.title}>Anotaciones</Text>

      <TextInput
        value={annotations}
        onChangeText={changeAnnotations}
        style={AnnotationsStyles.inputAnnotation}
      />
    </View>
  );
}

Annotations.propTypes = {
  annotations: PropTypes.string.isRequired,
  changeAnnotations: PropTypes.func.isRequired,
};
