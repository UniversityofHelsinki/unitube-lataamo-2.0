import React from 'react';
import { render } from '@testing-library/react';
import CollectionManagementRight from './CollectionManagementRight';
import { ReactComponent as GroupIcon } from '../../utilities/icons/avatar-group.svg';

it('renders', () => {
  render(<CollectionManagementRight 
    onRemove={() => {}}
    Icon={GroupIcon}
    label="grp-hy-test"
  />);
});
