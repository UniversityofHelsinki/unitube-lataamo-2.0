import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordTopRow from './RecordTopRow';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider>
      <RecordTopRow record={{ 
        deletionDate: new Date().toISOString(),
        title: 'asdf',
        isPartOf: 'asd',
        series: {
          title: 'asdf'
        }
      }} />
    </MockProvider>
  );
});
