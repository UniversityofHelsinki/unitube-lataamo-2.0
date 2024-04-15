import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import CollectionErrorPage from "./CollectionErrorPage.js";
import React from "react";
import { axe } from "jest-axe";
import HelpDialog from "../dialog/HelpDialog";

describe('CollectionErrorPage', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
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
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
