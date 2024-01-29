import React from 'react';
import { render } from '@testing-library/react';
import NewRecordFooter from './NewRecordFooter';

it('renders', () => {
  render(<NewRecordFooter onClick={() => {}} onCancel={() => {}} progress={{}} isValid={true} />);
});
