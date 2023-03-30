import React from 'react';
import { render } from '@testing-library/react-native';
import DefaultScreen from '../../screens/index';

describe('DefaultScreen', () => {
  it('renders the default screen', () => {
    const { getByText } = render(<DefaultScreen />);
    expect(getByText('- Disponible -')).toBeDefined();
  });
});
