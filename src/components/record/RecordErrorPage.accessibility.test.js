import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import RecordErrorPage from "./RecordErrorPage.js";
import React from "react";
import { axe } from "jest-axe";
import HelpDialog from "../dialog/HelpDialog";

describe('RecordErrorPage', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
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
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
