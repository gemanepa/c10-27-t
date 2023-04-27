import * as React from 'react';
import { SceneMap } from 'react-native-tab-view';
import Tabs from '../../shared/Tabs';
import Tables from './Tables';

const renderScene = SceneMap({
  first: Tables,
  second: Tables,
});

export default function HomeTabs() {
  return <Tabs renderScene={renderScene} />;
}
