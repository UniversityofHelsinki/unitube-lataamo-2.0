import React from 'react';
import { render } from '@testing-library/react';
import RecordActionOptions from './RecordActionOptions.js';

it('renders', () => {
  render(<RecordActionOptions options={{ showDeleted: false, showRecordsInCollections: false }} onOptionChange={() => {}} />);
});
