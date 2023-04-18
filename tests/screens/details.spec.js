import React from 'react';

import { render } from '@testing-library/react-native';
import DetailsScreen from '../../screens/details';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    setOptions: jest.fn(),
  }),
  useRoute: () => {},
}));

  describe('DetailsScreen', () => {
    it('renders the details screen', () => {
      const { getByTestId } = render(<DetailsScreen />);
      expect(getByTestId('details-screen')).toBeDefined();
    });
  });