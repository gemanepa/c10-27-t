// import React from "react";
import fullScreenStatisticsLayer from './graphic/layerBackground/fullScreenStatisticsLayer.svg';
import roundBottomStatistic from './graphic/layerBackground/roundBottomStatistic.svg';
import roundTopStatistic from './graphic/layerBackground/roundTopStatistic.svg';
import initiationStatistics from './graphic/layerBackground/initiationStatistics.svg';
import constructionStatistics from './graphic/layerBackground/constructionStatistics.svg';

import halfScreenMesh from './graphic/tights/halfScreen.svg';
import fullScreenMesh from './graphic/tights/fullScreen.svg';

import HomeScreenBackground from './graphic/layerBackground/FONDO-PANTALLAPRINCIPAL.svg';
import SmallLayerBackground from './graphic/layerBackground/GRAFICO-MONTOTOTAL.svg';
import halfScreenBackground from './graphic/layerBackground/GRAFICO-SEGURIDAD.svg';
import fullScreenBackground from './graphic/layerBackground/GRAFICO-PANTALLACOMPLETA.svg';

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
  0: halfScreenMesh,
  halfScreen: halfScreenMesh,
  1: fullScreenMesh,
  fullScreen: fullScreenMesh,
};

const ListBackgroundsWithAllTheElements = {
  0: HomeScreenBackground,
  1: SmallLayerBackground,
  2: halfScreenBackground,
  3: fullScreenBackground,
};

export default function GeneralComponentsExport() {
  return { ListOfStatisticalLayers, ListOfMesh, ListBackgroundsWithAllTheElements };
}
