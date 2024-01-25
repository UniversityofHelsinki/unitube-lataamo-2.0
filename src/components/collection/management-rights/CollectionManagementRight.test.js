import React from 'react';
import { render } from '@testing-library/react';
import CollectionManagementRight from './CollectionManagementRight';

const label = 'teksti';
it('renders', () => {
  render(<CollectionManagementRight label={label} onRemove={() => {}} />);
});
