import React from 'react';
import { render } from '@testing-library/react';
import ClipBoardFormElement from "./ClipBoardFormElement";
import NotificationProvider from '../notification/NotificationContext';

const label = 'Otsikko';
const content = 'sisältö';
it('renders', () => {
    render(
      <NotificationProvider>
        <ClipBoardFormElement 
          label={label} 
          content={content}>
        </ClipBoardFormElement>
      </NotificationProvider>
    );
});
