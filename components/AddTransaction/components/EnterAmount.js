import { View, TextInput, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const EnterAmountStyles = StyleSheet.create({
  container: {
    // height: '20%',
    minHeight: 100,
    paddingVertical: '8%',
    // paddingHorizontal: 30,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    gap: 20,
  },
  container_Amount_And_Concept: {
    width: '50%',
    position: 'relative',
    flexDirection: 'column',
    gap: 10,
  },
  enterAmount: {
    width: '100%',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  inputAmount: {
    width: '100%',
    height: 60,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  currency: {
    height: 60,
    width: 60,
    // borderColor: 'black',
    // borderWidth: 1,
    // borderRadius: 10,
    textAlign: 'center',
    textAlignVertical: 'center',
    position: 'absolute',
    right: 0,
    fontSize: 20,
  },
});

export default function EnterAmount({ enterAmount, changeAmount, enterConcept, changeConcept }) {
  return (
    <View style={EnterAmountStyles.container}>
      <View style={EnterAmountStyles.container_Amount_And_Concept}>
        <Text style={EnterAmountStyles.title}>Concepto de ingreso</Text>
        <View style={EnterAmountStyles.enterAmount}>
          <TextInput
            // placeholder="Cantidad"
            value={enterConcept}
            // keyboardType="numeric"
            onChangeText={changeConcept}
            style={EnterAmountStyles.inputAmount}
          />
        </View>
      </View>

      <View style={EnterAmountStyles.container_Amount_And_Concept}>
        <Text style={EnterAmountStyles.title}>Ingresa Monto</Text>
        <View style={EnterAmountStyles.enterAmount}>
          <TextInput
            // placeholder="Cantidad"
            value={enterAmount}
            keyboardType="numeric"
            onChangeText={changeAmount}
            style={EnterAmountStyles.inputAmount}
          />
          <Text style={EnterAmountStyles.currency}> USD </Text>
        </View>
      </View>
    </View>
  );
}

EnterAmount.propTypes = {
  enterAmount: PropTypes.string.isRequired,
  changeAmount: PropTypes.func.isRequired,
  enterConcept: PropTypes.string.isRequired,
  changeConcept: PropTypes.func.isRequired,
};
