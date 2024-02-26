import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordCardActions from './RecordCardActions';
import { MockProvider } from '../../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ users: { user: { eppn: 'baabenom' }}}}>
      <RecordCardActions record={{ series: 'asdf' }}/>
    </MockProvider>
  );
});
