import React from 'react';
import { render, screen } from '@testing-library/react';
import RecordErrorPage from './RecordErrorPage';
import HelpDialog from '../dialog/HelpDialog';

it('renders', () => {
  render(
    <RecordErrorPage
      helpDialog={
        <HelpDialog label="test">
          test content
        </HelpDialog>
      }
      record={{ title: 'test-title', identifier: '1234-asdf' }}
    >
      <span>test</span>
    </RecordErrorPage>
  );
});
