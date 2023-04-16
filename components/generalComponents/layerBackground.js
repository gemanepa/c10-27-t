import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import PropTypes from 'prop-types';

// import Mesh from '../../assets/alertsIcons/GRAFICO.svg';
import GeneralComponentsExport from '../../assets/generalComponents/generalComponentsExport';

const { ListOfStatisticalLayers, ListOfMesh, ListBackgroundsWithAllTheElements } =
  GeneralComponentsExport();

export default function layerBackground({ children, params }) {
  const { linearGradient = {}, mesh = {}, layer = {}, backgroundLayer = {} } = params;

  const {
    colors = ['red', 'purple'],
    start = [0, 1],
    end = [0, 1],
    locations = [0.2, 0.9],
    style: linearGradientStyle = { width: '100%' },
  } = linearGradient;

  const {
    width: meshWidth = '200%',
    height: meshHeight = '200%',
    style: meshStyle = { position: 'absolute', left: '-20%' },
    vector: meshVector = 0,
  } = mesh;
  const Mesh = ListOfMesh[meshVector];

  const {
    width: layerWidth = '100%',
    height: layerHeight = '100%',
    style: layerStyle = {},
    vector: layerVector = 0,
  } = layer;
  const Layer = ListOfStatisticalLayers[layerVector];

  const {
    width: backgroundLayerWidth = '100%',
    height: backgroundLayerHeight = '100%',
    style: backgroundLayerStyle = { position: 'absolute' },
    vector: backgroundLayerVector = 0,
  } = backgroundLayer;
  const BackgroundLayer = ListBackgroundsWithAllTheElements[backgroundLayerVector];

  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      style={linearGradientStyle}
    >
      {JSON.stringify(mesh) !== '{}' && (
        <Mesh style={meshStyle} width={meshWidth} height={meshHeight} />
      )}
      {JSON.stringify(layer) !== '{}' && (
        <Layer width={layerWidth} height={layerHeight} style={layerStyle} />
      )}
      {JSON.stringify(backgroundLayer) !== '{}' && (
        <BackgroundLayer
          width={backgroundLayerWidth}
          height={backgroundLayerHeight}
          style={backgroundLayerStyle}
        />
      )}
      {children}
    </LinearGradient>
  );
}

const stylePropTypes = PropTypes.shape({
  position: PropTypes.string,
  top: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  left: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  right: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  bottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  margin: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  marginRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingTop: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingBottom: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingLeft: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  paddingRight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  fontWeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lineHeight: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
});

layerBackground.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.node, PropTypes.any]),
  params: PropTypes.shape({
    linearGradient: PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string),
      start: PropTypes.arrayOf(PropTypes.number),
      end: PropTypes.arrayOf(PropTypes.number),
      locations: PropTypes.arrayOf(PropTypes.number),
      style: stylePropTypes,
    }),
    mesh: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    }),
    layer: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      style: stylePropTypes,
    }),
    backgroundLayer: PropTypes.shape({
      width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      style: stylePropTypes,
    }),
  }).isRequired,
};
