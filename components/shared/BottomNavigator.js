import React from 'react';
import { View, Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

function NavIconButton({ routeName, iconName }) {
  const navigation = useNavigation();
  const router = useRoute();
  const currentRoute = router?.name;
  return (
    <View
      style={{
        borderBottomWidth: 3,
        borderBottomColor: currentRoute === routeName ? '#FA6C17' : 'transparent',
        width: 48,
      }}
    >
      <IconButton
        icon={iconName}
        color="#7B8EA5"
        size={20}
        onPress={() => navigation.navigate(routeName)}
      />
    </View>
  );
}

function BottomNavigator() {
  const screenWidth = Dimensions.get('window').width;
  const marginHorizontal = (screenWidth - 328) / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left: marginHorizontal,
        right: marginHorizontal,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 328,
        height: 48,
        borderRadius: 10,
        backgroundColor: '#F6F6FD',
        bottom: 30,
      }}
    >
      <NavIconButton routeName="Home" iconName="home-outline" />
      <NavIconButton routeName="Wallet" iconName="wallet-outline" />
      <NavIconButton routeName="Statistics" iconName="chart-line" />
      <NavIconButton routeName="Notifications" iconName="bell-outline" />
    </View>
  );
}

NavIconButton.propTypes = {
  routeName: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
};

export default BottomNavigator;
