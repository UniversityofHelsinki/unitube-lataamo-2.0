import React from 'react';
import { render } from '@testing-library/react';
import RecordCardDetails from './RecordCardDetails';

it('renders', () => {
  render(<RecordCardDetails record={{ title: 'asdf', description: 'asdfasdf', created: new Date().toISOString() }} />);
});
