import React from 'react';
import { render } from '@testing-library/react';
import RecordLink from './RecordLink';
import NotificationProvider from '../notification/NotificationContext';

it('renders', () => {
    render(
      <NotificationProvider>
        <RecordLink 
          to="#" 
          label={"https://unitube.it.helsinki.fi/21EC2020-3AEA-4069-A2DD-08002B30309D"} 
        />
      </NotificationProvider>
    );
});
