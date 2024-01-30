import React from 'react';
import { render } from '@testing-library/react';
import RecordStaticInformation from './RecordStaticInformation';

it('renders', () => {
  render(<RecordStaticInformation record={{
    identifier: 'asf-asdf-asd-f'
  }} />);
});
