import React from 'react';
import { render } from '@testing-library/react-native';
import DefaultScreen from '../../screens/index';
import useAsyncStorage from '../../hooks/useAsyncStorage';

// Mock the useAsyncStorage hook
jest.mock('../../hooks/useAsyncStorage');

describe('DefaultScreen', () => {
  it('renders the default screen', () => {
    useAsyncStorage.mockReturnValue([false, { currency: 'USD', amount: 100 }]);
    const { getByText } = render(<DefaultScreen />);
    expect(getByText('- Disponible -')).toBeDefined();
  });
});
