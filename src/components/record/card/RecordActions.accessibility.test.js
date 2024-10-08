import { render } from "@testing-library/react";
import RecordActions from "./RecordActions.js";
import React from "react";
import { axe } from "jest-axe";
import { MockProvider } from "../../../redux/reducers/MockProvider.js";

describe('RecordActions', () => {
  it('has no accessibility violations', async () => {
        const { container } = render(
          <MockProvider>
            <RecordActions options={{ showDeleted: false, showRecordsInCollections: false }} onOptionChange={() => {}} record={{ series: 'asdf' }}/>
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
