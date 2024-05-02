import { render } from "@testing-library/react";
import CollectionRecordsBulkActions from "./CollectionRecordsBulkActions.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../redux/reducers/MockProvider.js";

describe('CollectionRecordsBulkActions', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <CollectionRecordsBulkActions />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
