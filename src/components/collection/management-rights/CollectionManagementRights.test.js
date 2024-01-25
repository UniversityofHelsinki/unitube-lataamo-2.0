import React from 'react';
import { render } from '@testing-library/react';
import CollectionManagementRights from './CollectionManagementRights';

const users = [];
const groups = [];

it('renders', () => {
  render(<CollectionManagementRights users={users} groups={groups} />);
});
