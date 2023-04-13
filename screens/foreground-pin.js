import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Text } from 'react-native';
import ReactNativePinView from 'react-native-pin-view';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import useAsyncStorage from '../hooks/useAsyncStorage';
import stepTwoIcon from '../assets/initial-setup/pin-screen-img.png';

function ForegroundPinScreen({ setUserInputPin }) {
  const pinView = useRef(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);
  const [enteredPin, setEnteredPin] = useState('');
  const [showCompletedButton, setShowCompletedButton] = useState(false);

  const [incorrectPin, setIncorrectPin] = useState(false);
  const [pinLoading, pinData] = useAsyncStorage('userPin');

  const pinLength = 6;
  useEffect(() => {
    if (enteredPin.length > 0) {
      setShowRemoveButton(true);
    } else {
      setShowRemoveButton(false);
    }
    if (enteredPin.length === pinLength) {
      setShowCompletedButton(true);
    } else {
      setShowCompletedButton(false);
    }
  }, [enteredPin]);

  if (pinLoading) return null;

  const color = incorrectPin ? 'red' : 'white';
  return (
    <LinearGradient
      style={{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      colors={['#03B263', 'green']}
    >
      <Image
        style={{
          height: 100,
          width: 100,
          marginBottom: 20,
        }}
        source={stepTwoIcon}
      />
      <Text
        style={{
          paddingTop: 24,
          paddingBottom: 48,
          color: 'white',
          fontWeight: 'bold',
          fontSize: 42,
        }}
      >
        Ingresa tu PIN
      </Text>
      <ReactNativePinView
        inputSize={32}
        ref={pinView}
        pinLength={pinLength}
        buttonSize={60}
        onValueChange={(value) => setEnteredPin(value)}
        buttonAreaStyle={{
          marginTop: 24,
        }}
        inputAreaStyle={{
          marginBottom: 24,
        }}
        inputViewEmptyStyle={{
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: color,
        }}
        inputViewFilledStyle={{
          backgroundColor: color,
        }}
        buttonViewStyle={{
          borderWidth: 1,
          borderColor: color,
        }}
        buttonTextStyle={{
          color,
        }}
        onButtonPress={(key) => {
          if (incorrectPin) setIncorrectPin(false);
          if (key === 'custom_left') {
            pinView.current.clear();
          }
          if (key === 'custom_right') {
            // alert(`Entered Pin: ${  enteredPin}`)
            if (enteredPin !== pinData) {
              setIncorrectPin(true);
            } else {
              setUserInputPin(enteredPin);
            }
          }
        }}
        customLeftButton={
          showRemoveButton ? <MaterialIcons name="backspace" size={36} color={color} /> : undefined
        }
        customRightButton={
          showCompletedButton ? (
            <MaterialIcons name="lock-open" size={36} color={color} />
          ) : undefined
        }
      />
    </LinearGradient>
  );
}

ForegroundPinScreen.propTypes = {
  setUserInputPin: PropTypes.func.isRequired,
};

export default ForegroundPinScreen;
