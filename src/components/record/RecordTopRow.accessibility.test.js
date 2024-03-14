import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import RecordTopRow from "./RecordTopRow.js";
import React from "react";
import { axe } from "jest-axe";

describe('RecordTopRow', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <RecordTopRow record={{ 
              deletionDate: new Date().toISOString(),
              title: 'asdf',
              isPartOf: 'asd'
            }} />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
