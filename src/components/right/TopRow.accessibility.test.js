import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import TopRow from "./TopRow.js";
import React from "react";
import { axe } from "jest-axe";

describe('TopRow', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <TopRow />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
