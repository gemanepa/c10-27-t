import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import DayTable from './DayTable';
import WeekTable from './WeekTable';
import MonthTable from './MonthTable';

function RenderContent({ buttonClicked }) {
  if (buttonClicked === 1) {
    return <DayTable />;
  }
  if (buttonClicked === 2) {
    return <WeekTable />;
  }
  if (buttonClicked === 3) {
    return <MonthTable />;
  }
  return null;
}

const styles = StyleSheet.create({
  buttonStyle: {
    opacity: 0.7, // default style for inactive buttons
    backgroundColor: '#808080',
  },
  activeButton: {
    opacity: 1, // highlight the active button
  },
});

function ButtonGroup() {
  const [buttonClicked, setButtonClicked] = useState(1);

  const handleButtonPress = (buttonNumber) => {
    setButtonClicked(buttonNumber);
  };

  const renderButton = (label, buttonNumber) => {
    const isActive = buttonClicked === buttonNumber;
    const buttonStyles = [styles.buttonStyle, isActive && styles.activeButton];
    return (
      <Button mode="contained" onPress={() => handleButtonPress(buttonNumber)} style={buttonStyles}>
        {label}
      </Button>
    );
  };

  return (
    <View>
      <View style={{ paddingTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
        {renderButton('Dia', 1)}
        {renderButton('Semana', 2)}
        {renderButton('Mes', 3)}
      </View>

      <RenderContent buttonClicked={buttonClicked} />
    </View>
  );
}

RenderContent.propTypes = {
  buttonClicked: PropTypes.number.isRequired,
};

export default ButtonGroup;
