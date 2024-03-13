import { render } from "@testing-library/react";
import RecordListActions from "./RecordListActions";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../redux/reducers/MockProvider.js";

describe('RecordListActions', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider mockReducers={{ records: { records: [] } }}>
            <RecordListActions options={{ showDeleted: false, showRecordsInCollections: false }} onOptionChange={() => {}} />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
