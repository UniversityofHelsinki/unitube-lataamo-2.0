import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordActions from './RecordActions';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ users: { user: { eppn: 'baabenom' }}}}>
      <RecordActions record={{ series: 'asdf' }}/>
    </MockProvider>
  );
});
