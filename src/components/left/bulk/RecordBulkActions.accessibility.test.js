
import RecordBulkActions from "./RecordBulkActions.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../redux/reducers/MockProvider.js";
import { render } from "@testing-library/react";

describe('RecordBulkActions', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider>
            <RecordBulkActions records={[]} selectedRecords={[]} />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
