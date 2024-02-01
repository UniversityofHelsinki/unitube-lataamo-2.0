import React from 'react';
import { render } from '@testing-library/react';
import MainContent from './MainContent';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  location: {
    searchParameters: { record: 'asdfasdf '}
  },
  records: {
    record: { identifier: 'asdfasdf' }
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <MainContent />
    </MockProvider>
  );
});

