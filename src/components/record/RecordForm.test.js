import React from 'react';
import { render } from '@testing-library/react';
import RecordForm from './RecordForm';
import {MockProvider} from "../../redux/reducers/MockProvider";

it('renders', () => {
  render(
    <MockProvider mockReducers={{ collections: { collections: [{ identifier: 'asdf-asdf', title: 'asdfasdf' }], collectionDropDown: [{ identifier: 'asdf', title: 'inbox baabenom' }] } }}>
      <RecordForm record={{ deletionDate: new Date().toISOString() }} onChange={() => {}} />
      </MockProvider>
  );
});
