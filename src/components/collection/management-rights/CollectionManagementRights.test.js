import React from 'react';
import { render } from '@testing-library/react';
import CollectionManagementRights from './CollectionManagementRights';
import { MockProvider } from '../../../redux/reducers/MockProvider';

const users = [{ userName: 'baabenom' }];
const groups = [{ grpName: 'grp-hy-test' }];

const reducers = {
  autocompletion: {
    users: [{ userName: 'rkeskiva' }],
    groups: [{ grpName: 'grp-hy-test' }]
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <CollectionManagementRights users={users} groups={groups} />
    </MockProvider>
  );
});
