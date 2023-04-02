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
    indicatorStyle={{ backgroundColor: 'gray' }}
    style={{ backgroundColor: 'white' }}
    labelStyle={{ color: 'black' }}
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
