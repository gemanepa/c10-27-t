import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

// import Mesh from '../../assets/alertsIcons/GRAFICO.svg';
import GeneralComponentsExport from '../../assets/generalComponents/generalComponentsExport';

const { ListOfStatisticalLayers, ListOfMesh, ListBackgroundsWithAllTheElements } =
  GeneralComponentsExport();

export default function layerBackground({ children, params }) {
  const { linearGradient, mesh, layer, backgroundLayer } = params;

  let colors = ['#03B263', '#01B496'];
  let start = [0, 1];
  let end = [1, 0];
  let locations = [0.2, 0.9];
  let linearGradientStyle = { width: '100%' };

  if (linearGradient) {
    if (linearGradient.colors) {
      colors = linearGradient.colors;
    }
    if (linearGradient.start) {
      start = linearGradient.start;
    }
    if (linearGradient.end) {
      end = linearGradient.end;
    }
    if (linearGradient.locations) {
      locations = linearGradient.locations;
    }
    if (linearGradient.style) {
      linearGradientStyle = linearGradient.style;
    }
  }

  linearGradientStyle = StyleSheet.create({
    container: linearGradientStyle,
  });

  let meshWidth = '200%';
  let meshHeight = '200%';

  let meshStyle = { position: 'absolute', left: '-20%' };
  let Mesh = ListOfMesh['0'];
  if (mesh) {
    if (mesh.width) {
      meshWidth = mesh.width;
    }
    if (mesh.height) {
      meshHeight = mesh.height;
    }
    if (mesh.style) {
      meshStyle = mesh.style;
    }
    if (mesh.vector) {
      Mesh = ListOfMesh[mesh.vector];
    }
  }
  meshStyle = StyleSheet.create({
    container: meshStyle,
  });

  let layerStyle = {};
  let layerWidth = '100%';
  let layerHeight = '100%';
  let Layer = ListOfStatisticalLayers['0'];

  if (layer) {
    if (layer.style) {
      layerStyle = layer.style;
    }
    if (layer.width) {
      layerWidth = layer.width;
    }
    if (layer.height) {
      layerHeight = layer.height;
    }
    if (layer.vector) {
      Layer = ListOfStatisticalLayers[layer.vector];
    }
  }
  layerStyle = StyleSheet.create({
    container: layerStyle,
  });

  let BackgroundLayer = ListBackgroundsWithAllTheElements['0'];
  let backgroundLayerStyle = { position: 'absolute' };
  let backgroundLayerWidth = '100%';
  let backgroundLayerHeight = '100%';

  if (backgroundLayer) {
    if (backgroundLayer.style) {
      backgroundLayerStyle = backgroundLayer.style;
    }
    if (BackgroundLayer.width) {
      backgroundLayerWidth = backgroundLayer.width;
    }
    if (BackgroundLayer.height) {
      backgroundLayerHeight = backgroundLayer.height;
    }
    if (backgroundLayer.vector) {
      BackgroundLayer = ListBackgroundsWithAllTheElements[backgroundLayer.vector];
    }
  }

  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      style={linearGradientStyle.container}
    >
      {mesh && <Mesh style={meshStyle.container} width={meshWidth} height={meshHeight} />}
      {layer && <Layer width={layerWidth} height={layerHeight} style={layerStyle.container} />}
      {backgroundLayer && (
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
