import React from 'react';
import { render } from '@testing-library/react';
import CollectionManagementRightsUsers from './CollectionManagementRightsUsers';

const users = [];

it('renders', () => {
  render(<CollectionManagementRightsUsers users={users} onRemove={() => {}} onSelect={() => {}}/>);
});
