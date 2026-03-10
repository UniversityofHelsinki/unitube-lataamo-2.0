import React from 'react';
import { render } from '@testing-library/react';
import RecordStaticInformation from './RecordStaticInformation';
import NotificationProvider from '../notification/NotificationContext';

const record = {
  identifier: 'asdf',
  downloadableMedia: {}
};
it('renders', () => {
  render(
    <NotificationProvider>
      <RecordStaticInformation record={ record } />
    </NotificationProvider>
  );
});
