import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DefaultScreen from '../../screens/index';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import getAsyncStorageData from '../../utils/get-storage-data';

// Mock the useAsyncStorage hook
jest.mock('../../hooks/useAsyncStorage');
// Mock the getAsyncStorageData function
jest.mock('../../utils/get-storage-data');
jest.mock('@react-navigation/native', () => ({
  useIsFocused: jest.fn(),
}));

describe('DefaultScreen', () => {
  it('renders the default screen', async () => {
    // Set the mock return value for useAsyncStorage
    useAsyncStorage.mockReturnValue([false, { currency: 'USD', amount: 100 }]);
    // Mock the getAsyncStorageData function
    getAsyncStorageData.mockReturnValueOnce({ currency: 'USD', amount: 100 });
    getAsyncStorageData.mockReturnValue([]);

    const { getByText } = render(<DefaultScreen />);

    expect(getByText('- Disponible -')).toBeTruthy();
  });
});
