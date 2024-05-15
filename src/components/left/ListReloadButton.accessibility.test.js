import { render } from "@testing-library/react";
import { MockProvider } from "../../redux/reducers/MockProvider";
import ListReloadButton from "./ListReloadButton.js";
import React from "react";
import { axe } from "jest-axe";

describe('ListReloadButton', () => {
  it('has no accessibility violations', async () => {
        const { container, rerender } = render(
          <MockProvider>
            <ListReloadButton />
          </MockProvider>
        );
        const results = await axe(container);
        expect(results).toHaveNoViolations();
  });
});
