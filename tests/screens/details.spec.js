import React from 'react';
import { render } from '@testing-library/react-native';
import DetailsScreen from '../../screens/details';

describe('DetailsScreen', () => {
  it('renders the details screen', () => {
    const { getByText } = render(<DetailsScreen />);
    expect(getByText('Details Screen')).toBeDefined();
  });
});
