import * as React from 'react';
import { SceneMap } from 'react-native-tab-view';
import Tabs from '../shared/Tabs';
import MainContent from './index';

const renderScene = SceneMap({
  first: MainContent,
  second: MainContent,
});

export default function StatisticsTabs() {
  return <Tabs renderScene={renderScene} />;
}
