import React from 'react';
import { render } from '@testing-library/react';
import RecordEmbedCode from "./RecordEmbedCode";
import NotificationProvider from '../notification/NotificationContext';

it('renders', () => {
    render(
      <NotificationProvider>
        <RecordEmbedCode 
          identifier="aaaa-bbbb-cccc-eeee-ffff-0000" 
        />
      </NotificationProvider>
    );
});
