import React from 'react';
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('App', () => {
  it('has 3 children', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree.children.length).toBe(3);
  });

  it('renders the app title', () => {
    const { getByText } = render(<App />);
    const title = getByText('NoCountry');
    expect(title).toBeDefined();
  });
});
