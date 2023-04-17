import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import DefaultScreen from '../../screens/index';
import useAsyncStorage from '../../hooks/useAsyncStorage';
import getAsyncStorageData from '../../utils/get-storage-data';
import { useRoute, useNavigation } from '@react-navigation/native';

// Mock the useAsyncStorage hook
jest.mock('../../hooks/useAsyncStorage');
// Mock the getAsyncStorageData function
jest.mock('../../utils/get-storage-data');
// Mock the useRoute and useNavigation hooks
jest.mock('@react-navigation/native', () => ({
  useRoute: jest.fn(),
  useNavigation: jest.fn(),
  useIsFocused: jest.fn(),
}));

describe('DefaultScreen', () => {
  it('renders the default screen', async () => {
    // Set the mock return value for useAsyncStorage
    useAsyncStorage.mockReturnValue([false, { currency: 'USD', amount: 100 }]);
    // Mock the getAsyncStorageData function
    getAsyncStorageData.mockReturnValueOnce({ currency: 'USD', amount: 100 });
    getAsyncStorageData.mockReturnValue([]);

    // Mock the useRoute and useNavigation hooks
    useRoute.mockReturnValue({ name: 'Home' });
    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });

    const { getByText } = render(<DefaultScreen />);

    expect(getByText('- Disponible -')).toBeTruthy();
  });
});
