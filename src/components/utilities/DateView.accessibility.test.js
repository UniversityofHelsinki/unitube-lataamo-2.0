import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import DateView from "./DateView.js";
import React from "react";
import { axe } from "jest-axe";

describe('DateView', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <DateView date={new Date().toISOString()} />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
