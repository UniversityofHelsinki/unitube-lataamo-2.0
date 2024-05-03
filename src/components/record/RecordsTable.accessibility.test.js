import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import RecordsTable from "./RecordsTable.js";
import React from "react";
import { axe } from "jest-axe";

describe('RecordsTable', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <RecordsTable 
              records={[]} 
              selectedRecords={[]} 
              onSelect={() => {}}
              disabled={false}
              containerRef={{}}
            />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
