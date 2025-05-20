import React from 'react';
import { render } from '@testing-library/react';
import Record from './Record';
import { MockProvider } from '../../redux/reducers/MockProvider';

const reducers = {
  location: {
    searchParameters: {
      record: 'asdfasdf'
    },
    path: '/records'
  },
  collections: {
    collections: [{ identifier: 'asdf-asdf', title: 'asdfasdf' }]
  },
  vttfiles: {
    vttfilesdata: [
      {
        lang: "swe",
        url: "ruotsi.vtt"
      },
      {
        lang: "eng",
        url: "englanti.vtt"
      },
      {
        lang: "fin",
        url: "suomi_teksti.vtt"
      }
  ]},
};

it('renders', () => {
  render(
    <MockProvider mockReducers={reducers}>
      <Record />
    </MockProvider>
  );
});
