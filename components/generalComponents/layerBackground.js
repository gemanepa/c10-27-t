import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

import Mesh from '../../assets/alertsIcons/GRAFICO.svg';

// const layerBackgroundStyles = StyleSheet.create({
//   parentContainer: {}
// });

export default function layerBackground({ children, params }) {
  const { linearGradient, mesh } = params;

  let colors = ['#03B263', '#018f95'];
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
  }
  meshStyle = StyleSheet.create({
    container: meshStyle,
  });

  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      locations={locations}
      style={linearGradientStyle.container}
    >
      <Mesh style={meshStyle.container} width={meshWidth} height={meshHeight} />
      {children}
    </LinearGradient>
  );
}

layerBackground.propTypes = {
  children: PropTypes.oneOfType([PropTypes.bool, PropTypes.func, PropTypes.node, PropTypes.any]),
  params: PropTypes.shape({
    linearGradient: PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string),
      start: PropTypes.arrayOf(PropTypes.number),
      end: PropTypes.arrayOf(PropTypes.number),
      locations: PropTypes.arrayOf(PropTypes.number),
      style: PropTypes.object,
    }),
    mesh: PropTypes.shape({
      width: PropTypes.oneOf([PropTypes.number, PropTypes.string, PropTypes.any]),
      height: PropTypes.oneOf([PropTypes.number, PropTypes.string, PropTypes.any]),
      style: PropTypes.object,
    }),
  }).isRequired,
};
