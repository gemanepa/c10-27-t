import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import App from '../App';
import useAsyncStorage from '../hooks/useAsyncStorage';

// Mock the useAsyncStorage hook
jest.mock('../hooks/useAsyncStorage');

describe('App', () => {
  it('displays the initial setup screen when there is no user currency', async () => {
    // Set the mock return value for useAsyncStorage
    useAsyncStorage.mockReturnValue([false, null]);

    const { getByText } = render(<App />);
    // Wait for the next render cycle to complete
    await waitFor(() => expect(useAsyncStorage).toHaveBeenCalled());

    expect(getByText('Organicemos tus finanzas juntos')).toBeTruthy();
  });

  it('displays the home screen when there is a user currency', async () => {
    // Set the mock return value for useAsyncStorage
    useAsyncStorage.mockReturnValue([false, 'USD']);

    const { getByText } = render(<App />);
    // Wait for the next render cycle to complete
    await waitFor(() => expect(useAsyncStorage).toHaveBeenCalled());

    expect(getByText('NoCountry')).toBeTruthy();
  });
});
