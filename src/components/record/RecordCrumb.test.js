import React from 'react';
import { render } from '@testing-library/react';
import RecordCrumb from './RecordCrumb';
import { MockProvider } from '../../redux/reducers/MockProvider';

it('renders', () => {
  render(
    <MockProvider mockReducers={{ location: { location: '', searchParams: {}}}}>
      <RecordCrumb record={{ id: '123-456-789', title: 'asdf.mp4' }} />
    </MockProvider>
  );
});
