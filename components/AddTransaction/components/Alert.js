import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Text, Image, Dimensions, Modal, Animated } from 'react-native';
import { Button } from 'react-native-paper';
import PropTypes from 'prop-types';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    width,
    height,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    width: '70%',
    maxWidth: 300,
    minHeight: 200,
    paddingHorizontal: 5,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  titleItems: {
    fontSize: 25,
    textAlign: 'center',
  },
  messageItems: {
    fontSize: 17,
  },
});

export default function Alert({ title, params }) {
  const { changeShowAlert, fontColor, message } = params;

  const opacityItemAnimation = useRef(new Animated.Value(0)).current;
  const opacityContainerAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityItemAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    Animated.timing(opacityContainerAnimation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacityItemAnimation, opacityContainerAnimation]);

  const changeShowAlert2 = () => {
    if (changeShowAlert) {
      changeShowAlert();
    }
  };

  const isTranspatent = true;

  return (
    <Modal transparent={isTranspatent}>
      <Animated.View style={[styles.container, { opacity: opacityContainerAnimation }]}>
        <View style={{ ...styles.container, backgroundColor: fontColor }}>
          <Animated.View style={[styles.item, { opacity: opacityItemAnimation }]}>
            <View style={styles.item}>
              <Image
                source={require('../../../assets/addTransactionIcons/Add.png')}
                style={{ width: 50, height: 50 }}
              />
              <Text style={styles.titleItems}>{title}</Text>
            </View>
            {message && <Text style={styles.messageItems}>{message}</Text>}
          </Animated.View>
        </View>

        <Button
          mode="contained"
          title="Learn More"
          labelStyle={{ width, height, backgroundColor: 'transparent' }}
          style={{ backgroundColor: 'transparent' }}
          onPress={changeShowAlert2}
        />
      </Animated.View>
    </Modal>
  );
}

Alert.propTypes = {
  title: PropTypes.string.isRequired,
  params: PropTypes.shape({
    changeShowAlert: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
      PropTypes.array,
      PropTypes.func,
      PropTypes.any,
    ]),
    fontColor: PropTypes.string.isRequired,
    message: PropTypes.string,
  }).isRequired,
};
