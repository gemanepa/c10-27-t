import { View, TextInput, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import Mesh from '../../../assets/alertsIcons/GRAFICO.svg';

const EnterAmountStyles = StyleSheet.create({
  container: {
    minHeight: 100,
    paddingVertical: '8%',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#d9d9d9',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
    gap: 20,
    overflow: 'hidden',
  },
  container_Amount_And_Concept: {
    width: '50%',
    // position: 'relative',
    flexDirection: 'column',
    gap: 10,
  },
  enterAmount: {
    width: '100%',
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    position: 'relative',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
  },
  inputConcept: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  inputAmount: {
    width: '100%',
    height: '100%',
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 10,
    paddingRight: '20%',
    textAlign: 'center',
    backgroundColor: '#f5f5f5',
  },
  currency: {
    position: 'absolute',
    fontSize: 16,
    paddingHorizontal: 14,
  },
});

export default function EnterAmount({ enterAmount, changeAmount, enterConcept, changeConcept }) {
  return (
    <LinearGradient
      colors={['#03B263', '#018f95']}
      start={[0, 1]}
      end={[1, 0]}
      locations={[0.2, 0.9]}
      style={EnterAmountStyles.container}
    >
      <Mesh style={{ position: 'absolute', left: '-20%' }} width="200%" height="200%" />
      <View style={EnterAmountStyles.container_Amount_And_Concept}>
        <Text style={EnterAmountStyles.title}>Concepto de ingreso</Text>
        <View style={EnterAmountStyles.enterAmount}>
          <TextInput
            value={enterConcept}
            onChangeText={changeConcept}
            style={EnterAmountStyles.inputConcept}
          />
        </View>
      </View>

      <View style={EnterAmountStyles.container_Amount_And_Concept}>
        <Text style={EnterAmountStyles.title}>Ingresa el monto</Text>
        <View style={EnterAmountStyles.enterAmount}>
          <TextInput
            value={enterAmount}
            keyboardType="numeric"
            onChangeText={changeAmount}
            style={EnterAmountStyles.inputAmount}
            maxLength={17}
          />
          <Text style={EnterAmountStyles.currency}> USD </Text>
        </View>
      </View>
    </LinearGradient>
  );
}

EnterAmount.propTypes = {
  enterAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.any]).isRequired,
  changeAmount: PropTypes.func.isRequired,
  enterConcept: PropTypes.string.isRequired,
  changeConcept: PropTypes.func.isRequired,
};
