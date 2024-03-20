import React from 'react';
import { render } from '@testing-library/react';
import RecordStaticInformation from './RecordStaticInformation';

const record = {
  identifier: 'asdf',
  downloadableMedia: {}
};
it('renders', () => {
  render(<RecordStaticInformation record={ record } />);
});
