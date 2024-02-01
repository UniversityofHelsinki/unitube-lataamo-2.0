import React from 'react';
import { render } from '@testing-library/react';
import UserAutoComplete from './UserAutoComplete';
import { MockProvider } from '../../../../redux/reducers/MockProvider';

const reducers = {
  autocompletion: {
    users: [{ userName: 'asdfasdf' }]
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <UserAutoComplete onSelect={() => {}} />
    </MockProvider>
  );
});
