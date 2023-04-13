import * as React from 'react';
import { useWindowDimensions } from 'react-native';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Tables from './Tables';

const renderScene = SceneMap({
  first: Tables,
  second: Tables,
});

const renderTabBar = (props) => (
  <TabBar
    {...props} // eslint-disable-line react/jsx-props-no-spreading
    indicatorStyle={{
      backgroundColor: '#FA6C17',
      width: 160,
      height: 3,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      marginLeft: 20,
    }}
    style={{ backgroundColor: '#F6F6FD' }}
    labelStyle={{ color: '#334050', fontSize: 20, fontWeight: 500, textTransform: 'capitalize' }}
  />
);

export default function TabViewExample() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Gastos' },
    { key: 'second', title: 'Ingresos' },
  ]);

  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  );
}
