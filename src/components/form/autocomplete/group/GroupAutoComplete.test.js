import React from 'react';
import { render } from '@testing-library/react';
import GroupAutoComplete from './GroupAutoComplete';
import { MockProvider } from '../../../../redux/reducers/MockProvider';

const reducers = {
  autocompletion: {
    groups: [{
      grpName: 'asdfasdf'
    }]
  }
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <GroupAutoComplete onSelect={() => {}} />
    </MockProvider>
  );
});
