import * as React from 'react';
import { SceneMap } from 'react-native-tab-view';
import Tabs from '../shared/Tabs';
import Stats from './Stats';

const renderScene = SceneMap({
  first: Stats,
  second: Stats,
});

export default function StatisticsTabs() {
  return <Tabs renderScene={renderScene} />;
}
