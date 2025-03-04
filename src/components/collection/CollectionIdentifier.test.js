import React from 'react';
import { render } from '@testing-library/react';
import CollectionIdentifier from './CollectionIdentifier.js';
import NotificationProvider from '../notification/NotificationContext.js';

it('renders', () => {
  render(
    <NotificationProvider>
      <CollectionIdentifier
        identifier="aaaa-bbbb-cccc-dddd-eeee"
      />
    </NotificationProvider>
  );
});
