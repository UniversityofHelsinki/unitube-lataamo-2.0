import React from 'react';
import { render } from '@testing-library/react';
import RecordCard from './RecordCard';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ users: { user: { eppn: 'baabenom' }}}}>
      <RecordCard 
        record={{ identifier: 'asdf', title: 'hello', series: 'asdf' }} 
        onClick={() => {}} 
        selected={false} />
    </MockProvider>
  );
});
