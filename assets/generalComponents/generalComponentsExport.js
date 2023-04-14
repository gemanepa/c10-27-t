// import React from "react";
import fullScreenStatisticsLayer from './graphic/layerBackground/fullScreenStatisticsLayer.svg';
import roundBottomStatistic from './graphic/layerBackground/roundBottomStatistic.svg';
import roundTopStatistic from './graphic/layerBackground/roundTopStatistic.svg';
import initiationStatistics from './graphic/layerBackground/initiationStatistics.svg';
import constructionStatistics from './graphic/layerBackground/constructionStatistics.svg';

import halfScreen from './graphic/tights/halfScreen.svg';
import fullScreenMesh from './graphic/tights/fullScreen.svg';

const ListOfStatisticalLayers = {
  0: fullScreenStatisticsLayer,
  fullScreen: fullScreenStatisticsLayer,

  1: roundBottomStatistic,
  2: roundTopStatistic,

  3: initiationStatistics,
  home: initiationStatistics,
  4: constructionStatistics,
  construction: constructionStatistics,
};

const ListOfMesh = {
  0: halfScreen,
  halfScreen: halfScreen,
  1: fullScreenMesh,
  fullScreen: fullScreenMesh,
};

export default function GeneralComponentsExport() {
  return { ListOfStatisticalLayers, ListOfMesh };
}
