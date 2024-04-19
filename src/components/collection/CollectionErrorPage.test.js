import React from 'react';
import { render, screen } from '@testing-library/react';
import CollectionErrorPage from './CollectionErrorPage';
import HelpDialog from '../dialog/HelpDialog';

it('renders', () => {
  render(
    <CollectionErrorPage 
      helpDialog={
        <HelpDialog label="collection_error_page_http_help_label">
          {'collection_error_page_http_help_content'}
        </HelpDialog>
      }
    >
      <div className="collection-error-page-content">
        <span><b>{'test'}</b></span>
        {'collection_error_page_http_content'}
      </div>
    </CollectionErrorPage>
  );
});
