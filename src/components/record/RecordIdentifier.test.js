import React from 'react';
import { render } from '@testing-library/react';
import RecordIdentifier from './RecordIdentifier';
import NotificationProvider from '../notification/NotificationContext';

it('renders', () => {
    render(
      <NotificationProvider>
        <RecordIdentifier identifier="ffff-eeee-0000-a2a2-efef" />
      </NotificationProvider>
    );
});
